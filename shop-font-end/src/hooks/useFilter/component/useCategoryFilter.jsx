import { useEffect, useState } from "react";

const useCategoryFilter = (products, selectedCategory) => {
  const [Category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const categorySet = new Set();
      products.forEach((product) => {
        if (product.category && product.category.name) {
          categorySet.add(product.category.name);
        }
      });
      setCategory(Array.from(categorySet));
    }
  }, [products]);

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setFilteredProducts(products);
    } else {
      const selectedCategoryNames = selectedCategory
        .map((index) => Category[index])
        .filter(Boolean);

      const newFilteredProducts = products.filter(
        (product) =>
          product.category &&
          product.category.name &&
          selectedCategoryNames.includes(product.category.name)
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedCategory, Category, products]);

  return { Category, filteredProducts };
};

export default useCategoryFilter;
