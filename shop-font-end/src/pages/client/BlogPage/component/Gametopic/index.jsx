import React from 'react'



const Gametopic = () => {
  return (
    <>
   
      <div className='mb-[60px]'>
        <div className="flex relative ">
          <div className="relative">
            <button className="bg-[#d93031] w-[180px] h-[50px] rounded-t-lg relative ">
              <h3 className="text-left text-white font-semibold pl-[15px]">
                CHỦ ĐỀ GAME
              </h3>
            </button>
          </div>
          <div className="absolute top-[-5px] right-[175px] z-10 ">
            <img
              src="/images/Blog/blog7.webp"
              alt=""
              className="w-45 h-[55px] "
            />
          </div>
        </div>
        <div className="  bg-[#FFEDED]  h-[240px]  rounded row">
          <div className="grid gap-x-8 gap-y-4 grid-cols-3 px-[16px] pt-[16px]">
            <div>
              <img
                src="/images/Blog/blog8.webp"
                alt=""
                className="rounded h-[65px] w-[65px] items-center"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                Game FPS
              </a>
            </div>
            <div>
              <img
                src="/images/Blog/blog9.webp"
                alt=""
                className="rounded h-[65px] w-[65px]"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                GAME RPG
              </a>
            </div>
            <div>
              <img
                src="/images/Blog/blog10.webp"
                alt=""
                className="rounded h-[65px] w-[65px]"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                GAME CO.OP
              </a>
            </div>
            <div>
              <img
                src="/images/Blog/blog11.jpg"
                alt=""
                className="rounded h-[65px] w-[65px]"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                Game hành động
              </a>
            </div>
            <div>
              <img
                src="/images/Blog/blog12.webp"
                alt=""
                className="rounded h-[65px] w-[65px]"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                Game sinh tồn
              </a>
            </div>
            <div>
              <img
                src="/images/Blog/blog13.jpg"
                alt=""
                className="rounded h-[65px] w-[65px]"
              />
              <a
                href="#"
                className="font-semibold text-[13px] hover:text-red-500 mb-[10px]"
              >
                Game kinh dị
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gametopic;