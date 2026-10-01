import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatRupiah } from "../../data/products";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

// Halaman detail produk. id diambil dari URL: /product/:id
export default function ProductDetail() {
  const { id } = useParams();
  const { findProduct } = useProducts();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = findProduct(id);

  if (!product) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <h1 className="text-xl font-bold text-ink-700">Produk tidak ditemukan</h1>
        <p className="mt-2 text-ink-500">
          Produk dengan ID <span className="font-mono">{id}</span> tidak ada.
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
  }

  return (
    <div className="space-y-6">
      {/* Navigasi kembali */}
      <Link
        to="/"
        className="inline-block py-1 text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
      >
        ← Kembali ke Dashboard
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg border border-line bg-sand-100 object-cover"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink-700">
            {product.name}
          </h1>

          <p className="price mt-4 text-3xl font-bold text-brand-700">
            {formatRupiah(product.price)}
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Isi {product.pcs} pcs per bungkus ·{" "}
            {product.available ? (
              <span className="font-medium text-success">Stok tersedia</span>
            ) : (
              <span className="font-medium text-danger">Stok habis</span>
            )}
          </p>

          <p className="mt-6 max-w-prose leading-relaxed text-ink-500">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="h-11 w-11 rounded-md border border-line bg-white text-lg text-ink-700 hover:bg-sand-100"
                aria-label="Kurangi jumlah"
              >
                −
              </button>
              <span className="w-10 text-center text-lg font-semibold text-ink-700">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="h-11 w-11 rounded-md border border-line bg-white text-lg text-ink-700 hover:bg-sand-100"
                aria-label="Tambah jumlah"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.available}
              className="btn btn-primary"
            >
              Tambah ke Keranjang
            </button>

            <Link to="/cart" className="btn btn-outline">
              Lihat Keranjang
            </Link>
          </div>

          {/* Feedback setelah aksi (8 golden rules: informative feedback) */}
          {added && (
            <p
              role="status"
              className="mt-5 rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-700"
            >
              {qty} × {product.name} masuk keranjang.{" "}
              <Link to="/cart" className="font-semibold underline">
                Lanjut ke keranjang
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
