// hooks/useFilter/useArrangeFilter.js
import { useEffect, useState } from "react";

const useArrangeFilter = (filteredProducts) => {
  const [sortedProducts, setSortedProducts] = useState([]);

  const sortProducts = (option) => {
    let sorted = [...filteredProducts];
    switch (option) {
      case "Tên từ A-Z":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Tên từ Z-A":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Giá tăng dần":
        sorted.sort((a, b) => a.variants[0].price - b.variants[0].price);
        break;
      case "Giá giảm dần":
        sorted.sort((a, b) => b.variants[0].price - a.variants[0].price);
        break;
      default:
        return filteredProducts;
    }
    setSortedProducts(sorted);
  };

  // Update sorted products whenever the filtered products change
  useEffect(() => {
    setSortedProducts(filteredProducts);
  }, [filteredProducts]);

  return { sortedProducts, sortProducts };
};

export default useArrangeFilter;
