import React from "react";
import Bannerblog from "./component/Bannerblog";
import Titlecontent from "./component/Titleconten";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../configs/instance";
const BlogPage = () => {
  const { data: blogItems } = useQuery({
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
      <Bannerblog />
      <div className="w-full relative">
        {blogItems && <Titlecontent blogItems={blogItems} />}
      </div>
    </div>
  );
};
export default BlogPage;
