import React from "react";
import Timer from "./component/Time";
import LottieAnimation from "./component/LottieAnimation";
import AnimatedText from "../../../../../hooks/AnimationText";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import SlideSaleProduct from "./component/SlideSaleProduct";

const Endow = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-[#1982F9] rounded-t-md px-4">
        <div className="flex gap-3  items-center ">
          <Timer
            initialDays={1}
            initialHours={0}
            initialMinutes={36}
            initialSeconds={33}
          />
          <LottieAnimation />
          <AnimatedText
            el="h1"
            text={["MIỄN PHÍ NÂNG CẤP 32GB RAM"]}
            className="md:text-xl sm:text-sm text-[16px] font-bold text-[#FDD835] "
            // repeatDelay={1000}
            // once
          />
        </div>
        <div>
          <Link
            to={"/"}
            className="lg:flex hidden  items-center gap-1 text-white"
          >
            Xem Chi Tiết <BiSolidRightArrow />
          </Link>
        </div>
      </div>
      <SlideSaleProduct />
    </div>
  );
};

export default Endow;
