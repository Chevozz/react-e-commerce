import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Layout bersama: Navbar (atas) - Outlet (konten halaman) - Footer (bawah).
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
