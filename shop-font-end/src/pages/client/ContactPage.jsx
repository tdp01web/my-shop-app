import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";

const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      try {
        const response = await instance.post("/enquiry/createEnquiry", values);
        return response.data;
      } catch (error) {
        console.error("🚀 ~ mutationFn:async ~ error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      notification.success({
        message: "Thành công!",
        description:
          "Chúng tôi đã nhận được tin nhắn và sẽ hỗ trợ bạn sớm nhất.",
      });
    },
    onError: () => {
      notification.error({
        message: "Lỗi!",
        description: "Đã có lỗi xảy ra vui lòng thao tác lại.",
      });
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <section className="bg-white dark:bg-gray-900 w-full lg:w-[80%] mx-auto rounded-md">
      <div className="container px-6 py-12 mx-auto">
        <div className="lg:w-[60%] lg:mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            Liên hệ với chúng tôi
          </h1>
          <div className="mt-8 p-8 bg-white shadow-lg rounded-md dark:bg-gray-800">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                label="Họ và tên đầy đủ"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                name="mobile"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: /^[0-9]{9,11}$/,
                    message: "Số điện thoại không hợp lệ. Nhập từ 9-11 chữ số.",
                  },
                ]}
              >
                <Input placeholder="+84 123 456 789" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Địa chỉ email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="johndoe@example.com" />
              </Form.Item>

              <Form.Item
                name="comment"
                label="Nội dung"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
              >
                <TextArea rows={4} placeholder="Message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className="w-full"
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
