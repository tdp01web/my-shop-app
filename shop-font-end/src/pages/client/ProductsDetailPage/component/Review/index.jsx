// Dữ liệu đánh giá mẫu
const ratingData = [
  { stars: 5, count: 0 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const Review = () => {
  return (
    <div className="bg-white p-4 rounded-lg lg:w-[80%] shadow-md max-w-3xl mx-auto mt-4">
      <h2 className="text-sm font-bold mb-4 pl-3">
        Đánh giá & Nhận xét Laptop Lenovo IdeaPad Slim 5 14IMH9 83DA0020VN
      </h2>
      <div className="flex justify-center">
        <div className="flex w-1/5 flex-col items-center mb-4">
          <div className="text-red-500 text-[36px] font-bold mt-16">0/5</div>
          <div className="flex mt-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4 text-gray-300 mx-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.771 1.577 8.194-7.513-3.944-7.513 3.944 1.577-8.194-6.064-5.771 8.332-1.151z" />
              </svg>
            ))}
          </div>
          <div className="text-[14px] text-gray-500 mt-1">
            0 đánh giá & nhận xét
          </div>
        </div>
        <div className="flex w-1/2 flex-col space-y-2 mb-4 pl-3">
          {ratingData.map((item) => (
            <div key={item.stars} className="flex items-center">
              <div className="flex-1 flex items-center">
                <span className="w-4">{item.stars}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 text-yellow-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.771 1.577 8.194-7.513-3.944-7.513 3.944 1.577-8.194-6.064-5.771 8.332-1.151z" />
                </svg>
                <div className="w-[83%] bg-gray-200 rounded-full h-2 mx-4">
                  <div
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${(item.count / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-[14px] text-gray-500 mx-9">
                {item.count} đánh giá
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block border-b border-gray-300 mb-14 mt-3"></div>
      <div className="flex pl-3">
        <button className="bg-blue-500 w-[34.5%] text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none">
          Gửi đánh giá của bạn
        </button>
      </div>
    </div>
  );
};

export default Review;
