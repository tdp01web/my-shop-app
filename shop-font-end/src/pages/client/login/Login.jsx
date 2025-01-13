import React from 'react'

const Login = () => {
  return (
    <div>
      <div>
      <Header />
      <div
        style={{
          backgroundImage: `url('/images/dk-dn/bg.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative z-99 flex bg-white w-full h-[75vh]"
      >
        <Form
          className="top-[10%] left-[10%] absolute rounded-xl sm:w-[400px]"
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <p className="w-full font-bold text-center text-xl">Đăng nhập</p>
          <Form.Item
            className="font-bold text-black"
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
              className="border-gray-700 border h-[48px] font-mono"
              placeholder="Nhập email"
            />
          </Form.Item>
          <Form.Item
            className="font-bold text-black"
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
              className="border-gray-700 border h-[48px] font-mono"
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
          <Link to={"/forgot-password"}>
            <p>Quên mật khẩu</p>
          </Link>
          <Link to={"/register"}>
            <p>Bạn chưa có tài khoản. Đăng ký</p>
          </Link>
          <Button
            htmlType="submit"
            className="bg-[#d32026] hover:bg-blue-600 hover:bg-green-dark my-1 py-3 rounded w-full h-[52px] text-[20px] text-center text-white focus:outline-none"
            loading={isLoading}
          >
            Đăng nhập
          </Button>
        </Form>
        <div className="right-[10%] bottom-0 absolute w-[20%]">
          <img src="/images/dk-dn/untitled-1-03-20220324065349.png" alt="" />
        </div>
        <Fade
          className="bottom-[-0.3rem] sm:bottom-[-0.6rem] md:bottom-[-1rem] 2xl:bottom-[-1.2rem] left-[55%] absolute w-[13%]"
          triggerOnce={true}
          direction="left"
          delay={1e3}
          duration={3000}
        >
          <img src="/images/dk-dn/xe-may.png" alt="Xe máy" />
        </Fade>
      </div>
      <FooterLayoutClient />
    </div>
    </div>
  )
}

export default Login
