import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBreakpoints } from "../../../../../../hooks/useBreakpoints";

/* eslint-disable react/prop-types */
const Menu = ({ products }) => {
  const { mobile, tablet, laptop, desktop } = useBreakpoints();

  const topNewProducts = useMemo(() => {
    return products
      ?.filter((product) => product.status !== 0)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [products]);

  return (
    <div className="relative flex gap-4 md:w-full">
      <ul className="md:flex md:flex-col md:gap-[10px] hidden bg-[#E30019] md:bg-white md:px-5 py-3 md:py-2 p-2 md:rounded-lg w-full md:w-full font-500 text-[14px] 2xl:text-[13px] overflow-x-auto hide-scrollbar">
        {topNewProducts && (
          <div className="top-viewed-products">
            <h4 className="mb-2 font-bold text-[#E30019] text-[20px]">
              Sản phẩm mới nhất
            </h4>
            <ul className="flex flex-wrap items-center gap-2">
              {topNewProducts.map((product, productIndex) => (
                <li
                  key={productIndex}
                  className={`flex items-center ${
                    productIndex < topNewProducts.length - 1
                      ? "border-b border-gray-300 pb-2 mb-2 w-[190px]"
                      : ""
                  }`}
                >
                  <Link
                    to={`/products/${product._id}`}
                    className="flex text-black hover:underline"
                  >
                    {product.images && product.images.length > 0 && (
                      <img
                        src={`${product.images[0].url}`}
                        alt={product.title}
                        className="mr-2 w-[50px] h-[50px] object-cover"
                      />
                    )}
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
