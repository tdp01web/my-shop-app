import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "../layouts/admin";
import LayoutClient from "../layouts/client";
import NotFoundPage from "../pages/NotFoundPage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import ListCategoriesAdmin from "../pages/admin/categories/ListCategoriesAdmin";
import AddEditCategory from "../pages/admin/categories/component/AddCategory";
import ListProductAdmin from "../pages/admin/products/ListProductAdmin";
import AboutsPage from "../pages/client/AboutsPage";
import ContactPage from "../pages/client/ContactPage";
import HomePage from "../pages/client/HomePage";
import OrdersPage from "../pages/client/OrdersPage";
import ProductDetailPage from "../pages/client/ProductsDetailPage/ProductDetailPage";
import ProductPage from "../pages/client/ProductsPage";
import CartPage from "../pages/client/cart/CartPage";
import Login from "../pages/client/login/Login";
import Register from "../pages/client/register";
import AccountLayout from "../layouts/account";
import AccountInformation from "../pages/client/Account/AccountInformation";
import AccountAddress from "../pages/client/Account/AccountAddress";
import OrdersHistory from "../pages/client/Account/OrdersHistory";
import OrderDetail from "../pages/client/Account/OrderDetail";
import NotFoundSearch from "../pages/NotFoundSearch";
import PaymentManual from "../pages/client/PaymentManual";
import CategoryEditPage from "../pages/admin/categories/component/EditCategory";
import VoucherPage from "../pages/client/Voucher/VoucherPage";
import ProductEditPage from "../pages/admin/products/editProduct";
import ProductAddPage from "../pages/admin/products/addProduct";
import Dashboard from "../pages/admin/dashboard";
import { UserPage } from "../pages/admin/user/ListUser";
import { UserAddPage } from "../pages/admin/user/addUser";
import { CartPageAdmin } from "../pages/admin/carts/ListCart";
import { ListComment } from "../pages/admin/comments/ListComment";
import { ListVouchers } from "../pages/admin/vouchers/ListVouchers";
import Collection from "../pages/client/Collection/Collection";

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
          <Route path="collection/laptop" element = {< Collection />} />
        </Route>
        <Route path="voucher" element={<VoucherPage />}></Route>
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
