import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { formatRupiah } from "../../data/products";
import { useCart } from "../../context/CartContext";

// Halaman keranjang: daftar item, ubah jumlah, hapus, dan total.
export default function Cart() {
  const { items, updateQty, removeFromCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="card mx-auto max-w-xl border-dashed p-10 text-center">
        <h1 className="text-xl font-bold text-ink-700">Keranjang masih kosong</h1>
        <p className="mt-2 text-ink-500">
          Belum ada camilan yang dipilih. Yuk lihat produk Cem&apos;ong dulu.
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink-700">Keranjang Belanja</h1>

      {items.some((item) => !item.available) && (
        <p
          role="alert"
          className="rounded-md bg-danger-50 px-4 py-3 text-sm font-medium text-danger"
        >
          Ada produk yang sedang habis. Hapus dulu sebelum lanjut checkout.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Daftar item */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => updateQty(item.id, 1)}
              onDecrease={() => updateQty(item.id, -1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>

        {/* Ringkasan total */}
        <aside className="card h-fit p-5">
          <h2 className="font-bold text-ink-700">Ringkasan</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-500">
              <span>Jumlah item</span>
              <span className="price">{totalItems} pcs</span>
            </div>
            <div className="flex justify-between gap-3 text-ink-500">
              <span>Ongkos kirim</span>
              <span className="text-right">Dihitung saat konfirmasi</span>
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-semibold text-ink-700">Total</span>
            <span className="price text-xl font-bold text-brand-700">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-block mt-5">
            Lanjut ke Checkout
          </Link>
          <Link
            to="/"
            className="mt-3 block text-center text-sm font-medium text-brand-600 hover:underline"
          >
            Tambah produk lain
          </Link>
        </aside>
      </div>
    </div>
  );
}
