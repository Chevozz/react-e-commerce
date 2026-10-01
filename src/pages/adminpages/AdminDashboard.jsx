import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard";
import { formatRupiah } from "../../data/products";
import { useProducts } from "../../context/ProductContext";

// Halaman /admin dan /admin/dashboard.
// Statistik dihitung dari ProductContext, bukan angka hardcoded.
export default function AdminDashboard() {
  const { products } = useProducts();

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.available).length;
  const unavailableProducts = products.filter((p) => !p.available).length;

  // 3 produk terakhir sebagai "Produk Terbaru"
  const produkTerbaru = [...products].slice(-3).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-700">
          Dashboard Admin Cem&apos;ong
        </h1>
        <p className="mt-1 text-ink-500">Ringkasan katalog dan aktivitas toko.</p>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Produk"
          value={totalProducts}
          description="Produk dalam katalog"
        />
        <StatCard
          title="Produk Tersedia"
          value={availableProducts}
          description="Siap dikirim"
        />
        <StatCard
          title="Produk Habis"
          value={unavailableProducts}
          description="Perlu ditambah stok"
        />
      </div>

      {/* Produk terbaru */}
      <section className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
          <h2 className="font-bold text-ink-700">Produk Terbaru</h2>
          <Link
            to="/admin/produk"
            className="inline-block py-1 text-sm font-medium text-brand-600 hover:underline"
          >
            Kelola Produk
          </Link>
        </div>

        {/* Desktop: tabel */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-100 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Nama Produk</th>
                <th className="px-5 py-3 font-semibold">Kategori</th>
                <th className="px-5 py-3 font-semibold">Harga</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {produkTerbaru.map((item) => (
                <tr key={item.id} className="border-t border-line">
                  <td className="px-5 py-3 font-medium text-ink-700">
                    {item.name}
                  </td>
                  <td className="px-5 py-3 text-ink-500">{item.category}</td>
                  <td className="price whitespace-nowrap px-5 py-3 font-medium text-ink-700">
                    {formatRupiah(item.price)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge available={item.available} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: daftar ringkas (tabel 4 kolom tidak muat) */}
        <ul className="divide-y divide-line md:hidden">
          {produkTerbaru.map((item) => (
            <li key={item.id} className="flex items-start justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <p className="font-medium text-ink-700">{item.name}</p>
                <p className="text-sm text-ink-500">{item.category}</p>
                <p className="price mt-0.5 text-sm text-ink-700">
                  {formatRupiah(item.price)}
                </p>
              </div>
              <StatusBadge available={item.available} />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/produk/tambah" className="btn btn-primary">
          + Tambah Produk
        </Link>
        <Link to="/" className="btn btn-outline">
          Lihat Toko
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ available }) {
  return (
    <span
      className={`inline-block shrink-0 whitespace-nowrap rounded px-2 py-1 text-xs font-medium ${
        available ? "bg-success-50 text-success" : "bg-sand-200 text-ink-700"
      }`}
    >
      {available ? "Tersedia" : "Habis"}
    </span>
  );
}
