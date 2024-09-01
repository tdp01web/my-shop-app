import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "../pages/client/ProductsPage";
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
import ProductDetailPage from "../pages/client/ProductsDetailPage/ProductDetailPage";
import CartPage from "../pages/client/cart/CartPage";
import OrdersPage from "../pages/client/OrdersPage";
import Login from "../pages/client/login/Login";
import Register from "../pages/client/register";
import AccountLayout from "../layouts/account";
import AccountInformation from "../pages/client/Account/AccountInformation";
import AccountAddress from "../pages/client/Account/AccountAddress";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route path="" element={<AccountInformation />} />
            <Route path="address" element={<AccountAddress />} />
          </Route>
          <Route path="products">
            <Route index element={<ProductPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
          <Route path="contacts" element={<ContactPage />}></Route>
          <Route path="abouts" element={<AboutsPage />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="orders/bill" element={<OrdersPage />}></Route>
          <Route path="signin" element={<SigninPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<ListProductAdmin />} />
          <Route path="categories">
            <Route index element={<ListCategoriesAdmin />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
