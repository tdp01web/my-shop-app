import { useEffect, useState } from "react";

const useRamFilter = (products, selectedIndices) => {
  const [ramSizes, setRamSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const sizes = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (variant.ram && variant.ram.size) {
            sizes.add(variant.ram.size);
          }
        })
      );
      setRamSizes(Array.from(sizes));
    }
  }, [products]);

  useEffect(() => {
    if (selectedIndices.length === 0) {
      setFilteredProducts(products); // Không chọn RAM thì hiển thị tất cả
    } else {
      const selectedRAMs = selectedIndices.map((index) => ramSizes[index]);
      const newFilteredProducts = products.filter((product) =>
        product.variants.some((variant) =>
          selectedRAMs.includes(variant.ram.size)
        )
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedIndices, ramSizes, products]);

  return { ramSizes, filteredProducts };
};

export default useRamFilter;
