import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../../../configs/instance";
import ImageBanner from "./component/Banner";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";

const HomePageTop = () => {
  const { data: products } = useQuery({
    queryKey: ["PRODUCTS"],
  });
  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col md:gap-2 w-full">
        <Menu products={products} />
        <SlideBanner />
      </div>
      <ImageBanner />
    </div>
  );
};

export default HomePageTop;
