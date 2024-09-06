import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountLayout from "../layouts/account";
import LayoutAdmin from "../layouts/admin";
import LayoutClient from "../layouts/client";
import NotFoundPage from "../pages/NotFoundPage";
import NotFoundSearch from "../pages/NotFoundSearch";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import ListCategoriesAdmin from "../pages/admin/categories/ListCategoriesAdmin";
import AddEditCategory from "../pages/admin/categories/component/AddCategory";
import ListProductAdmin from "../pages/admin/products/ListProductAdmin";
import AboutsPage from "../pages/client/AboutsPage";
import AccountAddress from "../pages/client/Account/AccountAddress";
import AccountInformation from "../pages/client/Account/AccountInformation";
import OrderDetail from "../pages/client/Account/OrderDetail";
import OrdersHistory from "../pages/client/Account/OrdersHistory";
import ContactPage from "../pages/client/ContactPage";
import HomePage from "../pages/client/HomePage";
import OrdersPage from "../pages/client/OrdersPage";
import ProductDetailPage from "../pages/client/ProductsDetailPage/ProductDetailPage";
import ProductPage from "../pages/client/ProductsPage";
import CartPage from "../pages/client/cart/CartPage";
import Login from "../pages/client/login/Login";
import Register from "../pages/client/register";
import CategoryEditPage from "../pages/admin/categories/component/EditCategory";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route path="" element={<AccountInformation />} />
            <Route path="address" element={<AccountAddress />} />
            <Route path="orders-history" element={<OrdersHistory />} />
            <Route path="orders/:id" element={<OrderDetail />} />
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
            <Route path="add" element={<AddEditCategory />} />
            <Route path=":id/edit" element={<CategoryEditPage />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="not-found-search" element={<NotFoundSearch />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
