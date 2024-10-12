import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React, { useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../configs/instance";
import FooterLayoutClient from "../../../layouts/client/components/footer";
import Header from "./component/Header";

const Register = () => {
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await instance.post("/user/register", data);
        return response.data;
      } catch (error) {
        console.log("🚀 ~ mutationFn:async ~ error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      message.success("Đăng ký thành công!");
      navigate("/login");
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Có lỗi xảy ra!");
    },
  });

  // Hàm xử lý khi submit form
  const onFinish = async (values) => {
    if (isVerified) {
      mutation.mutate(values);
    } else {
      message.error("Vui lòng xác thực Recaptcha trước khi đăng ký!");
    }
  };

  const handleRecaptcha = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `url('/images/dk-dn/bg.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full h-[94vh] flex relative z-99 bg-white"
      >
        <Form
          className="absolute left-[10%] top-[5%] sm:w-[400px] rounded-xl"
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <p className="text-xl w-full text-center font-bold">Đăng ký</p>
          <Form.Item
            className="text-black font-bold"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input
              className="border-gray-700 font-mono border h-[48px]"
              placeholder="Nhập email"
            />
          </Form.Item>

          <Form.Item
            className="text-black font-bold"
            name="mobile"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại phải có 10-11 chữ số!",
              },
            ]}
          >
            <Input
              className="border-gray-700 font-mono border h-[48px]"
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
          <Form.Item
            className="text-black font-bold"
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
                min: 6,
                max: 20,
                message: "Mật khẩu phải dài từ 6 đến 20 ký tự!",
              },
            ]}
          >
            <Input.Password
              type="password"
              className="font-mono border border-gray-700 h-[48px]"
              placeholder="Nhập mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            className="text-black font-bold"
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu và xác nhận mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              className="font-mono border border-gray-700 h-[48px]"
              placeholder="Nhập lại mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld_Ek8mAAAAAKtnDYdUCNiClx9m52L_aafio6we"
              onChange={handleRecaptcha}
            />
            {isVerified ? (
              <p>Xác thực thành công!</p>
            ) : (
              <p className="text-[red]">
                Vui lòng xác thực bằng Recaptcha trước khi tiếp tục.
              </p>
            )}
          </Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-[52px] text-center py-3 rounded text-[20px] bg-[#d32026] hover:bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
            loading={mutation.isLoading}
          >
            Đăng ký
          </Button>
        </Form>
        <div className="absolute right-[10%] bottom-0 w-[20%]">
          <img src="/images/dk-dn/untitled-1-03-20220324065349.png" alt="" />
        </div>
        <Fade
          className="absolute bottom-0 left-[55%] w-[13%]"
          triggerOnce={true}
          direction="left"
          delay={1000}
          duration={3000}
        >
          <img src="/images/dk-dn/xe-may.png" alt="Xe máy" />
        </Fade>
      </div>
      <FooterLayoutClient />
    </div>
  );
};

export default Register;
