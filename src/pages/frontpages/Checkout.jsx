import { useState } from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "../../data/products";
import { useCart } from "../../context/CartContext";

// Halaman checkout: form penerima + ringkasan pesanan.
// Tidak ada payment gateway / backend, hanya simulasi konfirmasi.
export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ nama: "", alamat: "", catatan: "" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null); // snapshot pesanan setelah checkout

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!form.nama.trim()) nextErrors.nama = "Nama penerima wajib diisi.";
    if (form.alamat.trim().length < 10)
      nextErrors.alamat = "Alamat minimal 10 karakter agar pengiriman jelas.";
    if (items.some((item) => !item.available))
      nextErrors.alamat = "Ada produk yang habis. Hapus dulu di keranjang.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Simpan snapshot dulu, baru kosongkan keranjang.
    setOrder({
      kode: `CM-${Date.now().toString().slice(-6)}`,
      nama: form.nama,
      alamat: form.alamat,
      items: items,
      total: totalPrice,
    });
    clearCart();
    setForm({ nama: "", alamat: "", catatan: "" });
  }

  // Halaman konfirmasi (8 golden rules: design dialogs to yield closure)
  if (order) {
    return (
      <div className="card mx-auto max-w-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink-700">Pesanan Diterima</h1>
        <p className="mt-2 leading-relaxed text-ink-500">
          Terima kasih,{" "}
          <span className="font-semibold text-ink-700">{order.nama}</span>!
          Pesanan simulasi{" "}
          <span className="font-semibold text-ink-700">{order.kode}</span> sudah
          dicatat. Admin Cem&apos;ong akan menghubungi via WhatsApp untuk
          konfirmasi ongkir.
        </p>

        <div className="mt-5 rounded-md bg-sand-100 p-4 sm:p-5">
          <h2 className="font-semibold text-ink-700">Ringkasan Pesanan</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ink-500">
                  {item.name} × {item.qty}
                </span>
                <span className="price whitespace-nowrap text-ink-700">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-sand-200 pt-4">
            <span className="font-semibold text-ink-700">Total</span>
            <span className="price text-lg font-bold text-brand-700">
              {formatRupiah(order.total)}
            </span>
          </div>
          <p className="mt-4 text-sm text-ink-500">Kirim ke: {order.alamat}</p>
        </div>

        <Link to="/" className="btn btn-primary mt-6">
          Belanja Lagi
        </Link>
      </div>
    );
  }

  // Keranjang kosong tidak perlu checkout
  if (items.length === 0) {
    return (
      <div className="card mx-auto max-w-xl border-dashed p-10 text-center">
        <h1 className="text-xl font-bold text-ink-700">
          Belum ada yang bisa di-checkout
        </h1>
        <p className="mt-2 text-ink-500">
          Keranjang kosong. Pilih produk dulu di Dashboard.
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink-700">Checkout</h1>
        <p className="mt-1 text-ink-500">
          Isi data penerima, lalu periksa ringkasan pesanan di samping.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form penerima */}
        <form
          onSubmit={handleSubmit}
          className="card space-y-5 p-5 sm:p-6 lg:col-span-2"
          noValidate
        >
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-ink-700">
              Nama Penerima
            </label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Ni Made Ayu"
              aria-invalid={Boolean(errors.nama)}
              className="input mt-1.5"
            />
            {errors.nama && (
              <p className="mt-1.5 text-sm font-medium text-danger">
                {errors.nama}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-ink-700"
            >
              Alamat Pengiriman
            </label>
            <textarea
              id="alamat"
              name="alamat"
              rows="3"
              value={form.alamat}
              onChange={handleChange}
              placeholder="Jalan, nomor rumah, kelurahan, kecamatan, kota"
              aria-invalid={Boolean(errors.alamat)}
              className="input mt-1.5"
            />
            {errors.alamat && (
              <p className="mt-1.5 text-sm font-medium text-danger">
                {errors.alamat}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="catatan"
              className="block text-sm font-medium text-ink-700"
            >
              Catatan <span className="font-normal text-ink-500">(opsional)</span>
            </label>
            <input
              id="catatan"
              name="catatan"
              type="text"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Contoh: minta dibungkus bubble wrap"
              className="input mt-1.5"
            />
          </div>

          <div className="border-t border-line pt-5">
            <button type="submit" className="btn btn-primary">
              Buat Pesanan
            </button>
          </div>
        </form>

        {/* Ringkasan pesanan */}
        <aside className="card h-fit p-5">
          <h2 className="font-bold text-ink-700">Ringkasan Pesanan</h2>

          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-ink-500">
                  {item.name} × {item.qty}
                </span>
                <span className="price whitespace-nowrap text-ink-700">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm text-ink-500">
            <span>Jumlah item</span>
            <span className="price">{totalItems} pcs</span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-semibold text-ink-700">Total</span>
            <span className="price text-xl font-bold text-brand-700">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          <Link
            to="/cart"
            className="mt-4 block text-center text-sm font-medium text-brand-600 hover:underline"
          >
            Ubah keranjang
          </Link>
        </aside>
      </div>
    </div>
  );
}
