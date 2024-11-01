import { useEffect, useState } from "react";

const useBrandFilter = (products, selectedBrand) => {
  const [Brand, setBrand] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const brandSet = new Set();
      products.forEach((product) => {
        if (product.brand && product.brand.title) {
          brandSet.add(product.brand.title);
        }
      });
      setBrand(Array.from(brandSet));
    }
  }, [products]);

  useEffect(() => {
    if (selectedBrand.length === 0) {
      setFilteredProducts(products); 
    } else {
      const selectedBrandTitles = selectedBrand
        .map((index) => Brand[index])
        .filter(Boolean);

      const newFilteredProducts = products.filter(
        (product) =>
          product.brand &&
          product.brand.title &&
          selectedBrandTitles.includes(product.brand.title)
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedBrand, Brand, products]);

  return { Brand, filteredProducts };
};

export default useBrandFilter;
