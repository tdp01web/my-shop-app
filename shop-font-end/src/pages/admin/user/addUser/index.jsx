import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Divider, Form, Input, InputNumber, message, Select, Space, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../../configs/instance";
import { usePostUser } from "../../../../hooks/mutations/usePostUser";
import { useRef, useState } from "react";

export const AddUser = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user.role === "Owner"
  const roleOwner = ['Admin', 'Staff', 'User'];
  const roleAdmin = ['Staff', 'User'];
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const optionRoleAdmin = roleAdmin.map((item) => ({
    value: item,
    label: item
  }))
  const optionRoleOwner = roleOwner.map((item) => ({
    value: item,
    label: item
  }))
  const { mutate, isPending } = usePostUser({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm tài khoản thành công",
      });
      setTimeout(() => {
        navigate('/admin/users');
      }, 500);
      form.resetFields();
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Thông tin tài khoản đã tồn tại. Vui lòng kiểm tra lại tài khoản.",
          });
        } else {
          messageApi.open({
            type: "error",
            content: message,
          });
        }
      } else {
        messageApi.open({
          type: "error",
          content: "Đã xảy ra lỗi. Vui lòng thử lại.",
        });
      }
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };


  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Thêm tài khoản</h1>
        <Button type="primary">
          <Link to="/admin/users">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Họ"
            name="firstName"
            rules={[{ required: true, message: "Họ bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="lastName"
            rules={[{ required: true, message: "Tên bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email bắt buộc phải điền" },
            {
              type: "email",
              message: "Mời nhập đúng định dạng email"
            }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khấu"
            name="password"
            rules={[{ required: true, message: "Mật khẩu bắt buộc phải điền" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="mobile"
            rules={[{ required: true, message: "Số điện thoại bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vai trò bắt buộc phải điền" }]}
          >
            {isOwner ? <Select
              showSearch
              optionFilterProp="role"
              options={optionRoleOwner}
            /> :
              <Select
                showSearch
                optionFilterProp="role"
                options={optionRoleAdmin}
              />}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="mr-2 animate-spin" />
                  Cập nhật
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
