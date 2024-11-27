import React from "react";
import Timer from "./component/Time";
import LottieAnimation from "./component/LottieAnimation";
import AnimatedText from "../../../../../hooks/AnimationText";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import SlideSaleProduct from "./component/SlideSaleProduct";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";

const Endow = () => {
  const { data } = useQuery({
    queryKey: ["Data_Laptop_Sell_Well"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("product/top-selling-user");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn:async ~ error:", error);
      }
    },
  });
  return (
    <div>
      <div className="flex justify-between items-center bg-[#1982F9] rounded-t-md px-4">
        <div className="flex gap-3  items-center ">
          {/* <Timer
            initialDays={1}
            initialHours={0}
            initialMinutes={36}
            initialSeconds={33}
          /> */}
          <LottieAnimation />
          <AnimatedText
            el="h1"
            text={["TOP 5 SẢN PHẨM BÁN CHẠY "]}
            className="md:text-xl sm:text-sm text-[16px] font-bold text-[#FDD835] "
            // repeatDelay={1000}
            // once
          />
        </div>
        <div>
          <Link
            to={"/collection"}
            className="lg:flex hidden  items-center gap-1 text-white"
          >
            Xem Chi Tiết <BiSolidRightArrow />
          </Link>
        </div>
      </div>
      {data && <SlideSaleProduct productList={data.products} />}
    </div>
  );
};

export default Endow;
