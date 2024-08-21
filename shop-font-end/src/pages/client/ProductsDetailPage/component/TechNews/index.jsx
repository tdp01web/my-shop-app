/* eslint-disable react/prop-types */
const TechNews = ({ product }) => {
  const { techNews } = product;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold pb-2 mb-4">Tin tức về công nghệ</h2>
      <ul className="list-none space-y-4">
        {techNews && techNews.length > 0 ? (
          techNews.map((item, index) => (
            <li key={index} className="flex gap-x-4 ">
              <img src={item.image} alt="" className="w-[88px]" />
              <a href={item.link} className="text-black font-400 text-[16px]">
                {item.title}
              </a>
            </li>
          ))
        ) : (
          <li className="text-gray-500">Không có tin tức nào.</li>
        )}
      </ul>
    </div>
  );
};

export default TechNews;
