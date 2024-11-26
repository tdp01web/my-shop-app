import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => {
  return (
    <div className="h-[100%] bg-white border border-solid border-[#CFCFCF] flex flex-col gap-3 px-2 py-2 rounded-sm">
      <Skeleton height={150} />
      <Skeleton height={30} />
    </div>
  );
};

export default BlogSkeleton;
