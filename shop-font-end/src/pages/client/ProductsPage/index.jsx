import React from 'react'
import ProductList from '../../../components/ProductList'
import SliderBanner from './components/SliderBanner';
import BannerSale from './components/BannerSale';
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
const ProductPage = () => {
  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      {/* banner slider */}
      <SliderBanner />
      {/* banner sale */}
      <BannerSale />
      {/* list all sản phẩm */}
      <div className="mx-auto w-full">
        <ProductList
          title="Tất cả sản phẩm"
          categories={categories}
          titleSale="trả góp 0%"
          products={products}
          seeAllLink="/xem-tat-ca"
        />
      </div>
    </div>
  )
}

export default ProductPage