import React from 'react'
const ContactPage = () => {
  return (
    <>
      <div className="mx-72">
        <div className=''>
          <div className="bg-[url('https://st3.depositphotos.com/1010613/32552/i/450/depositphotos_325526072-stock-photo-white-popular-contact-web-icons.jpg')] bg-fixed p-10 text-black whitespace-nowrap ">
            <h1 className="font-bold text-2xl md:text-3xl">Liên hệ với chúng tôi</h1>
            <p className="text-sm md:text-lg">
              Chúng tôi luôn ở bên bạn
            </p>
          </div>
        </div>
        <div className="bg-[#E30019] w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 shadow rounded h-fit text-white overflow-hidden">
            <div className="col-span-2 bg-gray-800 p-2 md:p-4 h-full">
              <form>
                <div className="flex md:flex-row flex-col justify-center items-center p-4 pt-8">
                  <h2 className="border-b-[0.3rem] font-semibold text-xl md:text-2xl">
                    Nội dung
                  </h2>
                </div>
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 px-4 md:px-8 py-6 md:py-12 text-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                      Họ tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border-[1px] border-white bg-gray-800 p-2 rounded-md text-[16px]"
                      placeholder="Nhập họ tên"
                      required=""
                      name="name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border-[1px] border-white bg-gray-800 p-2 rounded-md text-[16px]"
                      placeholder="Nhập email"
                      required=""
                      name="email"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border-[1px] border-white bg-gray-800 p-2 rounded-md text-[16px]"
                      placeholder="Nhập số điện thoại"
                      required=""
                      name="phone"
                      type="tel"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                      Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border-[1px] border-white bg-gray-800 p-2 rounded-md text-[16px]"
                      placeholder="Nhập tiêu đề"
                      required=""
                      name="subject"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="font-semibold">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="border-[1px] border-white bg-gray-800 p-2 rounded-md text-[16px]"
                      placeholder="Nhập nội dung"
                      required
                      name="subject"
                    />
                  </div>
                </div>
              </form>
              <div className="flex justify-center md:justify-end items-center px-8 py-4">
                <button className="flex items-center gap-2 border-2 border-white bg-gray-800 hover:bg-gray-700 shadow-sm px-4 md:px-6 py-2 md:py-4 rounded-md hover:scale-95 transition-all cursor-pointer">
                  <span className="text-[24px]" >Gửi</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-telegram"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-5 bg-gray-800 px-4 py-6 md:border-l-2 h-[500px] md:h-full">
              <div className="flex md:flex-row flex-col justify-center items-center p-4 pt-8">
                  <h2 className="border-b-[0.3rem] font-semibold text-xl md:text-2xl">
                  Thông tin liên hệ
                  </h2>
                </div>
              <div className="flex flex-col justify-center items-center row-span-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail-share"
                  width={35}
                  height={35}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
                  <path d="M3 7l9 6l9 -6" />
                  <path d="M16 22l5 -5" />
                  <path d="M21 21.5v-4.5h-4.5" />
                </svg>
                <span>yourmail@support.com</span>
              </div>
              <div className="flex justify-center items-center gap-4">
                <a title="youtube" href="#">
                  <img
                    className="w-8 h-8 invert"
                    src="https://www.svgrepo.com/show/521936/youtube.svg"
                  />
                </a>
                <a title="linkedin" href="#">
                  <img
                    className="w-12 h-12 invert"
                    src="https://www.svgrepo.com/show/520815/linkedin.svg"
                  />
                </a>
                <a title="instagram" href="#">
                  <img
                    className="w-8 h-8 invert"
                    src="https://www.svgrepo.com/show/521711/instagram.svg"
                  />
                </a>
                <a title="github" href="#">
                  <img
                    className="w-8 h-8 invert"
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ContactPage