import { useState } from "react";

const ProductInformation = () => {
  const [showFullReview, setShowFullReview] = useState(false);

  const toggleReview = () => {
    setShowFullReview((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full lg:w-7/12">
      <div className="w-full">
        <h2 className="text-sm font-semibold border-b pb-2 mb-4">
          Thông tin sản phẩm
        </h2>
        <div>
          <h3 className="font-bold mb-2 text-sm">Thông số kĩ thuật:</h3>
          <table className="w-full text-left border-collapse border">
            <tbody>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  CPU
                </th>
                <td className="border px-3 text-xs">
                  Intel® Core™ Ultra 7 155H, 16C (6P + 8E + 2LPE) / 22T, Max
                  Turbo up to 4.8GHz, 24MB
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  Ram
                </th>
                <td className="border px-3 text-xs">
                  32GB Soldered LPDDR5x-7467 (Dual channel, Không nâng cấp)
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  SSD
                </th>
                <td className="border px-3 text-xs">
                  1TB SSD M.2 2242 PCIe® 4.0x4 NVMe® (1 slot, nâng cấp tới đa
                  1TB)
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  Card đồ họa
                </th>
                <td className="border px-3 text-xs">
                  Integrated Intel® Arc™ Graphics
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  Màn hình
                </th>
                <td className="border px-3 text-xs">
                  14” WUXGA (1920x1200) OLED 400nits Glossy, 100% DCI-P3, 60Hz,
                  DisplayHDR™ True Black 500
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Cổng giao tiếp
                </th>
                <td className="border px-3 text-xs">
                  1x USB-A (USB 5Gbps / USB 3.2 Gen 1)
                  <br />
                  1x USB-A (USB 5Gbps / USB 3.2 Gen 1, Always On)
                  <br />
                  2x USB-C® (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and
                  DisplayPort™ 1.4
                  <br />
                  1x HDMI® 1.4b
                  <br />
                  1x Headphone / microphone combo jack (3.5mm)
                  <br />
                  1x microSD card reader
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  Bàn phím
                </th>
                <td className="border px-3 text-xs">
                  Bàn phím tiêu chuẩn, có LED đơn sắc
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Audio
                </th>
                <td className="border px-3 text-xs">
                  Stereo speakers, 2W x2, optimized with Dolby® Audio™
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Chuẩn LAN
                </th>
                <td className="border px-3 text-xs">None</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Chuẩn WIFI
                </th>
                <td className="border px-3 text-xs">Wi-Fi® 6, 11ax 2x2</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Bluetooth
                </th>
                <td className="border px-3 text-xs">Bluetooth® 5.2</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300 text-[#428BCA]">
                  Webcam
                </th>
                <td className="border px-3 text-xs">
                  FHD 1080p + IR with Privacy Shutter, ToF Sensor
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Bảo mật
                </th>
                <td className="border px-3 text-xs">
                  Camera privacy shutter IR camera for Windows® Hello
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Hệ điều hành
                </th>
                <td className="border px-3 text-xs">
                  Windows® 11 Home Single Language, English
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Pin
                </th>
                <td className="border px-3 text-xs">Integrated 57Wh</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Trọng lượng
                </th>
                <td className="border px-3 text-xs">1.46 kg</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Màu sắc
                </th>
                <td className="border px-3 text-xs">Cloud Grey</td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Chất liệu
                </th>
                <td className="border px-3 text-xs">
                  Aluminium (Top), Aluminium (Bottom)
                </td>
              </tr>
              <tr className="border">
                <th className="p-2 bg-gray-200 border text-xs border-gray-300">
                  Kích thước
                </th>
                <td className="border px-3 text-xs">
                  312 x 221 x 16.9 mm (12.28 x 8.7 x 0.67 inches)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          {showFullReview ? (
            <>
              <div className="mt-4">
                <h1 className="font-bold mb-2 text-[22px]">
                  Đánh giá chi tiết laptop Lenovo Ideapad Slim 5 14IMH9
                  83DA001VN
                </h1>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="w-full">
                    <div className="mt-4">
                      <p>
                        Laptop Lenovo Ideapad Slim 5 14IMH9 83DA001VN có thiết
                        kế tinh tế và hiện đại, phản ánh sự sáng tạo trong từng
                        chi tiết. Với vỏ ngoài được làm từ chất liệu nhôm cao
                        cấp, máy mang đến sự chắc chắn và sang trọng. Bề mặt
                        nhôm mịn màng mang lại cảm giác chạm tay êm ái và đẳng
                        cấp cho người sử dụng.
                      </p>
                      <p>
                        Về trọng lượng và kích thước, laptop này rất nhẹ và tiện
                        lợi để mang theo mọi nơi. Với trọng lượng chỉ khoảng
                        1.46 kg, và kích thước gọn nhẹ, máy có thể dễ dàng bỏ
                        vào túi xách hoặc cặp sách, phù hợp cho những người luôn
                        di chuyển hoặc làm việc trên đường. Tính di động cao cấp
                        của Lenovo Ideapad Slim 5 giúp người dùng linh hoạt
                        trong việc sử dụng từng ngày, từ văn phòng đến học tập
                        và giải trí.
                      </p>
                      <p>
                        Laptop Lenovo Ideapad Slim 5 14IMH9 83DA001NVN được
                        trang bị cấu hình mạnh mẽ với CPU và RAM đáng chú ý. CPU
                        Intel® Core™ Ultra 5 125H và RAM dung lượng lớn (16GB)
                        giúp máy xử lý tác vụ một cách mượt mà và hiệu quả.
                      </p>
                      <p>
                        Với việc trang bị, Lenovo Ideapad Slim 5 có khả năng xử
                        lý công việc đa nhiệm nhanh chóng và linh hoạt. Từ việc
                        duyệt web đến xử lý dữ liệu lớn, máy hoạt động mượt mà
                        và ổn định, giúp người dùng tiết kiệm thời gian và nâng
                        cao hiệu suất làm việc.
                      </p>
                      <p>
                        Đối với đồ họa và game, laptop này được trang bị card đồ
                        họa tích hợp, mang lại khả năng xử lý đồ họa tốt và trải
                        nghiệm chơi game mượt mà. Dù không phải là một máy
                        chuyên gaming, nhưng Lenovo Ideapad Slim 5 vẫn đủ sức
                        đáp ứng nhu cầu giải trí của người dùng thông thường và
                        xử lý các tác vụ đồ họa cơ bản một cách dễ dàng.
                      </p>
                      <p>
                        Màn hình của laptop Lenovo Ideapad Slim 5 14IMH9
                        83DA001NVN thuộc loại màn OLED kích thước vừa tầm 14
                        inch với độ sáng tốt lên đến 400nits và tần số quét phù
                        hợp với kích thước này là 60Hz nên có thể đem lại cho
                        bạn một trải nghiệm ưng ý.
                      </p>
                      <p>
                        Màn hình của máy mang lại chất lượng hình ảnh sắc nét và
                        sống động, đảm bảo trải nghiệm xem và làm việc tốt nhất
                        cho người dùng. Độ sáng của màn hình được điều chỉnh sao
                        cho phù hợp với môi trường sử dụng, từ ánh sáng yếu đến
                        ánh sáng mạnh. Độ phân giải cao (1920x1200) giúp hiển
                        thị hình ảnh chi tiết và rõ nét.
                      </p>
                      <p>
                        Bên cạnh hình ảnh đẹp thì Laptop Lenovo Ideapad Slim 5
                        cũng đáp ứng được chất lượng về âm thanh khi trang bị hệ
                        thống âm thanh tích hợp, mang lại trải nghiệm âm thanh
                        sống động và chân thực. Loa stereo tích hợp cung cấp âm
                        thanh rõ ràng và mạnh mẽ, giúp người dùng thưởng thức âm
                        nhạc, xem phim và trò chơi với trải nghiệm giải trí tốt
                        nhất.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="blur-sm">
              Đánh giá chi tiết laptop Lenovo Ideapad Slim 5 14IMH9 83DA001NVN
            </div>
          )}
          <button className="mt-2 text-blue-500" onClick={toggleReview}>
            {showFullReview ? "Thu gọn ▲" : "Đọc tiếp bài viết ▼"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
