import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBreakpoints } from "../../../../../../hooks/useBreakpoints";
import clsx from "clsx";
import ProductMenuSkeleton from "../../../../../../components/ProductMenuSkeleton";

/* eslint-disable react/prop-types */
const Menu = ({ products, isLoading }) => {
  const placeholderProducts = useMemo(() => Array(5).fill(null), []);

  return (
    <div className="relative flex gap-4 md:w-full">
      <div className="md:flex md:flex-col md:gap-[10px] hidden bg-[#E30019] md:bg-white md:px-5 py-3 md:py-2 p-2 md:rounded-lg w-full md:w-full font-500 text-[14px] 2xl:text-[13px] overflow-x-auto hide-scrollbar">
        <div className="h-full">
          <h4 className="mb-2 font-bold text-[#E30019] text-[20px]">
            Sản phẩm mới nhất
          </h4>
          <div className="flex flex-col h-full">
            {(isLoading ? placeholderProducts : products)?.map(
              (item, index) => (
                <div key={index}>
                  {isLoading ? (
                    <ProductMenuSkeleton />
                  ) : (
                    <Link
                      className="flex flex-col"
                      to={`products/${item?._id}`}
                      key={item?._id}
                    >
                      <div className="flex gap-1 py-3">
                        <img
                          className="w-[30%]"
                          src={item?.images[0]?.url}
                          alt={item?.title || "Product"}
                        />
                        <p className="line-clamp-3">{item?.title}</p>
                      </div>
                    </Link>
                  )}

                  <hr
                    className={clsx("w-full border-gray-500", {
                      hidden:
                        index ===
                        (isLoading
                          ? placeholderProducts.length
                          : products.length) -
                          1,
                    })}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
