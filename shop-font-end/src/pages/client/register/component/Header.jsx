import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full mx-auto  bg-[#d32026] py-5 px-[10%]">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            fit="contain"
            className="md:w-[170px] w-[100px]"
            src={"/images/logo/logoDesktop.png"}
            alt="Logo"
          />
        </Link>
        <Link to={"/contacts"}>
          <p className="text  text-white ">Bạn cần giúp đỡ gì?</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
