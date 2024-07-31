import { Outlet } from "react-router-dom";
import HeaderLayoutClient from "./components/header";
import FooterLayoutClient from "./components/footer";
import Banner from "./components/banner";
const LayoutClient = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-col md:gap-10 bg-[#ECECEC]">
        <HeaderLayoutClient />
        <main className="w-full mx-auto ">
          <Outlet />
        </main>
        <Banner />
        <FooterLayoutClient />
      </div>
    </>
  );
};

export default LayoutClient;
