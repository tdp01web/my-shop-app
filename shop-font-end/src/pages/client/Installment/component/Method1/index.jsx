import React from 'react'
import Method3 from '../Method3';
import Method2 from '../Method2';


const Method1 = () => {
  return (
    <>
      <img
        src="/images/installment/installment.png"
        alt=""
        className="rounded-b-2xl mb-3.5"
      />
      <div className="mb-3.5">
        <h2 className="font-bold leading-6 text-blue-600 text-[32px] ">
          1. Trả góp qua công ty tài chính HD SAISON
        </h2>
      </div>

      <div className="">
        <h2 className="font-bold leading-6 text-black text-[32px]">
          A. Điều kiện
        </h2>
      </div>

      <div className=" text-[18px] mb-6">
        Công dân Việt Nam từ đủ 18 đến 70 tuổi có:
        <br />
        • Chứng minh nhân dân (CMND)/Căn cước công dân (CCCD) còn giá trị
        <br />• Hộ khẩu tại TP. Hồ Chí Minh và Hà Nội
      </div>
      <div className="">
        <h2 className="font-bold leading-6 text-black text-[32px]">
          B. Hình thức đăng ký
        </h2>
      </div>

      <div className="mt-2">
        <div className=" bg-blue-500  h-[80px]  rounded-t-3xl w-[60%]">
          <h2 className="pl-24 pt-[20px] text-[28px] font-bold text-white truncate">
            Cách 1: Duyệt hồ sơ tại Showroom GEARVN
          </h2>
        </div>
        <div className="h-auto bg-white shadow-md rounded-b-3xl rounded-tr-3xl p-4 sm:p-8">
          <p className="text-[14px] sm:text-[16px] lg:text-[18px] mx-4 sm:mx-[50px] pb-4 sm:pb-[30px] leading-relaxed">
            <span className="font-bold">
              Khách hàng mang đầy đủ hồ sơ tới Showroom GEARVN
            </span>
            để được tư <br />
            vấn sản phẩm và thẩm định hồ sơ trực tiếp. Giấy tờ gốc cần có:
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="bg-[#F0F0F0] w-full sm:w-[300px] sm:h-[350px] lg:w-[340px] h-auto p-6 rounded-[12px]">
              <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
                <h3 className="text-white font-bold text-sm">
                  Vay dưới 20 triệu
                </h3>
              </div>
              <div className="text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                <span className="font-bold">• CMND/CCCD</span> còn hạn sử dụng
                (15 năm tính từ ngày cấp)
              </div>
            </div>

            <div className="bg-[#F0F0F0] w-full sm:w-[300px]  lg:w-[340px] h-auto p-6 rounded-[12px]">
              <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
                <h3 className="text-white font-bold text-sm">
                  Vay 20 - 40 triệu
                </h3>
              </div>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] pb-[10px]">
                Bao gồm tất cả các điều kiện của các khoản vay thấp hơn và:
              </p>
              <p className="font-bold text-[14px] sm:text-[16px] lg:text-[18px]">
                {" "}
                • BHYT Công ty cấp.
              </p>
              <div className="text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                <span className="font-bold">• Hóa đơn tiền điện/ nước/</span>{" "}
                internet/ truyền hình cáp/ điện thoại do khách hàng đứng tên
                hoặc có địa chỉ trùng với nơi khách hàng sinh sống
              </div>
            </div>

            <div className="bg-[#F0F0F0] w-full sm:w-[300px]  lg:w-[340px] h-auto p-6 rounded-[12px]">
              <div className="bg-blue-500 rounded-lg p-2 text-center mb-4">
                <h3 className="text-white font-bold text-sm">
                  Vay 40 - 60 triệu
                </h3>
              </div>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] pb-[10px]">
                Bao gồm tất cả các điều kiện của các khoản vay thấp hơn và:
              </p>
              <div className="text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed pb-[10px]">
                • Nếu đang đi làm:
                <span className="font-bold">
                  {" "}
                  có sao kê tài khoản ngân hàng nhận lương 3 tháng gần nhất/ hợp
                  đồng lao động/ bảo hiểm y tế
                </span>
              </div>
              <div className="text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed">
                • Nếu là chủ doanh nghiệp:
                <span className="font-bold">
                  {" "}
                  Giấy đăng ký kinh doanh + Biên lai nộp thuế 3 tháng gần nhất
                </span>
              </div>
            </div>
          </div>

          <div className="text-[14px] sm:text-[16px] lg:text-[18px] mt-[20px] mx-4 sm:mx-[50px]">
            <span className="font-bold mr-[10px]">Lưu ý:</span>- Thời gian duyệt
            hồ sơ từ 10 - 30 phút
            <p className="ml-6 sm:ml-[65px] mt-2">
              - HD SAISON chỉ kiểm tra xong giấy tờ gốc và gửi lại, không giữ
              bất cứ giấy tờ gì của khách hàng
            </p>
            <p className="ml-6 sm:ml-[65px] mt-2">
              - Khách hàng vẫn nhận đủ các chương trình khuyến mãi mà GEARVN
              đang áp dụng đối với từng sản phẩm
            </p>
          </div>
        </div>
      </div>

      <Method2 />
      <Method3 />
    </>
  );
};

export default Method1;