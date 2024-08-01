const TechNews = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">
        Tin tức về công nghệ
      </h2>
      <ul className="list-none space-y-2">
        <li>
          <a href="#" className="text-blue-500">
            Máy in không in được: Nguyên nhân và cách khắc phục
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500">
            Lắp đặt camera an ninh cho gia đình cần lưu ý điều gì?
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500">
            Phương pháp tính phần trăm trong Excel hiệu quả
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500">
            Stalk là gì? Cách ngăn chặn stalk trên Facebook, Instagram
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500">
            Kiểm tra lỗi của laptop có bị sao không? Xử lý như thế nào?
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TechNews;
