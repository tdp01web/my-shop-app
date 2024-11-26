import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../../../configs/instance";
import Loader from "../../../../../components/Loading";

const BlogDetail = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["Blog-Detail"],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`/blog/getBlog/${id}`);
        return data;
      } catch (error) {
        console.log("🚀 ~ queryFn: ~ error:", error);
      }
    },
    onError: (error) => {
      console.log("🚀 ~ BlogDetail ~ error:", error);
    },
  });
  return data ? (
    <div className="flex flex-col gap-5 2xl:w-[80%] mx-auto bg-white rounded-md p-4">
      <img
        src="/images/homepage/headblog_banner.webp"
        className="w-full rounded-md"
        alt=""
      />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-[28px] ">{data?.title}</h2>
        <p className="text-gray-500 ">
          {data?.updatedAt} {data?.author.email}
        </p>
        <img src={data?.images[0].url} alt="" className="w-[50%] mx-auto" />
        <p>{data?.description}</p>
      </div>
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default BlogDetail;
