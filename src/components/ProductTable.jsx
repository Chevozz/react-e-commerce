import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products";

// Tabel daftar produk admin (reusable).
// props: products, onToggle, onDelete
export default function ProductTable({ products, onToggle, onDelete }) {
  if (products.length === 0) {
    return (
      <p className="card border-dashed p-8 text-center text-ink-500">
        Belum ada produk. Tambahkan produk baru lewat tombol di atas.
      </p>
    );
  }

  return (
    <>
      {/* Desktop: tabel */}
      <div className="card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sand-100 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Produk</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Isi</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-line hover:bg-sand-100/60"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${import.meta.env.BASE_URL}${product.image.replace(/^\/+/, "")}`}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-md bg-sand-100 object-cover"
                      />
                      <span className="font-medium text-ink-700">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{product.category}</td>
                  <td className="price whitespace-nowrap px-4 py-3 font-medium text-ink-700">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-4 py-3 text-ink-500">{product.pcs} pcs</td>
                  <td className="px-4 py-3">
                    <StatusBadge available={product.available} />
                  </td>
                  <td className="px-4 py-3">
                    <Actions
                      product={product}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: card list (tabel terlalu lebar untuk layar kecil) */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="card p-4">
            <div className="flex items-start gap-3">
              <img
                src={`${import.meta.env.BASE_URL}${product.image.replace(/^\/+/, "")}`}
                alt=""
                className="h-12 w-12 shrink-0 rounded-md bg-sand-100 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink-700">{product.name}</p>
                <p className="text-sm text-ink-500">{product.category}</p>
                <p className="price mt-1 text-sm text-ink-700">
                  {formatRupiah(product.price)} · {product.pcs} pcs
                </p>
              </div>
              <StatusBadge available={product.available} />
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <Actions
                product={product}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StatusBadge({ available }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded px-2 py-1 text-xs font-medium ${
        available ? "bg-success-50 text-success" : "bg-sand-200 text-ink-700"
      }`}
    >
      {available ? "Tersedia" : "Habis"}
    </span>
  );
}

function Actions({ product, onToggle, onDelete }) {
  return (
    <div className="flex flex-wrap items-center gap-0.3">
      <Link
        to={`/admin/produk/${product.id}/edit`}
        className="btn btn-ghost btn-sm"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={() => onToggle(product.id)}
        className="btn btn-ghost btn-sm text-ink-700 hover:bg-sand-100"
      >
        {product.available ? "Set Habis" : "Set Tersedia"}
      </button>
      <button
        type="button"
        onClick={() => onDelete(product)}
        className="btn btn-ghost btn-sm text-danger hover:bg-danger-50"
      >
        Hapus
      </button>
    </div>
  );
}
