import SvgIcon from "@mui/material/SvgIcon";
import ProductList from "./component/ProductList";
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Collection = () => {
  const products = [
    {
      id: 1,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop1.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 2,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop2.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 3,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laoptop3.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 4,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 5,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 6,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 7,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 8,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 9,
      name: "PC GVN x ASUS ROG Hyperion White (Intel i9-14900K/ VGA RTX 4090)",
      price: 25000000,
      priceOld: 30000000,
      image: "/images/product/laptop5.webp",
      sold: 10,
      rating: 5.0,
      reviews: 1,
    },
  ];

  return (
    <div className="relative z-20 flex flex-col gap-6 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <div className="ml-3 mt-3 flex items-center gap-3 whitespace-nowrap overflow-hidden">
        <HomeIcon color="primary" />
        <span className="text-[#1982F9] text-[16px] font-bold">Trang chủ</span>
        <span className="text-gray-500">/</span>
        <span className="text-[16px] font-semibold">Laptop</span>
      </div>

      <img
        src="/images/banner-filter.webp"
        className="w-full h-auto rounded-lg shadow-md"
      />
      <div className="mx-auto w-full">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Collection;
