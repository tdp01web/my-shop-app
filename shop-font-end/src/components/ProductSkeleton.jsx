import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="h-[100%] bg-white border border-solid border-[#CFCFCF] flex flex-col gap-3 px-2 py-2 rounded-sm">
      <Skeleton height={200} />
      <Skeleton height={20} width="70%" />
      <Skeleton height={20} width="30%" />
      <div className="flex flex-col gap-2">
        <Skeleton height={15} count={4} width="60%" />
      </div>
      <Skeleton height={15} width="40%" />
    </div>
  );
};

export default ProductSkeleton;
