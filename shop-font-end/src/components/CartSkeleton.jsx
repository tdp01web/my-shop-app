import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartSkeleton = () => {
  return (
    <div className="h-[100%] bg-white border border-solid border-[#CFCFCF] flex  gap-3 px-2 py-2 rounded-sm">
      <div className="w-1/3">
        <Skeleton height={150} />
      </div>

      <div className="w-2/3">
        <Skeleton height={30} />
        <Skeleton height={30} width={150} />
        <Skeleton height={30} width={150} />
      </div>
    </div>
  );
};

export default CartSkeleton;
