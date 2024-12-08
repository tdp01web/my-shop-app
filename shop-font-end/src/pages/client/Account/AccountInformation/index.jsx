import { Form, Input, Button, message } from "antd";

import { useMutation } from "@tanstack/react-query";
import { instance } from "../../../../configs/instance";
import { useEffect } from "react";
import useGetProfile from "../../../../hooks/queries/useGetProfile";
import { queryClient } from "../../../../main";

export const getFullName = (data) => {
  const email = data.email;
  let fullName = email.split("@")[0];
  if (data?.lastName && data?.firstName) {
    fullName = `${data.lastName} ${data.firstName}`;
  }

  return fullName;
};

const AccountInformation = () => {
  const [form] = Form.useForm();

  const { data } = useGetProfile();

  const { mutate } = useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: (data) => {
      return instance.put("/user/updateUser", data);
    },
    onSuccess: () => {
      message.success("Cập nhật thành công");
      queryClient.invalidateQueries(["PROFILE"]);
    },
    onError: () => {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        firstName: data?.firstName,
        lastName: data?.lastName,
        phone: data.mobile,
        email: data.email,
        address: data?.address,
      });
    }
  }, [data]);

  const onSubmit = (values) => {
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobile: values.phone,
      address: values.address,
    });
  };

  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Thông tin tài khoản
      </h2>

      <Form
        className="px-6 py-4 max-w-[580px]"
        labelCol={{ span: 8 }}
        size="large"
        form={form}
        onFinish={onSubmit}
      >
        <Form.Item
          name="lastName"
          label={<p className="text-[16px]">Họ</p>}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ",
            },
          ]}
        >
          <Input placeholder="Họ" className="rounded" />
        </Form.Item>

        <Form.Item
          name="firstName"
          label={<p className="text-[16px]">Tên</p>}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên",
            },
          ]}
        >
          <Input placeholder="Họ" className="rounded" />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<p className="text-[16px]">Số điện thoại</p>}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Số điện thoại không đúng định dạng",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" className="rounded" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<p className="text-[16px]">Email</p>}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
          ]}
        >
          <Input placeholder="Email" className="rounded" />
        </Form.Item>

        <Form.Item
          name="address"
          label={<p className="text-[16px]">Địa chỉ</p>}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input placeholder="Địa chỉ" className="rounded" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            htmlType="submit"
            className="uppercase rounded text-[14px] bg-[#e30019] text-white !border-[#e30019]"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountInformation;
