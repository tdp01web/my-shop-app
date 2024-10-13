import React from "react";
import HomePageTop from "./component/HomePageTop";
import Endow from "./component/Endow";
import BannerSale from "./component/BannerSale";
import AlertImage from "./component/AlertImage";
import PCSellWell from "./component/PCSellWell";
import LaptopSellWell from "./component/LaptopSellWell";
import TechnologyNews from "./component/TechnologyNews";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../configs/instance";

const HomePage = () => {
  const { data, loading } = useQuery({
    queryKey: ["Data_HomePage"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getAllProduct");
      // console.log("products", data);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <AlertImage />
      <HomePageTop />
      <Endow />
      <BannerSale />
      {/* <PCSellWell /> */}
      <LaptopSellWell products={data} />
      <TechnologyNews />
    </div>
  );
};

export default HomePage;
