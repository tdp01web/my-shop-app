import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loading";

// Sử dụng React.lazy() để lazy load các trang
const LayoutAdmin = lazy(() => import("../layouts/admin"));
const LayoutClient = lazy(() => import("../layouts/client"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const SigninPage = lazy(() => import("../pages/SigninPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const ListCategoriesAdmin = lazy(() =>
  import("../pages/admin/categories/ListCategoriesAdmin")
);
const AddEditCategory = lazy(() =>
  import("../pages/admin/categories/component/AddCategory")
);
const ListProductAdmin = lazy(() =>
  import("../pages/admin/products/ListProductAdmin")
);
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
const CategoryEditPage = lazy(() =>
  import("../pages/admin/categories/component/EditCategory")
);
const VoucherPage = lazy(() => import("../pages/client/Voucher/VoucherPage"));
const ProductEditPage = lazy(() =>
  import("../pages/admin/products/editProduct")
);
const ProductAddPage = lazy(() => import("../pages/admin/products/addProduct"));
const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const UserPage = lazy(() => import("../pages/admin/user/ListUser"));
const UserAddPage = lazy(() => import("../pages/admin/user/addUser"));
const CartPageAdmin = lazy(() => import("../pages/admin/carts/ListCart"));
const ListComment = lazy(() => import("../pages/admin/comments/ListComment"));
const ListVouchers = lazy(() => import("../pages/admin/vouchers/ListVouchers"));

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
            <Route path="products">
              <Route index element={<ProductPage />} />
              <Route path=":id" element={<ProductDetailPage />} />
            </Route>
            <Route path="contacts" element={<ContactPage />} />
            <Route path="abouts" element={<AboutsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders/bill" element={<OrdersPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="payment-manual" element={<PaymentManual />} />
            <Route path="installment" element={<Installment />} />
            <Route path="blog" element={<BlogPage />} />
          </Route>

          {/* Voucher */}
          <Route path="voucher" element={<VoucherPage />} />

          {/* Layout Admin */}
          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            {/* Products */}
            <Route path="products" element={<ListProductAdmin />} />
            <Route path="products/add" element={<ProductAddPage />} />
            <Route path="products/:id/edit" element={<ProductEditPage />} />
            {/* Users */}
            <Route path="users" element={<UserPage />} />
            <Route path="users/add" element={<UserAddPage />} />
            <Route path="users/:id/edit" element={<ProductEditPage />} />
            {/* Cart */}
            <Route path="carts" element={<CartPageAdmin />} />
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
