import React from 'react'
import { Link } from "react-router-dom";
import { Button } from 'antd';
import CheckoutPage from './CheckOutPage';
const CartPage = () => {

  return (
    <div class="container mx-auto mt-10">
      <div class="sm:flex shadow-md my-10">
        <div class="w-full sm:w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-[18px]">Giỏ hàng</h1>
            <h2 class="font-semibold text-[18px]">số lượng : </h2>
          </div>
          <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50 my-8">
            <div class="md:w-4/12 2xl:w-1/4 w-full">
              <img src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png" alt="Black Leather Purse" class="h-full object-center object-cover md:block hidden" />
              <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse" class="md:hidden w-full h-full object-center object-cover" />
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p class=" leading-3 text-gray-800 md:pt-0 pt-4">mã máy</p>
              <div class="flex items-center justify-between w-full">
                <p class="font-black leading-none text-gray-800 text-[16px]">msi bravo 15</p>
                <select class="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <p class="text-xs leading-3 text-gray-600 py-4">màu: Black</p>
              <div class="flex items-center justify-between pt-5">
                <div class="flex itemms-center">
                  <p class="leading-3 text-gray-800 cursor-pointer line-through">450.000</p>
                  <p class="leading-3 underline text-red-500 pl-5 cursor-pointer">300.000</p>
                </div>
                <Button type="primary" danger size="small">
                  Xóa
                </Button>
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
        <CheckoutPage/>
      </div>
    </div>
  )
}

export default CartPage