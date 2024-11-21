import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography, message } from "antd";
import { instance } from "../../../configs/instance";
import { useMutation, useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const id = user && JSON.parse(user)._id;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`/user/getUser/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        return data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await instance.put(
        `/user/updatePassword/${id}`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      message.success("Mật khẩu đã được cập nhật thành công!");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
      navigate("/login");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Đã xảy ra lỗi!");
    },
  });

  const handleSubmit = () => {
    setError({});

    if (newPassword !== confirmPassword) {
      setError({
        ...error,
        confirmPassword: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
      });
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="flex flex-col gap-3 p-5 justify-center items-center">
      <Title level={3}>Đổi mật khẩu</Title>
      <div className="flex flex-col gap-3 w-[40%]">
       <div>
          <p className="mb-[4px]">
            <span className="text-[14px]">Mật khẩu hiện tại</span>
            <span className="text-red-500"> *</span>
          </p>
          <Input.Password
            placeholder="Mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            status={error.currentPassword ? "error" : ""}
          />
       </div>

        <div>
          <p className="mb-[4px]">
            <span className="text-[14px]">Mật khẩu mới</span>
            <span className="text-red-500"> *</span>
          </p>

          <Input.Password
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError({
                ...error,
                newPassword:
                  e.target.value.length < 8
                    ? "Mật khẩu mới phải có ít nhất 8 ký tự!"
                    : "",
              });
            }}
            status={error.newPassword ? "error" : ""}
          />
          {error.newPassword && <Text type="danger">{error.newPassword}</Text>}
        </div>

        <div>
          <p className="mb-[4px]">
            <span className="text-[14px]">Xác nhận mật khẩu</span>
            <span className="text-red-500"> *</span>
          </p>

          <Input.Password
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError({
                ...error,
                confirmPassword:
                  e.target.value !== newPassword
                    ? "Mật khẩu xác nhận không khớp!"
                    : "",
              });
            }}
            status={error.confirmPassword ? "error" : ""}
          />
          {error.confirmPassword && (
            <Text type="danger">{error.confirmPassword}</Text>
          )}
        </div>

        {error.form && <Text type="danger">{error.form}</Text>}
        <Button
          type="primary"
          className="bg-red-700"
          onClick={handleSubmit}
          loading={mutation.isLoading}
        >
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
};

export default UpdatePassword;
