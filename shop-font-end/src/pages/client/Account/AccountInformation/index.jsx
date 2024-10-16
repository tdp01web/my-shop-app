import { Form, Radio, Input, Button, DatePicker, message } from "antd";

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
      let fullName = getFullName(data);

      form.setFieldsValue({
        name: fullName,
        phone: data.mobile,
        email: data.email,
      });
    }
  }, [data]);

  const onSubmit = (values) => {
    if (values.name.trim().split(" ").length <= 1) {
      message.info("Vui lòng nhập lại họ tên");
      return;
    }

    const lastIndex = values.name.lastIndexOf(" ");
    const lastName = values.name.slice(0, lastIndex);
    const firstName = values.name.slice(lastIndex + 1);

    mutate({
      firstName,
      lastName,
      email: values.email,
      mobile: values.phone,
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
          name="name"
          label={<p className="text-[16px]">Họ Tên</p>}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên",
            },
          ]}
        >
          <Input placeholder="Họ Tên" className="rounded" />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<p className="text-[16px]">Giới tính</p>}
          className="mb-3"
        >
          <Radio.Group>
            <Radio value={0}>Nam</Radio>

            <Radio value={1}>Nữ</Radio>
          </Radio.Group>
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
          name="birthday"
          label={<p className="text-[16px]">Ngày sinh</p>}
        >
          <DatePicker placeholder="Ngày sinh" format="DD/MM/YYYY" />
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
