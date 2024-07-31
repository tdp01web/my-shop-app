import React from "react";
import HomePageTop from "./component/HomePageTop";
import Endow from "./component/Endow";
import BannerSale from "./component/BannerSale";
import AlertImage from "./component/AlertImage";
import PCSellWell from "./component/PCSellWell";
import LaptopSellWell from "./component/LaptopSellWell";
import TechnologyNews from "./component/TechnologyNews";

const HomePage = () => {
  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <AlertImage />
      <HomePageTop />
      <Endow />
      <BannerSale />
      <PCSellWell />
      <LaptopSellWell />
      <TechnologyNews />
    </div>
  );
};

export default HomePage;
