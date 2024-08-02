import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../pages/client/ProductPage";
import LayoutClient from "../layouts/client";
import HomePage from "../pages/client/HomePage";
import LayoutAdmin from "../layouts/admin";
import NotFoundPage from "../pages/NotFoundPage";
import ListProductAdmin from "../pages/admin/products/ListProductAdmin";
import ListCategoriesAdmin from "../pages/admin/categories/ListCategoriesAdmin";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import ContactPage from "../pages/client/ContactPage";
import AboutsPage from "../pages/client/AboutsPage";
<<<<<<< HEAD
import ProductDetailPage from "../pages/client/ProductsDetailPage/ProductDetailPage";
=======
import OrdersPage from "../pages/client/OrdersPage";
import CartPage from "../pages/client/cart/CartPage";
>>>>>>> dac18cdab3e713201cce518e0aa17d80a81d7bf5
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route index element={<ProductPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
          <Route path="contacts" element={<ContactPage />}></Route>
          <Route path="abouts" element={<AboutsPage />}></Route>
          <Route path='cart' element={<CartPage />}></Route>
          <Route path='orders/bill' element={<OrdersPage />}></Route>
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<ListProductAdmin />} />
          <Route path="categories">
            <Route index element={<ListCategoriesAdmin />} />
          </Route>
        </Route>
        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
