import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductMenuSkeleton = () => {
  return (
    <div className="w-[100%] bg-white  border-[#CFCFCF] flex  gap-1 py-3  rounded-sm">
      <Skeleton width={50} height={50} />
      <Skeleton width={130} height={50} />
    </div>
  );
};

export default ProductMenuSkeleton;
