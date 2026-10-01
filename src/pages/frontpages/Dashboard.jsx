import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

// Halaman awal: hero + daftar produk (grid) + pencarian & filter kategori.
export default function Dashboard() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = ["Semua", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((product) => {
    const cocokNama = product.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const cocokKategori = category === "Semua" || product.category === category;
    return cocokNama && cocokKategori;
  });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid items-center gap-8 rounded-lg bg-sand-100 p-6 sm:p-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-ink-700 sm:text-4xl">
            Keripik talas &amp; rengginang, digoreng fresh tiap hari
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed text-ink-700">
            Cem&apos;ong mengolah talas dan ketan dari petani sekitar jadi camilan
            renyah tanpa pengawet. Pilih produknya, cek detail, lalu masukkan ke
            keranjang.
          </p>
          <Link to="/cart" className="btn btn-primary mt-6">
            Lihat Keranjang
          </Link>
        </div>
        <img
          src="/images/hero-camilan.svg"
          alt="Ilustrasi camilan Cem'ong"
          className="w-full rounded-lg"
        />
      </section>

      {/* Pencarian & filter */}
      <section className="flex flex-col gap-3 sm:flex-row">
        <div className="sm:w-1/2">
          <label htmlFor="cari" className="sr-only">
            Cari produk
          </label>
          <input
            id="cari"
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari produk..."
            className="input"
          />
        </div>

        <div>
          <label htmlFor="kategori" className="sr-only">
            Filter kategori
          </label>
          <select
            id="kategori"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="input sm:w-48"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Grid produk */}
      <section>
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold text-ink-700">Produk Cem&apos;ong</h2>
          <p className="text-sm text-ink-500">{filtered.length} produk</p>
        </div>

        {filtered.length === 0 ? (
          <p className="card border-dashed p-8 text-center text-ink-500">
            Produk tidak ditemukan. Coba kata kunci lain.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
