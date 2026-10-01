import { NavLink, Link } from "react-router-dom";

// Sidebar admin: navigasi Dashboard, Produk, About.
// props: sidebarOpen, setSidebarOpen (state dikirim dari AdminLayout).
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    { to: "/admin/dashboard", label: "Dashboard", end: true },
    { to: "/admin/produk", label: "Produk" },
    { to: "/admin/about", label: "About" },
  ];

  function closeOnMobile() {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }

  return (
    <aside
      className={`${
        sidebarOpen ? "block" : "hidden"
      } w-full shrink-0 border-b border-line bg-white md:block md:w-56 md:border-b-0 md:border-r`}
    >
      <nav className="flex flex-col gap-1 p-3">
        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-ink-500">
          Menu Admin
        </p>

        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={closeOnMobile}
            className={({ isActive }) =>
              `flex min-h-10 items-center rounded-md px-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-sand-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="mt-2 border-t border-line pt-2">
          <Link
            to="/"
            className="flex min-h-10 items-center rounded-md px-3 text-sm font-medium text-ink-500 hover:bg-sand-100"
          >
            Kembali ke Toko
          </Link>
        </div>
      </nav>
    </aside>
  );
}
