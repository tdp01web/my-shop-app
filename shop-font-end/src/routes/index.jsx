import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loading";
import ListBrand from "../pages/admin/brand";
import AddBrand from "../pages/admin/brand/addBrand";
import EditBrand from "../pages/admin/brand/editBrand";
import ListCategory from "../pages/admin/categories";
import AddCategory from "../pages/admin/categories/addCategory";
import EditCategory from "../pages/admin/categories/editCategory";
import ListProduct from "../pages/admin/products";
import AddProduct from "../pages/admin/products/addProduct";
import EditProduct from "../pages/admin/products/editProduct";
import { ListUser } from "../pages/admin/user";
import { AddUser } from "../pages/admin/user/addUser";
import EditUser from "../pages/admin/user/editUser";
import ListCart from "../pages/admin/carts";
import Dashboard from "../pages/admin/dashboard";
import ListComment from "../pages/admin/comments";
import { ListVouchers } from "../pages/admin/vouchers";
import ListCPU from "../pages/admin/varriantsProduct/cpu";
import AddCPU from "../pages/admin/varriantsProduct/cpu/addCPU";
import EditCPU from "../pages/admin/varriantsProduct/cpu/editCPU";
import ListGPU from "../pages/admin/varriantsProduct/gpu";
import AddGPU from "../pages/admin/varriantsProduct/gpu/addGPU";
import EditGPU from "../pages/admin/varriantsProduct/gpu/editGPU";
import ListRAM from "../pages/admin/varriantsProduct/ram";
import AddRAM from "../pages/admin/varriantsProduct/ram/addRAM";
import EditRAM from "../pages/admin/varriantsProduct/ram/editRAM";
import ListSSD from "../pages/admin/varriantsProduct/ssd";
import AddSSD from "../pages/admin/varriantsProduct/ssd/addSSD";
import EditSSD from "../pages/admin/varriantsProduct/ssd/editSSD";

// Sử dụng React.lazy() để lazy load các trang
const LayoutAdmin = lazy(() => import("../layouts/admin"));
const LayoutClient = lazy(() => import("../layouts/client"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const SigninPage = lazy(() => import("../pages/SigninPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const Collection = lazy(() => import("../pages/client/Collection/Collection"));
const AboutsPage = lazy(() => import("../pages/client/AboutsPage"));
const BlogPage = lazy(() => import("../pages/client/PlogPage"));
const Installment = lazy(() => import("../pages/client/Installment"));
const ContactPage = lazy(() => import("../pages/client/ContactPage"));
const HomePage = lazy(() => import("../pages/client/HomePage"));
const OrdersPage = lazy(() => import("../pages/client/OrdersPage"));
const ProductDetailPage = lazy(() =>
  import("../pages/client/ProductsDetailPage/ProductDetailPage")
);
const ProductPage = lazy(() => import("../pages/client/ProductsPage"));
const CartPage = lazy(() => import("../pages/client/cart/CartPage"));
const Login = lazy(() => import("../pages/client/login/Login"));
const Register = lazy(() => import("../pages/client/register"));
const AccountLayout = lazy(() => import("../layouts/account"));
const AccountInformation = lazy(() =>
  import("../pages/client/Account/AccountInformation")
);
const AccountAddress = lazy(() =>
  import("../pages/client/Account/AccountAddress")
);
const OrdersHistory = lazy(() =>
  import("../pages/client/Account/OrdersHistory")
);
const OrderDetail = lazy(() => import("../pages/client/Account/OrderDetail"));
const NotFoundSearch = lazy(() => import("../pages/NotFoundSearch"));
const PaymentManual = lazy(() => import("../pages/client/PaymentManual"));
const VoucherPage = lazy(() => import("../pages/client/Voucher/VoucherPage"));
const ProductDetail = lazy(() => import("../pages/client/ProductDetail"));

const Router = () => {
  return (
    <BrowserRouter>
      {/* Sử dụng Suspense để hiển thị "Loading..." trong lúc chờ component tải */}
      <Suspense
      // fallback={
      //   <div>
      //     <Loader />
      //   </div>
      // }
      >
        <Routes>
          {/* Layout Client */}
          <Route path="" element={<LayoutClient />}>
            <Route index element={<HomePage />} />
            <Route path="account" element={<AccountLayout />}>
              <Route path="" element={<AccountInformation />} />
              <Route path="address" element={<AccountAddress />} />
              <Route path="orders-history" element={<OrdersHistory />} />
              <Route path="orders/:id" element={<OrderDetail />} />
            </Route>
            {/* <Route path="products">
              <Route index element={<ProductPage />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route> */}
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="abouts" element={<AboutsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders/bill" element={<OrdersPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="payment-manual" element={<PaymentManual />} />
            <Route path="installment" element={<Installment />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="collection" element={<Collection />} />
          </Route>
          {/* Voucher */}
          <Route path="voucher" element={<VoucherPage />} />
          // #region Router admin
          {/* Layout Admin */}
          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            {/* Brand */}
            <Route path="brand" element={<ListBrand />} />
            <Route path="brand/add" element={<AddBrand />} />
            <Route path="brand/:id/edit" element={<EditBrand />} />
            {/* Category */}
            <Route path="categories" element={<ListCategory />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/:id/edit" element={<EditCategory />} />
            {/* Varriants */}
            <Route path="cpu" element={<ListCPU />} />
            <Route path="cpu/add" element={<AddCPU />} />
            <Route path="cpu/:id/edit" element={<EditCPU />} />
            <Route path="gpu" element={<ListGPU />} />
            <Route path="gpu/add" element={<AddGPU />} />
            <Route path="gpu/:id/edit" element={<EditGPU />} />
            <Route path="ram" element={<ListRAM />} />
            <Route path="ram/add" element={<AddRAM />} />
            <Route path="ram/:id/edit" element={<EditRAM />} />
            <Route path="ssd" element={<ListSSD />} />
            <Route path="ssd/add" element={<AddSSD />} />
            <Route path="ssd/:id/edit" element={<EditSSD />} />
            {/* Products */}
            <Route path="products" element={<ListProduct />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            {/* Users */}
            <Route path="users" element={<ListUser />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/:id/edit" element={<EditUser />} />
            {/* Cart */}
            <Route path="carts" element={<ListCart />} />
            {/* Comments */}
            <Route path="comments" element={<ListComment />} />
            {/* Vouchers */}
            <Route path="vouchers" element={<ListVouchers />} />
          </Route>
          {/* Authentication */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Not Found */}
          <Route path="not-found-search" element={<NotFoundSearch />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
