import React, { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import HeaderLayoutClient from "./components/header";
import FooterLayoutClient from "./components/footer";
import Banner from "./components/banner";
import Loader from "../../components/Loading";
import Support from "../../components/Support";

const LayoutClient = () => {
  return (
    <>
      {/* <Support /> */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:gap-10 bg-[#ECECEC]">
        <HeaderLayoutClient />

        <main className="w-full mx-auto relative z-20">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>

        <Banner />
        <FooterLayoutClient />
      </div>
    </>
  );
};

export default LayoutClient;
