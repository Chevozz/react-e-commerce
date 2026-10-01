import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menu = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/cart", label: "Keranjang" },
  { to: "/checkout", label: "Checkout" },
  { to: "/admin", label: "Admin", end: true },
];

// Navbar: logo + menu navigasi (SPA, tanpa reload).
// Desktop: satu baris. Mobile: tombol Menu membuka daftar navigasi
// (useState), jadi bilah atas tetap tipis dan tautan tetap mudah disentuh.
export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex min-h-10 items-center gap-1.5 rounded-md px-3 text-[15px] font-medium transition-colors ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-20 bg-brand-600 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <img
            src={`${import.meta.env.BASE_URL}/images/accents/taro-chip-flake.svg`}
            alt=""
            className="h-8 w-8 rounded-full bg-white/10 p-1"
          />
          <span className="text-lg font-bold">Cem&apos;ong</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="menu-utama"
          className="btn btn-outline btn-sm sm:hidden"
        >
          Menu
        </button>

        <ul
          id="menu-utama"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-full flex-col gap-1 border-t border-white/15 bg-brand-600 px-4 pb-3 pt-2 sm:static sm:flex sm:flex-row sm:items-center sm:gap-1.5 sm:border-0 sm:bg-transparent sm:p-0`}
        >
          {menu.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.label}
                {item.to === "/cart" && totalItems > 0 && (
                  <span className="rounded-full bg-sand-300 px-1.5 text-xs font-bold text-brand-700">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
