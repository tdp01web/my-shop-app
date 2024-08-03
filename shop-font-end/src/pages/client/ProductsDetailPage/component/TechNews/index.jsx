/* eslint-disable react/prop-types */
const TechNews = ({ product }) => {
  const { techNews } = product;
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">
        Tin tức về công nghệ
      </h2>
      <ul className="list-none space-y-2">
        {techNews && techNews.length > 0 ? (
          techNews.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="text-blue-500">
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
