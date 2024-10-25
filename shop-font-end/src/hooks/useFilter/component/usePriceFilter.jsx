import { useEffect, useState } from "react";

const usePriceFilter = (products, priceRange) => {
  const [priceNames, setPriceNames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [noProductsMessage, setNoProductsMessage] = useState(""); // Thêm state cho thông báo

  useEffect(() => {
    if (products) {
      const prices = new Set();
      products.forEach((product) => {
        product.variants.forEach((variant) => {
          if (variant.price) {
            prices.add(variant.price);
          }
        });
      });
      setPriceNames(Array.from(prices));
    }
  }, [products]);

  useEffect(() => {
    if (priceRange) {
      const newFilteredProducts = products.filter((product) =>
        product.variants.some(
          (variant) =>
            variant.price >= priceRange[0] && variant.price <= priceRange[1]
        )
      );

      if (newFilteredProducts.length === 0) {
        setNoProductsMessage(
          "Không có sản phẩm nào phù hợp với khoảng giá đã chọn."
        );
      } else {
        setNoProductsMessage("");
      }

      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(products);
      setNoProductsMessage("");
    }
  }, [priceRange, products]);

  return { priceNames, filteredProducts, noProductsMessage };
};

export default usePriceFilter;
