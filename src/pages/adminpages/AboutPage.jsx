import { Link } from "react-router-dom";

// Halaman /admin/about.
export default function AboutPage() {
  const teknologi = ["React", "React Router", "Tailwind CSS", "Vite"];

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
        <p className="mt-4 leading-relaxed text-ink-500">
          Project ini merupakan latihan frontend programming dengan React.
          Datanya masih statis — tanpa backend, tanpa database, dan tanpa
          autentikasi.
        </p>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="font-bold text-ink-700">Teknologi</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {teknologi.map((item) => (
            <li
              key={item}
              className="rounded-md bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Link to="/admin/dashboard" className="btn btn-outline">
        Ke Dashboard
      </Link>
    </div>
  );
}
