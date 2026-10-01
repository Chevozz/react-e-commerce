import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Layout area admin: header + sidebar + Outlet + footer.
// Terpisah dari MainLayout (public) supaya navigasi customer tidak terganggu.
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Header */}
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}/images/accents/taro-chip-flake.svg`}
              alt=""
              className="h-8 w-8 rounded-full bg-brand-50 p-1"
            />
            <span className="leading-tight">
              <span className="block font-bold text-brand-700">Cem&apos;ong</span>
              <span className="block text-xs text-ink-500">Admin</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-outline btn-sm hidden sm:inline-flex">
              Lihat Toko
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-outline btn-sm md:hidden"
              aria-expanded={sidebarOpen}
              aria-label="Buka menu admin"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-line bg-white px-4 py-4 text-center text-sm text-ink-500">
        Cem&apos;ong Admin
      </footer>
    </div>
  );
}
