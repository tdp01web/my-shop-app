import React from "react";
import ProductList from "../../../../../components/ProductList";

const PCSellWell = () => {
  const products = [
    {
      id: 1,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/product1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 2,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/product1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 3,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/product1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 3,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/product1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
  ];

  const categories = [
    "PC I3",
    "PC I5",
    "PC I7",
    "PC I9",
    "PC R3",
    "PC R5",
    "PC R7",
    "PC R9",
  ];
  return (
    <div className="mx-auto w-full">
      <ProductList
        title="PC bán chạy"
        categories={categories}
        titleSale="Trả góp 0%"
        products={products}
        seeAllLink="/xem-tat-ca"
      />
    </div>
  );
};

export default PCSellWell;
