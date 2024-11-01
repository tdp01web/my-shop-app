import { useEffect, useState } from "react";

const useCpuFilter = (products, selectedCpu) => {
  const [Cpunames, setCpunames] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const names = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (variant.processor && variant.processor.name) {
            names.add(variant.processor.name);
          }
        })
      );
      setCpunames(Array.from(names));
    }
  }, [products]);

  useEffect(() => {
    if (selectedCpu.length === 0) {
      setFilteredProducts(products); // Không chọn CPU thì hiển thị tất cả
    } else {
      const selectedCPU = selectedCpu.map((index) => Cpunames[index]);
      const newFilteredCpu = products.filter((product) =>
        product.variants.some((variant) =>
          selectedCPU.includes(variant.processor.name)
        )
      );
      setFilteredProducts(newFilteredCpu);
    }
  }, [selectedCpu, Cpunames, products]);

  return { Cpunames, filteredProducts };
};

export default useCpuFilter;
