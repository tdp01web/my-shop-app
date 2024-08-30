import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderLayoutClient from "./components/header";
import FooterLayoutClient from "./components/footer";
import Banner from "./components/banner";
import Loader from "../../components/Loading";

const LayoutClient = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-col md:gap-10 bg-[#ECECEC]">
        <HeaderLayoutClient />
        {loading ? (
          <Loader />
        ) : (
          <main className="w-full mx-auto relative z-20">
            <Outlet />
          </main>
        )}

        <Banner />
        <FooterLayoutClient />
      </div>
    </>
  );
};

export default LayoutClient;
