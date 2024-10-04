import React from 'react'



const Method2 = () => {
  return (
    <div className="mt-[60px]">
      <div className=" bg-blue-500  h-[80px]  rounded-t-3xl w-[60%]">
        <h2 className="text-center pt-[20px] text-[28px] font-bold text-white">
          Cách 2: Duyệt hồ sơ thông qua điện thoại
        </h2>
      </div>
      <div className="h-[635px]  bg-white shadow-md rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
        <div className="flex justify-between">
          <div>
            <p className=" text-[18px] ml-[50px] py-[30px]">
              <span className="font-bold">
                Đăng ký và duyệt hồ sơ nhanh chóng qua điện thoại.
                <br />
              </span>
              Hình thức này khách hàng không cần phải đến GEARVN trước để chờ
              đợi
              <br />
              duyệt hồ sơ, HD SAISON sẽ thẩm định qua điện thoại và nếu hồ sơ
              hợp lệ
              <br />
              thì khách hàng mang đầy đủ giấy tờ đến GEARVN để hoàn tất hồ sơ và
              nhận sản phẩm.
            </p>
          </div>
          <div className="">
            <img
              src="/images/installment/callphone.png"
              alt=""
              className="w-[249px]  "
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#F0F0F0] w-[340px] h-[350px] rounded-[12px] mr-[30px] ">
            <div className="pt-[50px] pl-[30px] text-[18px]">
              • Khách hàng liên hệ GEARVN qua
              <br />
              <span className="font-bold ">Hotline 1800.6975</span>
              để gửi yêu cầu mua hàng
              <br />
            </div>
          </div>
          <div className="bg-[#F0F0F0] w-[340px] h-[350px] rounded-[12px] mr-[30px]">
            <div className="pt-[50px] pl-[30px]">
              <p className="text-[18px] pb-[15px]">
                • Chờ và nhận cuộc gọi từ HD SAISON trong 10 phút nếu yêu cầu
                được gửi trước 20:00, với các yêu cầu gửi đến sau 20:00 thì HD
                SAISON sẽ gọi lại trước 09:00 của ngày hôm sau.
              </p>
              <p className="text-[18px] pb-[15px]">
                • HD SAISON sẽ thẩm định hồ sơ và thông báo kết quả cho khách
                hàng. Nếu hồ sơ đủ điều kiện, HD SAISON sẽ thông báo thời gian
                để khách hàng mang giấy tờ gốc đến GEARVN
              </p>
            </div>
          </div>
          <div className="bg-[#F0F0F0] w-[340px] h-[350px] rounded-[12px]">
            <div className="pt-[50px] pl-[30px]">
              <p className="text-[18px] pb-[15px]">
                • Khách hàng mang các giấy tờ gốc đến GEARVN theo lịch hẹn, ký
                hợp đồng và nhận hàng. Giấy tờ gốc sẽ được trả lại khách hàng
                sau khi đã đối chiếu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Method2;