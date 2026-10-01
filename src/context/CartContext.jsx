import { createContext, useContext, useState } from "react";
import { useProducts } from "./ProductContext";

// State cart sederhana: hanya menyimpan id + qty.
// Data produk (nama, harga, gambar) selalu diambil dari ProductContext,
// jadi kalau admin mengubah harga / status, isi keranjang ikut berubah.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { products } = useProducts();
  const [cart, setCart] = useState([]); // [{ id, qty }]

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id: product.id, qty }];
    });
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0) // qty 0 = item otomatis terhapus
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // Gabungkan cart dengan data produk terbaru (produk yang sudah dihapus dibuang).
  const items = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter(Boolean);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam <CartProvider>");
  }
  return context;
}
