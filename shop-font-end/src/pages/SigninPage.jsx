import { useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useFetchData from "../hooks/useFetchData";

const SigninPage = () => {
  const { data, loading, error } = useFetchData("/products"); // Thay đổi endpoint API của bạn ở đây
  console.log(data);
  console.log(error);

  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef();
  const navigate = useNavigate();
  const onFinish = async (value) => {
    console.log(value);
  };

  const handleRecaptcha = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  return (
    <>
      <Form
        className=" mx-auto sm:w-[468px] px-4 py-5 bg-white rounded-xl"
        name="form_item_path"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2
          tabIndex={0}
          role="heading"
          aria-label="Login to your account"
          className="text-xl font-bold leading-6 text-gray-800"
        >
          ĐĂNG NHẬP
        </h2>
        <p className="text-[15px] mt-4 font-medium italic leading-none text-gray-500">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/signup"
            tabIndex={0}
            role="link"
            aria-label="Sign up here"
            className="text-[15px] font-medium leading-none underline text-gray-800 cursor-pointer"
          >
            {" "}
            Đăng ký
          </Link>
        </p>
        <button
          aria-label="Tiếp tục với Google"
          role="button"
          className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
        >
          <svg
            width={19}
            height={20}
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
              fill="#4285F4"
            />
            <path
              d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
              fill="#34A853"
            />
            <path
              d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
              fill="#FBBC05"
            />
            <path
              d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
              fill="#EB4335"
            />
          </svg>
          <p className="text-[19px] font-medium ml-4 text-gray-700">
            Tiếp tục với Google
          </p>
        </button>
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-gray-400" />
          <p className="text-[20px] font-medium leading-4 px-2.5 text-gray-400">
            OR
          </p>
          <hr className="w-full bg-gray-400  " />
        </div>
        <Form.Item
          className="text-black font-bold"
          name="email"
          label="Email"
          rules={[
            {
              message: "Vui lòng nhập email!",
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            className="font-mono border border-gray-700 h-[48px]"
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
            className="font-mono border border-gray-700 h-[48px] "
            placeholder="Nhập mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <ReCAPTCHA
            className=""
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
        >
          Đăng nhập
        </Button>
      </Form>
    </>
  );
};

export default SigninPage;
