# Cem'ong — Tugas Praktikum React

Landing page / e-commerce sederhana untuk brand **Cem'ong** (UMKM camilan
keripik talas & rengginang). Project ini dibuat untuk **tugas praktikum mata
kuliah Web Programming**, mengikuti konsep Praktikum 2.4 pada modul
"BAB II Frontend Programming": Fundamental React JS, Persiapan Vite, React
Router, User Flow, Main Layout, Admin Layout, Components, Dashboard, Product
Detail, Cart, Checkout, dan TailwindCSS.

Ini bukan project production Cem'ong. Data produk disimpan di localStorage
(tanpa database, tanpa API, tanpa backend, tanpa autentikasi).

## Teknologi

- React 19 (JavaScript + JSX, functional components)
- Vite (build tool + dev server)
- react-router-dom v7 (routing SPA)
- TailwindCSS v4 (via `@tailwindcss/vite`)
- Hooks: `useState`, `useEffect`, `useContext`, `useParams`, `useNavigate`
- State global: React Context API (`ProductContext`, `CartContext`) — tanpa Redux/Zustand
- Penyimpanan: `localStorage` (key `cemong-products`)

Tidak memakai TypeScript, Next.js, Supabase, maupun Cloudflare/OpenNext.

## Struktur Project

```
.
├─ index.html
├─ vite.config.js
├─ package.json
├─ public/
│  └─ images/            # ilustrasi hero + gambar produk (SVG)
└─ src/
   ├─ main.jsx           # entry point: BrowserRouter + ProductProvider + CartProvider
   ├─ App.jsx            # definisi route
   ├─ index.css          # import Tailwind, token warna brand, kelas bersama (.btn/.input/.card)
   ├─ data/
   │  └─ products.js     # initialProducts (data awal) + helper formatRupiah
   ├─ utils/
   │  └─ productStorage.js # helper load/save localStorage
   ├─ context/
   │  ├─ ProductContext.jsx # sumber data produk (CRUD + localStorage)
   │  └─ CartContext.jsx    # state keranjang (id + qty, harga dari ProductContext)
   ├─ layouts/
   │  ├─ MainLayout.jsx  # Navbar + <Outlet /> + Footer
   │  └─ AdminLayout.jsx # Header + Sidebar + <Outlet /> + footer admin
   ├─ components/
   │  ├─ Navbar.jsx
   │  ├─ Sidebar.jsx       # navigasi admin (props sidebarOpen/setSidebarOpen)
   │  ├─ StatCard.jsx      # kartu statistik reusable (props title/value/description)
   │  ├─ ProductTable.jsx  # tabel produk admin (props products/onToggle/onDelete)
   │  ├─ Footer.jsx
   │  ├─ ProductCard.jsx   # kartu produk reusable (props)
   │  └─ CartItem.jsx      # baris item keranjang reusable (props)
   └─ pages/
      ├─ frontpages/
      │  ├─ Dashboard.jsx     # /
      │  ├─ ProductDetail.jsx # /product/:id
      │  ├─ Cart.jsx          # /cart
      │  └─ Checkout.jsx      # /checkout
      └─ adminpages/
         ├─ AdminDashboard.jsx # /admin dan /admin/dashboard
         ├─ ProductList.jsx    # /admin/produk
         ├─ ProductForm.jsx    # /admin/produk/tambah dan /admin/produk/:id/edit
         └─ AboutPage.jsx      # /admin/about
```

## Routes

| Path                      | Halaman         | Layout      | Keterangan                                    |
| ------------------------- | --------------- | ----------- | --------------------------------------------- |
| `/`                       | Dashboard       | MainLayout  | Hero + grid produk + pencarian & filter        |
| `/product/:id`            | Product Detail  | MainLayout  | Detail produk, `id` diambil `useParams()`      |
| `/cart`                   | Cart            | MainLayout  | Daftar item, ubah jumlah, hapus, total         |
| `/checkout`               | Checkout        | MainLayout  | Form nama & alamat, ringkasan pesanan          |
| `/admin`                  | Admin Dashboard | AdminLayout | Statistik dari ProductContext                  |
| `/admin/dashboard`        | Admin Dashboard | AdminLayout | Sama dengan `/admin`                           |
| `/admin/produk`           | Kelola Produk   | AdminLayout | Tabel produk + edit/hapus/toggle status        |
| `/admin/produk/tambah`    | Tambah Produk   | AdminLayout | Form produk baru                               |
| `/admin/produk/:id/edit`  | Edit Produk     | AdminLayout | Form edit, `id` dari `useParams()`             |
| `/admin/about`            | About           | AdminLayout | Info project + teknologi                       |

Semua route berada di dalam layout masing-masing, sehingga Navbar/Sidebar dan
footer tetap sama dan konten halaman berganti lewat `<Outlet />` tanpa reload.

## Sumber Data Produk

Satu sumber data untuk seluruh aplikasi: **`ProductContext`**.

```
ProductContext (localStorage: cemong-products)
   ├─→ Public Dashboard  (grid produk)
   ├─→ Public Product Detail
   ├─→ Public Cart / Checkout (via CartContext)
   ├─→ Admin Product List
   ├─→ Admin Product Form
   └─→ Admin Dashboard (statistik)
```

- `src/data/products.js` hanya berisi `initialProducts` (data awal/seed).
- Saat pertama dibuka: localStorage kosong → diisi `initialProducts`.
  Sudah ada isi → pakai data localStorage.
- Setiap perubahan (tambah/edit/hapus/toggle) langsung disimpan ke localStorage.
- `CartContext` hanya menyimpan `id` + `qty`; nama, harga, gambar selalu diambil
  dari `ProductContext`, jadi harga/status di keranjang ikut berubah saat admin
  mengedit produk.

Fungsi `ProductContext`: `addProduct`, `updateProduct`, `deleteProduct`,
`toggleAvailability`, `findProduct`.

## User Flow

Dashboard (pilih produk) → Product Detail (tambah ke keranjang) → Cart
(cek jumlah & total) → Checkout (isi data penerima → konfirmasi pesanan).

Admin: Dashboard → Produk (tambah/edit/hapus/ubah status) → perubahan langsung
terlihat di halaman toko.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Lalu buka URL yang ditampilkan Vite (default `http://localhost:5173`).

Perintah lain:

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # preview hasil build
```

## Tampilan (TailwindCSS)

- Warna brand didefinisikan sebagai token di `src/index.css` (`@theme`):
  `brand-*` (ungu talas), `sand-*` (coklat rengginang), `ink-*` (teks),
  `line` (garis), `paper` (latar), plus `danger`/`success` untuk status.
- Kontrol yang dipakai berulang dibuat sebagai kelas bersama di `index.css`
  supaya konsisten: `.btn` + `.btn-primary` / `.btn-outline` / `.btn-ghost`,
  `.input`, `.card`, dan `.price` (angka tabular untuk harga).
- Halaman responsif: grid produk 1 → 2 → 3 kolom, navigasi toko memakai menu
  lipat di layar kecil, dan tabel produk admin berubah jadi daftar kartu.

## Catatan

- Harga ditampilkan dalam Rupiah memakai `Intl.NumberFormat("id-ID")`.
- Checkout hanya simulasi: tidak ada payment gateway, data tidak dikirim ke
  server mana pun.
- Produk dengan `available: false` ditandai "Habis" dan tombol tambah ke
  keranjang otomatis nonaktif.
- Ingin mengembalikan data ke kondisi awal? Buka DevTools lalu jalankan
  `localStorage.removeItem("cemong-products")` dan refresh halaman.
