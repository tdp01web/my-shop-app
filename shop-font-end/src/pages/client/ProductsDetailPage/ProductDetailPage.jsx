import { useEffect, useState } from "react";
import ProductInfoSection from "./component/comon/ProductInfoSection";
import ProductMainSection from "./component/comon/ProductMainSection";
import Review from "./component/Review";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productData = {
        name: "Laptop Gaming Lenovo LOQ 15IRX9 83DV00D5VN",
        price: 29490000,
        oldPrice: 31990000,
        category: "laptop",
        discount: 8,
        rating: 0,
        images: [
          {
            url: "https://product.hstatic.net/200000722513/product/ava_dd039a51e92146d5977d980f7d205e9d_grande.png",
            color: "#FF0000",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_5c414ae09f434b319245e4fcbc490093.png",
            color: "#00FF00",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_1141b8e21a7f4d91ab18c0725bc56d5e_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_39a1d4796c6a4d0c9c9c7ba46a717d4a_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/hn074w-final_d1f17cfe60c0443e9bb78a02fa874a21_large_50e5daebd00147d7959f5decd617b193_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/676vn_21da8c4630014f808b321b3d32118291_69f68ad8d3be44b385bb3da80ec4a9ee_medium.png",
            color: "#0000FF",
          },
        ],
        colors: [
          {
            name: "Đỏ",
            hex: "#FF0000",
            image:
              "https://product.hstatic.net/200000722513/product/676vn_21da8c4630014f808b321b3d32118291_69f68ad8d3be44b385bb3da80ec4a9ee_medium.png",
          },
          {
            name: "Xanh lá",
            hex: "#00FF00",
            image:
              "https://product.hstatic.net/200000722513/product/ava_1141b8e21a7f4d91ab18c0725bc56d5e_medium.png",
          },
        ],
        ram: "32 GB",
        lcd: "14” WUXGA OLED",
        cpu: "Ultra 7 155H",
        vga: "Onboard",
        ssd: "1TB",
        features: [
          "Bảo hành chính hãng 24 tháng.",
          "Hỗ trợ đổi mới trong 7 ngày.",
          "Windows bản quyền tích hợp.",
          "Miễn phí giao hàng toàn quốc.",
        ],
        specifications: [
          {
            key: "CPU",
            value:
              "Intel® Core™ Ultra 7 155H, 16C (6P + 8E + 2LPE) / 22T, Max Turbo up to 4.8GHz, 24MB",
          },
          {
            key: "Ram",
            value: "32GB Soldered LPDDR5x-7467 (Dual channel, Không nâng cấp)",
          },
          {
            key: "SSD",
            value:
              "1TB SSD M.2 2242 PCIe® 4.0x4 NVMe® (1 slot, nâng cấp tới đa 1TB)",
          },
          { key: "Card đồ họa", value: "Integrated Intel® Arc™ Graphics" },
          {
            key: "Màn hình",
            value:
              "14” WUXGA (1920x1200) OLED 400nits Glossy, 100% DCI-P3, 60Hz, DisplayHDR™ True Black 500",
          },
          {
            key: "Cổng giao tiếp",
            value:
              "1x USB-A (USB 5Gbps / USB 3.2 Gen 1)\n1x USB-A (USB 5Gbps / USB 3.2 Gen 1, Always On)\n2x USB-C® (USB 5Gbps / USB 3.2 Gen 1), with USB PD 3.0 and DisplayPort™ 1.4\n1x HDMI® 1.4b\n1x Headphone / microphone combo jack (3.5mm)\n1x microSD card reader",
          },
          { key: "Bàn phím", value: "Bàn phím tiêu chuẩn, có LED đơn sắc" },
          {
            key: "Audio",
            value: "Stereo speakers, 2W x2, optimized with Dolby® Audio™",
          },
          { key: "Chuẩn LAN", value: "None" },
          { key: "Chuẩn WIFI", value: "Wi-Fi® 6, 11ax 2x2" },
          { key: "Bluetooth", value: "Bluetooth® 5.2" },
          {
            key: "Webcam",
            value: "FHD 1080p + IR with Privacy Shutter, ToF Sensor",
          },
          {
            key: "Bảo mật",
            value: "Camera privacy shutter IR camera for Windows® Hello",
          },
          {
            key: "Hệ điều hành",
            value: "Windows® 11 Home Single Language, English",
          },
          { key: "Pin", value: "Integrated 57Wh" },
          { key: "Trọng lượng", value: "1.46 kg" },
          { key: "Màu sắc", value: "Cloud Grey" },
          { key: "Chất liệu", value: "Aluminium (Top), Aluminium (Bottom)" },
          {
            key: "Kích thước",
            value: "312 x 221 x 16.9 mm (12.28 x 8.7 x 0.67 inches)",
          },
        ],
        review: {
          title:
            "Đánh giá chi tiết laptop Lenovo Ideapad Slim 5 14IMH9 83DA001VN",
          content: [
            "Laptop Lenovo Ideapad Slim 5 14IMH9 83DA001VN có thiết kế tinh tế và hiện đại, phản ánh sự sáng tạo trong từng chi tiết. Với vỏ ngoài được làm từ chất liệu nhôm cao cấp, máy mang đến sự chắc chắn và sang trọng. Bề mặt nhôm mịn màng mang lại cảm giác chạm tay êm ái và đẳng cấp cho người sử dụng.",
            "Về trọng lượng và kích thước, laptop này rất nhẹ và tiện lợi để mang theo mọi nơi. Với trọng lượng chỉ khoảng 1.46 kg, và kích thước gọn nhẹ, máy có thể dễ dàng bỏ vào túi xách hoặc cặp sách, phù hợp cho những người luôn di chuyển hoặc làm việc trên đường. Tính di động cao cấp của Lenovo Ideapad Slim 5 giúp người dùng linh hoạt trong việc sử dụng từng ngày, từ văn phòng đến học tập và giải trí.",
            "Laptop Lenovo Ideapad Slim 5 14IMH9 83DA001NVN được trang bị cấu hình mạnh mẽ với CPU và RAM đáng chú ý. CPU Intel® Core™ Ultra 5 125H và RAM dung lượng lớn (16GB) giúp máy xử lý tác vụ một cách mượt mà và hiệu quả.",
            "Với việc trang bị, Lenovo Ideapad Slim 5 có khả năng xử lý công việc đa nhiệm nhanh chóng và linh hoạt. Từ việc duyệt web đến xử lý dữ liệu lớn, máy hoạt động mượt mà và ổn định, giúp người dùng tiết kiệm thời gian và nâng cao hiệu suất làm việc.",
          ],
        },
        promotions: [
          {
            id: 1,
            description:
              "Giảm ngay 100.000đ khi mua Microsoft Office kèm Laptop tại GEARVN.",
            linkText: "Xem thêm",
            linkHref: "#",
          },
          {
            id: 2,
            description:
              "Ưu đãi 50.000đ khi mua thêm túi chống sốc kèm Laptop.",
            linkText: "Xem thêm",
            linkHref: "#",
          },
          {
            id: 3,
            description:
              "Ưu đãi 100.000đ khi mua thêm RAM Laptop với Laptop Văn Phòng.",
            linkText: "Xem thêm",
            linkHref: "#",
          },
          {
            id: 4,
            description: "Ưu đãi 50.000đ khi mua giá treo kèm Laptop.",
            linkText: "Xem thêm",
            linkHref: "#",
          },
          {
            id: 5,
            description: "Ưu đãi 50.000đ khi mua đế tản nhiệt kèm Laptop.",
            linkText: "Xem thêm",
            linkHref: "#",
          },
        ],
        techNews: [
          {
            image:
              "https://file.hstatic.net/200000722513/article/gearvn-code-shindo-life-moi-nhat_be7590c1365f47d4aec1ef095e7a8a30_grande.jpg",
            title: "Máy in không in được: Nguyên nhân và cách khắc phục",
            link: "#",
          },
          {
            image:
              "https://file.hstatic.net/200000722513/article/npu-la-gi-banner_38e3cba2b4a2486492c5525172fbda7a_grande.jpg",
            title: "Lắp đặt camera an ninh cho gia đình cần lưu ý điều gì?",
            link: "#",
          },
          {
            image:
              "https://file.hstatic.net/200000722513/article/gearvn-code-genshin-impact-moi-nhat-danh-cho-nguoi-choi_571a19b47eaf4d72858f14661a41eff5_grande.jpg",
            title: "Phương pháp tính phần trăm trong Excel hiệu quả",
            link: "#",
          },
        ],
        giftList: [
          { name: "Balo MSI Essential Backpack (Kèm máy) " },
          {
            name: "Voucher ưu đãi Học sinh - Sinh viên trị giá 300k (Từ 01.08 - 31.10.2024)",
          },
          {
            name: "Chuột gaming tuỳ chọn trị giá đến 499k (Từ 01.08 - 31.10.2024)  - List sản phẩm.",
          },
        ],
        imagesale: [
          {
            images:
              "https://file.hstatic.net/200000722513/file/laptop_gaming_banner_product-detail.png",
          },
        ],
      };
      setProduct(productData);
      setSelectedColor(productData.colors[0].hex);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      const newIndex = product.images.findIndex(
        (img) => img.color === selectedColor
      );
      setCurrentImageIndex(newIndex);
    }
  }, [selectedColor, product]);

  const handleColorClick = (colorHex) => {
    setSelectedColor(colorHex);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      {/* <div className="lg:w-[80%] lg:mx-auto lg:mt-0 ml-3 mt-3 flex gap-3 whitespace-nowrap font-400 overflow-hidden">
        <BreadcrumbNavigation />
      </div> */}

      <div className="relative z-20">
        <ProductMainSection
          product={product}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          selectedColor={selectedColor}
          handleColorClick={handleColorClick}
        />
        <ProductInfoSection product={product} />
        <Review product={product} />
        <div className="p-3"></div>
      </div>
    </>
  );
};

export default ProductDetailPage;
