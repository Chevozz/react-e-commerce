import { createContext, useContext, useEffect, useState } from "react";
import { initialProducts } from "../data/products";
import { loadProducts, saveProducts } from "../utils/productStorage";

// Satu sumber data produk untuk seluruh aplikasi (public + admin).
// useState + Context API, disimpan ke localStorage (key: cemong-products).
const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  // Saat pertama dibuka: pakai localStorage kalau ada, kalau kosong pakai data awal.
  const [products, setProducts] = useState(() =>
    loadProducts(initialProducts)
  );

  // Setiap daftar produk berubah, simpan ke localStorage.
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  function addProduct(product) {
    const baru = {
      ...product,
      id: product.id || String(Date.now()),
      price: Number(product.price) || 0,
      pcs: Number(product.pcs) || 0,
      available: Boolean(product.available),
    };
    setProducts((prev) => [...prev, baru]);
  }

  function updateProduct(id, updates) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates, id } : product
      )
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  function toggleAvailability(id) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, available: !product.available }
          : product
      )
    );
  }

  // Mencari produk berdasarkan id dari URL (/product/:id)
  function findProduct(id) {
    return products.find((product) => product.id === id);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        findProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleAvailability,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts harus dipakai di dalam <ProductProvider>");
  }
  return context;
}
