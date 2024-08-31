import HeaderLayoutClient from "../layouts/client/components/header";
import FooterLayoutClient from "../layouts/client/components/footer";

const NotFoundPage = () => {
  return (
    <>
      <div className="bg-[#ECECEC] mx-auto max-w-screen-xl">
        <HeaderLayoutClient />
        <main className="mx-auto w-full md:w-[60%]">
          <div className="bg-white mx-auto px-4 py-8 w-full">
            <div className="mx-auto text-center">
              <img
                src="https://file.hstatic.net/200000636033/file/404_0031c39563584f53bce84ce2e6add746.png"
                alt=""
              />
              <p className="mb-4 font-bold text-gray-900 text-xl md:text-2xl tracking-tight">
                Rất tiếc trang bạn tìm kiếm đang không tồn tại
              </p>
              <p className="font-light text-gray-500 text-sm md:text-lg">
                Nếu bạn cần hỗ trợ, vui lòng liên hệ tổng đài
              </p>
              <p className="font-light text-lg text-red-900">1800 6975</p>
              <a
                href="/"
                className="inline-flex bg-primary-600 hover:bg-primary-800 px-5 py-2.5 rounded-lg focus:ring-4 text-primary focus:outline-none focus:ring-primary-300 font-medium text-center text-sm"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </main>
        <FooterLayoutClient />
      </div>
    </>
  );
};

export default NotFoundPage;
