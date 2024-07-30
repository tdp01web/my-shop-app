import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductPage from "../pages/client/ProductPage"
import LayoutClient from "../layouts/client"
import HomePage from "../pages/client/HomePage"
import ProductDetailPage from "../pages/client/ProductDetailPage"
import LayoutAdmin from "../layouts/admin"
import NotFoundPage from "../pages/NotFoundPage"
import ListProductAdmin from "../pages/admin/products/ListProductAdmin"
import ListCategoriesAdmin from "../pages/admin/categories/ListCategoriesAdmin"
import SigninPage from "../pages/SigninPage"
import SignupPage from "../pages/SignupPage"
import ContactPage from "../pages/client/ContactPage"
import AboutsPage from "../pages/client/AboutsPage"
import CartPage from "../pages/client/CartPage"
import ProductsSalePage from "../pages/client/ProductsSalePage"
import OrdersPage from "../pages/client/OrdersPage"
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<LayoutClient />}>
                    <Route index element={<HomePage />} />
                    <Route path='products'>
                        <Route index element={<ProductPage />} />
                        <Route path=':id' element={<ProductDetailPage />} />
                        <Route path='sales' element={<ProductsSalePage />} />
                    </Route>
                    <Route path='contacts' element={<ContactPage />}></Route>
                    <Route path='abouts' element={<AboutsPage />}></Route>
                    <Route path='cart' element={<CartPage />}></Route>
                    <Route path='bills' element={<OrdersPage />}></Route>
                    <Route path='*' element={<NotFoundPage />}></Route>
                </Route>
                <Route path='admin' element={<LayoutAdmin />}>
                    <Route index element={<ListProductAdmin />} />
                    <Route path='categories'>
                        <Route index element={<ListCategoriesAdmin />} />
                    </Route>
                </Route>
                <Route path='signin' element={<SigninPage />}></Route>
                <Route path='signup' element={<SignupPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router