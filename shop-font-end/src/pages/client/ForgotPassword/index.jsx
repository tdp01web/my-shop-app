import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import axios from "axios";
import { instance } from "../../../configs/instance";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mutation = useMutation({
    mutationFn: async (email) => {
      try {
        const { data } = await instance.post("/user/forgot-password-token", {
          email,
        });
        return data;
      } catch (error) {
        console.log("🚀 ~ mutationFn: ~ error:", error);
      }
    },
    onSuccess: () => {
      message.success("Đã gửi liên kết đặt lại mật khẩu tới email của bạn.");
    },
    onError: () => {
      message.error("Không tìm thấy người dùng với email này.");
    },
  });

  const handleSubmit = () => {
    if (!email) {
      setError("Vui lòng nhập email.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }
    setError("");
    mutation.mutate(email);
  };

  return (
    <div className="w-[30%] mx-auto bg-white p-5 rounded-md flex flex-col gap-4">
      <div>
        <Title level={3} strong>
          Quên mật khẩu?
        </Title>
        <Text>
          Điền email gắn với tài khoản của bạn để nhận đường dẫn thay đổi mật
          khẩu
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          placeholder="Nhập email của bạn tại đây"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          status={error ? "error" : ""}
        />
        {error && <Text type="danger">{error}</Text>}
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={mutation.isLoading}
        >
          Tiếp tục
        </Button>
        <Link to="/login">Quay lại đăng nhập</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
