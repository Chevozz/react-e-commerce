import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductList from "./pages/adminpages/ProductList";
import ProductForm from "./pages/adminpages/ProductForm";

// Public (MainLayout): Navbar + Outlet + Footer.
// Admin (AdminLayout): Sidebar + Outlet + footer.
export default function App() {
  return (
    <Routes>
      {/* User flow: Dashboard -> Product Detail -> Cart -> Checkout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Area admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="produk" element={<ProductList />} />
        <Route path="produk/tambah" element={<ProductForm />} />
        <Route path="produk/:id/edit" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}
