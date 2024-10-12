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
          <h2 className="text-center pt-[20px] text-[28px] font-bold text-white">
            Cách 1: Duyệt hồ sơ tại Showroom GEARVN
          </h2>
        </div>
        <div className="h-[635px]  bg-white shadow-md rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          <p className=" text-[18px] ml-[50px] py-[30px]">
            <span className="font-bold">
              Khách hàng mang đầy đủ hồ sơ tới Showroom GEARVN
            </span>
            để được tư <br /> vấn sản phẩm và thẩm định hồ sơ trực tiếp. Giấy tờ
            gốc cần có:
          </p>
          <div className="flex justify-center ">
            <div className="bg-[#F0F0F0] w-[340px] relative h-[350px] rounded-[12px] mr-[30px] ">
              <div className="pt-[50px] pl-[30px] text-[18px] relative">
                <span className="font-bold ">• CMND/CCCD</span>còn hạn sử dụng
                <br />
                (15 năm tính từ ngày cấp)
              </div>
              {/* <div className="px-9 py-2 bg-blue-500 w-[70%] rounded-xl absolute   top-[-18px] left-[50px] font-bold text-white ">
                Vay dưới 20 triệu
              </div> */}
            </div>
            <div className="bg-[#F0F0F0] w-[340px] h-[350px] rounded-[12px] mr-[30px]">
              <div className="pt-[50px] pl-[30px] relative">
                <p className="text-[18px] pb-[15px]">
                  Bao gồm tất cả các điều kiện của các khoản vay thấp hơn và:
                </p>
                <p className="font-bold text-[18px] "> • BHYT Công ty cấp.</p>
                <div className="text-[18px]">
                  <span className="font-bold text-[18px] ">
                    • Hóa đơn tiền điện/ nước/ <br />
                    internet/ truyền hình cáp/ điện thoại:
                  </span>
                  do khách hàng đứng tên <br /> hoặc có địa chỉ trùng với nơi
                  khách hàng sinh sống
                </div>
              </div>
              {/* <div className="px-9 py-2 bg-blue-500 w-[17%] rounded-xl absolute left-[620px] top-[1050px]  font-bold text-white ">
                Vay từ 20 - 40 triệu
              </div> */}
            </div>
            <div className="bg-[#F0F0F0] w-[340px] h-[350px] rounded-[12px]">
              <div className="pt-[50px] pl-[30px]">
                <p className="text-[18px] pb-[15px]">
                  Bao gồm tất cả các điều kiện của các khoản vay thấp hơn và:
                </p>
                <div className="text-[18px] pb-[20px]">
                  • Nếu đang đi làm:
                  <span className="font-bold text-[18px] ">
                    có sao kê tài khoản ngân hàng nhận lương 3 tháng gần nhất/
                    hợp đồng lao động/ bảo hiểm y tế
                  </span>
                </div>
                <div className="text-[18px]">
                  • Nếu là chủ doanh nghiệp:
                  <span className="font-bold text-[18px] ">
                    Giấy <br />
                    đăng ký kinh doanh + Biên lai nộp thuế 3 tháng gần nhất
                  </span>
                </div>
              </div>
              {/* <div className="px-9 py-2 bg-blue-500 w-[15%] rounded-xl absolute  font-bold text-white ">
                Vay dưới 20 triệu
              </div> */}
            </div>
          </div>
          <div className="  text-[18px] mt-[20px] ml-[50px]">
            <span className="font-bold mr-[15px]">Lưu ý:</span>- Thời gian duyệt
            hồ sơ từ 10 - 30 phút
            <p className="ml-[65px]">
              - HD SAISON chỉ kiếm tra xong giấy tờ gốc và gửi lại, không giữ
              bất cứ giấy tờ gì của khách hàng
            </p>
            <p className="ml-[65px]">
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