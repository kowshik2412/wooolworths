import "./App.scss";
import ProductDetails from "./pages/ProductDetails/ProductDetailsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home_page/HomePage";
import LoginPage from "./pages/auth_pages/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RegistrationPage from "./pages/auth_pages/RegistrationPage";
import CartPage from "./pages/cart_page/CartPage";
import ContactPage from "./pages/contact_page/ContactPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
