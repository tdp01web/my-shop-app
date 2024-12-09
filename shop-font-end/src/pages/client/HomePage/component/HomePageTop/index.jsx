import { useQuery } from "@tanstack/react-query";
import React from "react";
import { instance } from "../../../../../configs/instance";
import ImageBanner from "./component/Banner";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";

const HomePageTop = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["LatestProducts"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/product/getLatestProducts");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col md:gap-2 w-full">
        <Menu products={products} isLoading={isLoading} />
        <SlideBanner />
      </div>
      <ImageBanner />
    </div>
  );
};

export default HomePageTop;
