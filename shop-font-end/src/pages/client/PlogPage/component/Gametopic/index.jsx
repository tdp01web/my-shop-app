import React from 'react'



const Gametopic = () => {
  return (
    <>
      <div className="  bg-[#FFEDED]  h-[255px]  rounded row mb-[80px]">
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
    </>
  );
}

export default Gametopic;