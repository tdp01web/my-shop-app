import React from 'react'
import HeaderLayoutClient from '../layouts/client/components/header'
import FooterLayoutClient from '../layouts/client/components/footer'


const NotFoundPage = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto bg-[#ECECEC]">
        <HeaderLayoutClient/>
        <main className="w-full md:w-[60%] mx-auto">
          <div className=" bg-white">
            <div className="text-center">
              <img src="https://file.hstatic.net/200000636033/file/404_0031c39563584f53bce84ce2e6add746.png" alt="" />
              <h1 className="mb-4 text-xl tracking-tight font-bold text-gray-900 md:text-4xl">
                Rất tiếc trang bạn tìm kiếm đang không tồn tại
              </h1>
              <h2 className="text-sm font-light text-gray-500 md:text-lg">
                Nếu bạn cần hỗ trợ, vui lòng liên hệ tổng đài 
              </h2>
              <p className="text-lg font-light text-red-900">
              1800 6975
              </p>
              <a
                href="#"
                className="inline-flex text-primary bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Back to Homepage
              </a>
            </div>
          </div>  
        </main>
        <FooterLayoutClient />
      </div>
    </>

  )
}

export default NotFoundPage