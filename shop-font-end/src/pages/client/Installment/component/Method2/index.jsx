import React from 'react'



const Method2 = () => {
  return (
    <div className="mt-14">
      <div className=" bg-blue-500  h-[80px]  rounded-t-3xl w-[60%]">
        <h2 className="pl-24 pt-[20px] text-[28px] font-bold text-white truncate">
          Cách 2: Duyệt hồ sơ thông qua điện thoại
        </h2>
      </div>
      <div className="h-auto sm:h-auto bg-white shadow-md rounded-b-3xl rounded-tr-3xl p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0">
          <div className="text-[14px] sm:text-[16px] md:text-[18px] leading-6 sm:leading-7 ml-4 sm:ml-[50px]">
            <span className="font-bold">
              Đăng ký và duyệt hồ sơ nhanh chóng qua điện thoại.
            </span>
            <br />
            Hình thức này khách hàng không cần phải đến GEARVN trước để chờ đợi
            <br />
            duyệt hồ sơ. HD SAISON sẽ thẩm định qua điện thoại và nếu hồ sơ hợp
            lệ thì <br />
            khách hàng mang đầy đủ giấy tờ đến GEARVN để hoàn tất hồ sơ và nhận
            sản phẩm.
          </div>
          <div className="w-[180px] sm:w-[230px]">
            <img
              src="/images/installment/callphone.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6 mt-6">
          <div className="bg-[#F0F0F0] w-full sm:w-[300px] sm:h-[455px]  lg:w-[340px] h-auto p-6 rounded-[12px]">
            <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
              <h3 className="text-white font-bold">Bước 1</h3>
            </div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px]">
              • Khách hàng liên hệ GEARVN qua Hotline
              <span className="font-bold">1800.6975</span> để gửi yêu cầu mua
              hàng.
            </p>
          </div>

          <div className="bg-[#F0F0F0] w-full sm:w-[300px] lg:w-[340px] h-auto p-6 rounded-[12px]">
            <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
              <h3 className="text-white font-bold">Bước 2</h3>
            </div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px]">
              • Chờ và nhận cuộc gọi từ HD SAISON trong 10 phút nếu yêu cầu được
              gửi trước 20:00, với các yêu cầu gửi sau 20:00 thì HD SAISON sẽ
              gọi lại trước 09:00 của ngày hôm sau.
              <br />
              <br />• HD SAISON sẽ thẩm định hồ sơ và thông báo kết quả cho
              khách hàng. Nếu hồ sơ đủ điều kiện, HD SAISON sẽ thông báo thời
              gian để khách hàng mang giấy tờ gốc đến GEARVN.
            </p>
          </div>

          <div className="bg-[#F0F0F0] w-full sm:w-[300px] sm:h-[455px] lg:w-[340px] h-auto p-6 rounded-[12px]">
            <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
              <h3 className="text-white font-bold">Bước 3</h3>
            </div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px]">
              • Khách hàng mang các giấy tờ gốc đến GEARVN theo lịch hẹn, ký hợp
              đồng và nhận hàng. Giấy tờ gốc sẽ được trả lại khách hàng sau khi
              đã đối chiếu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Method2;