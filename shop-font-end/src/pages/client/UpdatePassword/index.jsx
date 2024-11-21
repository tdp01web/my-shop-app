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
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Đổi mật khẩu
      </h2>

      <div className="px-6 py-4 max-w-[580px]">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-12 items-center gap-[8px]">
            <p className="mb-[4px] col-span-4 text-right">
              <span className="text-red-500">* </span>
              <span className="text-[16px]">Mật khẩu hiện tại: </span>
            </p>

            <Input.Password
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              status={error.currentPassword ? "error" : ""}
              size="large"
              className="rounded-[4px] col-span-8"
            />
          </div>

          <div>
            <div className="grid grid-cols-12 items-center gap-[8px]">
              <p className="mb-[4px] col-span-4 text-right">
                <span className="text-red-500">* </span>
                <span className="text-[16px]">Mật khẩu mới: </span>
              </p>

              <div className="col-span-8">
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
                  size="large"
                  className="rounded-[4px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-[8px]">
              <div className="col-span-4"></div>

              <div className="col-span-8">
                {error.newPassword && (
                  <Text type="danger">{error.newPassword}</Text>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 items-center gap-[8px]">
              <p className="mb-[4px] col-span-4 text-right">
                <span className="text-red-500">* </span>
                <span className="text-[16px]">Xác nhận mật khẩu:</span>
              </p>

              <div className="col-span-8">
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
                  size="large"
                  className="rounded-[4px]"
                  status={error.confirmPassword ? "error" : ""}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-[8px]">
              <div className="col-span-4"></div>
              <div className="col-span-8">
                {error.confirmPassword && (
                  <Text type="danger">{error.confirmPassword}</Text>
                )}
              </div>
            </div>
          </div>

          {error.form && <Text type="danger">{error.form}</Text>}

          <div className="grid grid-cols-12 gap-[8px]">
            <div className="col-span-4"></div>
            <div className="col-span-8">
              <Button
                type="primary"
                className="bg-red-700 rounded-[4px]"
                onClick={handleSubmit}
                size="large"
                loading={mutation.isLoading}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
