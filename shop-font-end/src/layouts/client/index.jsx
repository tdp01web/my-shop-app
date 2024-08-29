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
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="flex flex-col md:gap-10 bg-[#ECECEC] mx-auto max-w-screen-xl">
      <HeaderLayoutClient />
      <main className="mx-auto w-full">
        <Outlet />
      </main>
      <Banner />
      <FooterLayoutClient />
    </div>
  );
};

export default LayoutClient;
