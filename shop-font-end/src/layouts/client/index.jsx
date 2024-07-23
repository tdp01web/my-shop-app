import { Outlet } from "react-router-dom";
import HeaderLayoutClient from "./components/header";
import FooterLayoutClient from "./components/footer";
import Banner from "./components/banner";
const LayoutClient = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto bg-[#ECECEC]">
        <HeaderLayoutClient />
        {/* <Banner /> */}
        <main className="w-[80%] mx-auto ">
          <Outlet />
        </main>
        <FooterLayoutClient />
      </div>
    </>
  );
};

export default LayoutClient;
