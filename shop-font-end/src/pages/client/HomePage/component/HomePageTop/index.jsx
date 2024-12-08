import React from "react";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";
import ImageBanner from "./component/Banner";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";
import Loader from "./../../../../../components/Loading";

const HomePageTop = () => {
  const { data: products } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getLatestProducts");
      // console.log(data);

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
