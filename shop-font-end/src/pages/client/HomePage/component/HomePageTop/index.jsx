import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../../../configs/instance";
import ImageBanner from "./component/Banner";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";

const HomePageTop = () => {
  const { data: products } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getAllProducts");
      // console.log("sfld;jsf", data.data);
      return data;
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-col md:flex-row md:gap-2">
        <Menu products={products} />
        <SlideBanner />
      </div>
      <ImageBanner />
    </div>
  );
};

export default HomePageTop;
