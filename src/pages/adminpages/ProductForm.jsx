import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

// Form tambah & edit produk.
// /admin/produk/tambah        -> mode tambah
// /admin/produk/:id/edit      -> mode edit (id dari useParams)
const KOSONG = {
  name: "",
  category: "Keripik Talas",
  price: "",
  pcs: "",
  description: "",
  image: "",
  available: true,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();

  const produkDiedit = id ? products.find((p) => p.id === id) : null;
  const modeEdit = Boolean(id);

  const [form, setForm] = useState(() =>
    produkDiedit
      ? {
          name: produkDiedit.name,
          category: produkDiedit.category,
          price: String(produkDiedit.price),
          pcs: String(produkDiedit.pcs),
          description: produkDiedit.description,
          image: produkDiedit.image,
          available: produkDiedit.available,
        }
      : KOSONG
  );
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Nama produk wajib diisi.";
    if (!form.category.trim()) nextErrors.category = "Kategori wajib diisi.";
    if (!form.price || Number(form.price) <= 0)
      nextErrors.price = "Harga harus lebih dari 0.";
    if (!form.pcs || Number(form.pcs) <= 0)
      nextErrors.pcs = "Isi (pcs) harus lebih dari 0.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const data = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      pcs: Number(form.pcs),
      description: form.description.trim(),
      image: form.image.trim() || "/images/products/keripik-talas-gurih.svg",
      available: form.available,
    };

    if (modeEdit) {
      updateProduct(id, data);
    } else {
      addProduct(data);
    }

    navigate("/admin/produk");
  }

  // Produk yang mau diedit tidak ada (misal id salah)
  if (modeEdit && !produkDiedit) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <h1 className="text-xl font-bold text-ink-700">Produk tidak ditemukan</h1>
        <p className="mt-2 text-ink-500">
          Produk dengan ID <span className="font-mono">{id}</span> tidak ada.
        </p>
        <Link to="/admin/produk" className="btn btn-primary mt-6">
          Kembali ke Kelola Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          to="/admin/produk"
          className="inline-block py-1 text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
        >
          ← Kembali ke Kelola Produk
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-ink-700">
          {modeEdit ? "Edit Produk" : "Tambah Produk"}
        </h1>
        <p className="mt-1 text-ink-500">
          {modeEdit
            ? `Mengubah produk: ${produkDiedit.name}`
            : "Lengkapi data produk baru."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-5 sm:p-6">
        <Field label="Nama Produk" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Contoh: Keripik Talas Balado"
            className="input mt-1.5"
          />
        </Field>

        <Field label="Kategori" htmlFor="category" error={errors.category}>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input mt-1.5"
          >
            <option>Keripik Talas</option>
            <option>Rengginang</option>
          </select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Harga (Rp)" htmlFor="price" error={errors.price}>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="25000"
              className="input mt-1.5"
            />
          </Field>

          <Field label="Isi (pcs)" htmlFor="pcs" error={errors.pcs}>
            <input
              id="pcs"
              name="pcs"
              type="number"
              min="0"
              value={form.pcs}
              onChange={handleChange}
              placeholder="10"
              className="input mt-1.5"
            />
          </Field>
        </div>

        <Field label="Deskripsi" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi singkat produk"
            className="input mt-1.5"
          />
        </Field>

        <Field label="Gambar (URL)" htmlFor="image">
          <input
            id="image"
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/products/keripik-talas-gurih.svg"
            className="input mt-1.5"
          />
        </Field>

        {form.image && (
          <img
            src={form.image}
            alt="Pratinjau produk"
            className="h-24 w-24 rounded-md border border-line bg-sand-100 object-cover"
          />
        )}

        <label
          htmlFor="available"
          className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink-700"
        >
          <input
            id="available"
            name="available"
            type="checkbox"
            checked={form.available}
            onChange={handleChange}
            className="h-4 w-4 accent-brand-500"
          />
          Status tersedia
        </label>

        <div className="flex flex-wrap gap-3 border-t border-line pt-5">
          <button type="submit" className="btn btn-primary">
            {modeEdit ? "Simpan Perubahan" : "Simpan Produk"}
          </button>
          <Link to="/admin/produk" className="btn btn-outline">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-danger">{error}</p>}
    </div>
  );
}
