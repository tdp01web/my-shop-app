import { useEffect, useState } from "react";

const useVgaFilter = (products, selectedVga) => {
  const [Vganames, setVganames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const names = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (variant.gpu && variant.gpu.name) {
            names.add(variant.gpu.name);
          }
        })
      );
      setVganames(Array.from(names));
    }
  }, [products]);

  useEffect(() => {
    if (selectedVga.length === 0) {
      setFilteredProducts(products);
    } else {
      const selectedVGA = selectedVga.map((index) => Vganames[index]);
      const newFilteredVga = products.filter((product) =>
        product.variants.some((variant) =>
          selectedVGA.includes(variant.gpu.name)
        )
      );
      setFilteredProducts(newFilteredVga);
    }
  }, [selectedVga, Vganames, products]);

  return { Vganames, filteredProducts };
};

export default useVgaFilter;
