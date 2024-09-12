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
import OrdersHistory from "../pages/client/Account/OrdersHistory";
import OrderDetail from "../pages/client/Account/OrderDetail";
import NotFoundSearch from "../pages/NotFoundSearch";
import PaymentManual from "../pages/client/PaymentManual/PaymentManual";
import ProductEditPage from "../pages/admin/products/editProduct";
import ProductAddPage from "../pages/admin/products/addProduct";
import Dashboard from "../pages/admin/dashboard";
import { UserPage } from "../pages/admin/user/ListUser";
import { UserAddPage } from "../pages/admin/user/addUser";
import { CartPageAdmin } from "../pages/admin/carts/ListCart";
import { ListComment } from "../pages/admin/comments/ListComment";
import { ListVouchers } from "../pages/admin/vouchers/ListVouchers";

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
          <Route path="payment-manual" element={<PaymentManual />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          {/* product */}
          <Route path="products" element={<ListProductAdmin />} />
          <Route path="products/add" element={<ProductAddPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} />
          {/* users */}
          <Route path="users" element={<UserPage />} />
          <Route path="users/add" element={<UserAddPage />} />
          <Route path="users/:id/edit" element={<ProductEditPage />} />
          {/* cart */}
          <Route path="carts" element={<CartPageAdmin />} />
          {/* <Route path="carts/:id/detail" element={<UserAddPage />} /> */}
          {/* comments */}
          <Route path="comments" element={<ListComment />} />
          {/* vouchers */}
          <Route path="vouchers" element={<ListVouchers />} />
          {/* <Route path="vouchers/add" element={< />} />
          <Route path="vouchers/:id/edit" element={< />} /> */}

          <Route path="categories">
            <Route index element={<ListCategoriesAdmin />} />
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
