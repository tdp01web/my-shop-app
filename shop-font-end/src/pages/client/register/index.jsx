import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React, { useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      }
    },
    onSuccess: () => {
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
        className="w-full h-[90vh] flex relative z-99 bg-white"
      >
        <Form
          className="absolute left-[10%] top-[10%] sm:w-[400px] rounded-xl"
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
                message: "vui lòng nhập email!",
                required: true,
                type: "email",
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
            name="password"
            label="Mật khẩu"
            rules={[
              {
                message: "Vui lòng nhập mật khẩu!",
                required: true,
                min: 6,
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
            name="confirmpassword"
            label="Nhập lại mật khẩu"
            rules={[
              {
                message: "Vui lòng nhập lại mật khẩu!",
                required: true,
                min: 6,
              },
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
