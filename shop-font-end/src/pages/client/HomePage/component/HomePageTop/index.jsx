import React from "react";
import Menu from "./component/Menu";
import SlideBanner from "./component/SlideBanner";
import ImageBanner from "./component/Banner";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../../../configs/instance";
import Loader from "./../../../../../components/Loading";

const HomePageTop = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getAllProduct");
      // console.log(data);

      return data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="w-80% mx-auto ">
        Failed to load products. Please try again.
      </div>
    );
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
