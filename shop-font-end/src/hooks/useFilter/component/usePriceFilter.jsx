import { useEffect, useState } from "react";

const usePriceFilter = (products, priceRange) => {
  const [priceNames, setPriceNames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

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
    if (priceRange && products) {
      const newFilteredProducts = products.filter(
        (product) =>
          product.variants &&
          product.variants.some((variant) => {
            const variantPrice = Number(variant.price);

            return (
              variantPrice >= priceRange[0] && variantPrice <= priceRange[1]
            );
          })
      );

      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(products || []);
    }
  }, [priceRange, products]);

  return { priceNames, filteredProducts };
};

export default usePriceFilter;
