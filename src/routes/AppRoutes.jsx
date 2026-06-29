import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import ProductDetails2 from "../pages/ProductDetails2";
import ServicePage from "../pages/ServicePage";
const AppRoutes = ({ searchTerm }) => {
  return (
    <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} />} />

      <Route path="/home" element={<Home searchTerm={searchTerm} />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/customer-service/:serviceId" element={<ServicePage />} />

      <Route path="/shop" element={<Shop searchTerm={searchTerm} />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/home-product/:id" element={<ProductDetails2 />} />
    </Routes>
  );
};

export default AppRoutes;
