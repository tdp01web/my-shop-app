import { useEffect, useState } from "react";

const useGpuFilter = (products, selectedGpu) => {
  const [Gpunames, setGpunames] = useState([]);
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
      setGpunames(Array.from(names));
    }
  }, [products]);

  useEffect(() => {
    if (selectedGpu.length === 0) {
      setFilteredProducts(products); // Không chọn GPU thì hiển thị tất cả
    } else {
      const selectedGPU = selectedGpu.map((index) => Gpunames[index]);
      const newFilteredGpu = products.filter((product) =>
        product.variants.some((variant) =>
          selectedGPU.includes(variant.gpu.name)
        )
      );
      setFilteredProducts(newFilteredGpu);
    }
  }, [selectedGpu, Gpunames, products]);

  return { Gpunames, filteredProducts };
};

export default useGpuFilter;
