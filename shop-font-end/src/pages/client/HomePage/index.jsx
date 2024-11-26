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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Data_HomePage"],
    queryFn: async () => {
      const { data } = await instance.get("/product/get-all-product-user");
      return data;
    },
    staleTime: 4 * 60 * 1000, // Dữ liệu sẽ được coi là mới trong 4 phút
    refetchOnWindowFocus: true, // Lấy lại dữ liệu khi cửa sổ được focus
    refetchOnMount: true, // Lấy lại dữ liệu khi component được remount
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: ListData } = useQuery({
    queryKey: ["List_Data_Blog"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/blog/getAllBlog");
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
  });

  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <AlertImage />
      <HomePageTop />
      <Endow />
      <BannerSale />
      {/* <PCSellWell /> */}
      {data && <LaptopSellWell products={data} />}

      {ListData && <TechnologyNews ListData={ListData} />}
    </div>
  );
};

export default HomePage;
