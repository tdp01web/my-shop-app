import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../configs/instance";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);
/* eslint-disable react/prop-types */
export const CartPro = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/cart/getCart");
        const products = response.data.products || [];
        const totalCount = products.reduce(
          (total, product) => total + product.count,
          0
        );
        setCartItemCount(totalCount);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cartUpdated || loading) {
      fetchCartData();
    }
  }, [cartUpdated]);

  const updateCart = (newCount) => {
    setCartItemCount((prevCount) => prevCount + newCount);
    setCartUpdated(!cartUpdated);
  };
  const deleteCart = (newCount) => {
    setCartItemCount((prevCount) => prevCount - newCount);
    setCartUpdated(!cartUpdated);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, updateCart, deleteCart }}>
      {children}
    </CartContext.Provider>
  );
};
