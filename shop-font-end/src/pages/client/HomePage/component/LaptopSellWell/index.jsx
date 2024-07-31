import React from "react";
import ProductList from "../../../../../components/ProductList";

const LaptopSellWell = () => {
  const products = [
    {
      id: 1,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/laptop1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 2,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/laptop2.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 3,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/laoptop3.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 4,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/public/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
  ];

  const categories = ["ASUS", "MSI", "LENOVO", "DELL", "LG", "ACER"];
  return (
    <div className="mx-auto w-full">
      <ProductList
        title="Laptop bán chạy"
        categories={categories}
        titleSale="Miễn Phí giao hàng"
        products={products}
        seeAllLink="/xem-tat-ca"
      />
    </div>
  );
};

export default LaptopSellWell;
