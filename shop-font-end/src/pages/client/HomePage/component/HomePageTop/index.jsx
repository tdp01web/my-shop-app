import React from "react";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";
import ImageBanner from "./component/Banner";

const HomePageTop = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col md:flex-row md:gap-2">
        <Menu />
        <SlideBanner />
      </div>
      <ImageBanner />
    </div>
  );
};

export default HomePageTop;
