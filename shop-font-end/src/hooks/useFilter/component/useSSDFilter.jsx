import { useEffect, useState } from "react";

const useSSDFilter = (products, selectedSSD) => {
  const [SSDnames, setSSDnames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const names = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (
            variant.storage &&
            variant.storage.capacity &&
            product.status === 1
          ) {
            names.add(variant.storage.capacity);
          }
        })
      );
      setSSDnames(Array.from(names));
    }
  }, [products]);

  useEffect(() => {
    if (selectedSSD.length === 0) {
      setFilteredProducts(products);
    } else {
      const selectedSSDCapacities = selectedSSD.map((index) => SSDnames[index]);
      const newFilteredSSD = products.filter((product) =>
        product.variants.some((variant) =>
          selectedSSDCapacities.includes(variant.storage.capacity)
        )
      );
      setFilteredProducts(newFilteredSSD);
    }
  }, [selectedSSD, SSDnames, products]);

  return { SSDnames, filteredProducts };
};

export default useSSDFilter;
