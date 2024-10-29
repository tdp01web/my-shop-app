import React from 'react'



const Method3 = () => {
  return (
    <>
      <div className=" mt-[50px] mb-[30px]">
        <h2 className="font-bold leading-6 text-black text-[32px]">
          C. Phương thức thanh toán khoản vay hàng tháng
        </h2>
      </div>
      <div className="h-[490px]  bg-white shadow-md rounded-3xl mb-[50px]">
        <div className="pt-[40px] flex justify-evenly">
          <div className="text-[18px]">
            <span className="font-bold ">Bước 1:</span>
            <br />
            Tra cứu khoản vay hàng tháng tại HD SAISON,
            <br /> click vào để xem chi tiết: <br />
            <a href="#">
              <img
                src="/images/installment/payment4.png"
                alt=""
                className="mt-[20px] w-[410px]"
              />
            </a>
          </div>
          <button className="h-[400px] w-[0.2px] bg-black mx-3"></button>
          <div className="text-[18px]">
            <span className="font-bold ">Bước 2:</span>
            <br />
            Thanh toán khoản vay theo các hình thức sau,
            <br /> click vào để xem chi tiết:
            <br />
            <div className="flex">
              <a href="#">
                <img
                  src="/images/installment/payment2.png"
                  alt=""
                  className="pt-[20px] w-[150px]"
                />
              </a>
              <a href="#">
                <img
                  src="/images/installment/paynemt3.png"
                  alt=""
                  className="pt-[20px] w-[150px]"
                />
              </a>
              <a href="#">
                <img
                  src="/images/installment/payment3.png"
                  alt=""
                  className="pt-[20px] w-[150px]"
                />
              </a>
            </div>
            <div className="flex">
              <a href="#">
                <img
                  src="/images/installment/payment5.png"
                  alt=""
                  className="pt-[20px] w-[150px]"
                />
              </a>
              <a href="#">
                <img
                  src="/images/installment/payment6.png"
                  alt=""
                  className="pt-[20px] w-[150px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Method3;