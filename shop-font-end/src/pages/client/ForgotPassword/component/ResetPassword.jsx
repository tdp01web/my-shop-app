import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, Typography, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { instance } from "../../../../configs/instance";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const { token } = useParams();
  console.log("🚀 ~ ResetPassword ~ token:", token);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async ({ token, newPassword }) => {
      const { data } = await instance.put(
        `/user/reset-password/${token.trim()}`,
        {
          password: newPassword,
        }
      );
      return data;
    },
    onSuccess: () => {
      message.success("Mật khẩu đã được cập nhật thành công.");
      navigate("/login");
    },
    onError: () => {
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    },
  });

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");
    mutation.mutate({ token: token.trim(), newPassword });
  };

  return (
    <div className="w-[30%] mx-auto bg-white p-5 rounded-md flex flex-col gap-4">
      <Title level={3}>Đổi mật khẩu</Title>
      <Text>Nhập mật khẩu mới và xác nhận mật khẩu để hoàn tất thay đổi.</Text>

      <div className="flex flex-col gap-3">
        <Input.Password
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          status={error && !newPassword ? "error" : ""}
        />
        <Input.Password
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          status={error && newPassword !== confirmPassword ? "error" : ""}
        />
        {error && <Text type="danger">{error}</Text>}
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={mutation.isLoading}
        >
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
