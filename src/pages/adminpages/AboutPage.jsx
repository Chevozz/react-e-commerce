import { Link } from "react-router-dom";

// Halaman /admin/about.
export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-700">Tentang Project</h1>
        <p className="mt-1 text-ink-500">
          Informasi singkat tentang project Cem&apos;ong.
        </p>
      </div>

      <section className="card p-5 sm:p-6">
        <p className="leading-relaxed text-ink-700">
          Cem&apos;ong adalah UMKM camilan ringan yang menjual keripik talas dan
          rengginang. Halaman ini adalah versi tugas kuliah: katalog, keranjang,
          checkout, dan panel admin sederhana.
        </p>
      </section>

      <Link to="/admin/dashboard" className="btn btn-outline">
        Ke Dashboard
      </Link>
    </div>
  );
}
