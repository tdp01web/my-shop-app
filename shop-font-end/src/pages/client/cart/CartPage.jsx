import React from 'react'
import { Link } from "react-router-dom";
import { Button, message, Popconfirm } from 'antd';
import CheckoutPage from './CheckOutPage';
const CartPage = () => {
  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <div class="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <div class="sm:flex shadow-md my-10">
        <div class=" w-full  sm:w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-[18px]">Giỏ hàng</h1>
            <h2 class="font-semibold text-[18px]">số lượng : </h2>
          </div>

          <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div class="md:w-4/12 2xl:w-1/4 w-full">
              <img src="https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307980220145280_iphone-15-promax-den-1.jpg" alt="Black Leather Purse" class="h-full object-center object-cover md:block hidden" />
              <img src="https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307980220145280_iphone-15-promax-den-1.jpg" alt="Black Leather Purse" class="md:hidden sm:w-4/12 object-center object-cover" />
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p class=" leading-3 text-gray-800 md:pt-0 pt-4">mã máy</p>
              <div class="flex items-center justify-between w-full">
                <p class="font-black leading-none text-gray-800 text-[16px]">iPhone 15 Pro Max 256GB</p>
                <select class="py-2 px-1 border border-gray-300 mr-6 focus:outline-none">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <p class="text-xs leading-3 text-gray-600 py-4">màu: <select class="py-2 px-1 border border-gray-300 mr-6 focus:outline-none">
                <option>xám</option>
                <option>đen</option>
                <option>trắng</option>
              </select></p>
              <div class="flex items-center justify-between pt-5">
                <div class="flex itemms-center">
                  <p class="leading-3 text-gray-800 font-bold cursor-pointer line-through">34.990.000 ₫
                    16%</p>
                  <p class="leading-3 font-bold text-red-500 pl-5 cursor-pointer">29.490.000 ₫</p>
                </div>
                <Popconfirm
                  title="Xóa khỏi giỏ hàng"
                  description="Bạn đang thực hiện xóa 1 sản phẩm khỏi giỏ hàng?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button className='w-[60px] h-[32px]' type="primary" danger size="small">
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>

          <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div class="md:w-4/12 2xl:w-1/4 w-full">
              <img src="https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307980220145280_iphone-15-promax-den-1.jpg" alt="Black Leather Purse" class="h-full object-center object-cover md:block hidden" />
              <img src="https://cdn2.fptshop.com.vn/unsafe/384x0/filters:quality(100)/2023_9_20_638307980220145280_iphone-15-promax-den-1.jpg" alt="Black Leather Purse" class="md:hidden sm:w-4/12 object-center object-cover" />
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p class=" leading-3 text-gray-800 md:pt-0 pt-4">mã máy</p>
              <div class="flex items-center justify-between w-full">
                <p class="font-black leading-none text-gray-800 text-[16px]">iPhone 15 Pro Max 256GB</p>
                <select class="py-2 px-1 border border-gray-300 mr-6 focus:outline-none">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <p class="text-xs leading-3 text-gray-600 py-4">màu: <select class="py-2 px-1 border border-gray-300 mr-6 focus:outline-none">
                <option>xám</option>
                <option>đen</option>
                <option>trắng</option>
              </select></p>
              <div class="flex items-center justify-between pt-5">
                <div class="flex itemms-center">
                  <p class="leading-3 text-gray-800 font-bold cursor-pointer line-through">34.990.000 ₫
                    16%</p>
                  <p class="leading-3 font-bold text-red-500 pl-5 cursor-pointer">29.490.000 ₫</p>
                </div>
                <Popconfirm
                  title="Xóa khỏi giỏ hàng"
                  description="Bạn đang thực hiện xóa 1 sản phẩm khỏi giỏ hàng?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button className='w-[60px] h-[32px]' type="primary" danger size="small">
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>

          <Link to="/" class="flex font-semibold text-indigo-600 text-[17px] mt-10">
            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Tiếp tục mua hàng
          </Link>
        </div>
        <CheckoutPage />
      </div>
    </div>
  )
}

export default CartPage