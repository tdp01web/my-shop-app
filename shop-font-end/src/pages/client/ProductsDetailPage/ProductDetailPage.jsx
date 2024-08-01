import { useEffect, useState } from "react";
import ProductInfoSection from "./component/comon/ProductInfoSection";
import ProductMainSection from "./component/comon/ProductMainSection";
import Review from "./component/Review";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productData = {
        name: "Laptop Gaming Lenovo LOQ 15IRX9 83DV00D5VN",
        price: 29490000,
        oldPrice: 31990000,
        discount: 8,
        rating: 0,
        images: [
          {
            url: "https://product.hstatic.net/200000722513/product/ava_dd039a51e92146d5977d980f7d205e9d_grande.png",
            color: "#FF0000",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_5c414ae09f434b319245e4fcbc490093.png",
            color: "#00FF00",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_1141b8e21a7f4d91ab18c0725bc56d5e_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/ava_39a1d4796c6a4d0c9c9c7ba46a717d4a_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/hn074w-final_d1f17cfe60c0443e9bb78a02fa874a21_large_50e5daebd00147d7959f5decd617b193_medium.png",
            color: "#0000FF",
          },
          {
            url: "https://product.hstatic.net/200000722513/product/676vn_21da8c4630014f808b321b3d32118291_69f68ad8d3be44b385bb3da80ec4a9ee_medium.png",
            color: "#0000FF",
          },
        ],
        colors: [
          {
            name: "Đỏ",
            hex: "#FF0000",
            image:
              "https://product.hstatic.net/200000722513/product/676vn_21da8c4630014f808b321b3d32118291_69f68ad8d3be44b385bb3da80ec4a9ee_medium.png",
          },
          {
            name: "Xanh lá",
            hex: "#00FF00",
            image:
              "https://product.hstatic.net/200000722513/product/ava_1141b8e21a7f4d91ab18c0725bc56d5e_medium.png",
          },
          // Thêm các màu khác ở đây
        ],
      };
      setProduct(productData);
      setSelectedColor(productData.colors[0].hex);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      const newIndex = product.images.findIndex(
        (img) => img.color === selectedColor
      );
      setCurrentImageIndex(newIndex);
    }
  }, [selectedColor, product]);

  const handleColorClick = (colorHex) => {
    setSelectedColor(colorHex);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="relative z-20">
      <ProductMainSection
        product={product}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        selectedColor={selectedColor}
        handleColorClick={handleColorClick}
      />
      <ProductInfoSection />
      <Review />
      <div className="p-3"></div>
    </div>
  );
};

export default ProductDetailPage;
