import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { Form, Input, message } from 'antd';
const CheckoutPage = () => {
  const recaptchaRef = useRef()
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptcha = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };
  const onFinish = async (value) => {
    console.log(value)
  };
  return (
    <div id="summary" class=" w-full sm:w-1/4 md:w-1/2 px-8">
      <div className="py-10 px-4 lg:mt-0">
        <p className="text-[18px] font-medium">Thanh toán</p>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item className='text-black '
            rules={[
              {
                message: 'Vui lòng nhập tên của bạn!',
                required: true,
                min: 3
              },
            ]}
            name="name"
            label="Họ tên"
          >
            <Input className=' border border-gray-700 h-[36px]' placeholder="Nhập họ tên" />
          </Form.Item>
          <Form.Item className='text-black '
            name="email"
            label="Email"
            rules={[
              {
                message: 'vui lòng nhập email!',
                required: true,
                type: 'email'
              },
            ]}
          >
            <Input className=' border border-gray-700 h-[36px]' placeholder="Nhập email" />
          </Form.Item>
          <Form.Item className='text-black '
            rules={[
              {
                message: 'vui lòng nhập Phone!',
                required: true,
              },
            ]}
            name="phone"
            label="Phone"
          >
            <Input className=' border border-gray-700 h-[36px]' placeholder="nhập name" />
          </Form.Item>
          <Form.Item className='text-black '
            rules={[
              {
                message: 'vui lòng nhập Address!',
                required: true,
              },
            ]}
            name="address"
            label="Address"
          >
            <Input className=' border border-gray-700 h-[36px]' placeholder="nhập name" />
          </Form.Item>
          <Form.Item className='flex w-[200px]'>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld_Ek8mAAAAAKtnDYdUCNiClx9m52L_aafio6we"
              onChange={handleRecaptcha}
            />
            {isVerified ? (
              <p>Xác thực thành công!</p>
            ) : (
              <p className='text-[red]'>Vui lòng xác thực bằng Recaptcha trước khi tiếp tục.</p>
            )}
          </Form.Item>
          <p className="text-[18px] font-medium mt-6">Phương thức thanh toán</p>
          <div className="flex items-center mt-2">
            <input type="radio" id="cash-on-delivery" name="payment-method" value="cash-on-delivery" />
            <label for="cash-on-delivery" className="ml-2">Thanh toán khi nhận hàng</label>
          </div>
          {/* <div class="flex items-center mt-2">
            <input type="radio" id="bank-transfer" name="payment-method" value="bank-transfer" class="mr-2" />
            <label for="bank-transfer" class="mr-2">Chuyển khoản ngân hàng</label>
            <div id="qr-code">
              <img src="https://th.bing.com/th/id/OIP.3PS24iiu-A3RpY9MdvBxKAHaHa?w=218&h=218&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="QR Code for Bank Transfer" class="mt-2" />
              <p class="text-sm mt-2">Quét mã QR để thanh toán</p>
            </div>
          </div> */}
          <div className="flex items-center mt-2">
            <input type="radio" id="e-wallet" name="payment-method" value="e-wallet" />
            <label for="e-wallet" className="ml-2">Thanh toán qua ví điện tử</label>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
        </Form>
      </div>
    </div>
  )
}

export default CheckoutPage