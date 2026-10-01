// Data produk AWAL (seed). Setelah aplikasi jalan, sumber data sebenarnya
// adalah ProductContext (yang disimpan di localStorage "cemong-products").

export const initialProducts = [
  {
    id: "1",
    name: "Keripik Talas Gurih",
    category: "Keripik Talas",
    price: 25000,
    pcs: 10,
    image: "/images/products/keripik-talas-gurih.svg",
    description:
      "Talas pilihan diiris tipis, digoreng renyah, lalu dibumbui gurih. Teman ngemil paling pas untuk sore hari.",
    available: true,
  },
  {
    id: "2",
    name: "Keripik Talas Pedas",
    category: "Keripik Talas",
    price: 27000,
    pcs: 10,
    image: "/images/products/keripik-talas-pedas.svg",
    description:
      "Keripik talas dengan bumbu cabai khas Cem'ong. Pedasnya nendang tapi tetap bikin nagih.",
    available: true,
  },
  {
    id: "3",
    name: "Keripik Talas Original",
    category: "Keripik Talas",
    price: 23000,
    pcs: 10,
    image: "/images/products/keripik-talas-gurih.svg",
    description:
      "Rasa asli talas tanpa bumbu tambahan. Cocok untuk yang suka camilan bersih dan tidak berminyak.",
    available: true,
  },
  {
    id: "4",
    name: "Rengginang Original",
    category: "Rengginang",
    price: 22000,
    pcs: 10,
    image: "/images/products/rengginang-original.svg",
    description:
      "Rengginang ketan yang dijemur dulu sebelum digoreng, jadi teksturnya tebal dan renyah alami.",
    available: true,
  },
  {
    id: "5",
    name: "Rengginang Pedas Manis",
    category: "Rengginang",
    price: 24000,
    pcs: 10,
    image: "/images/products/rengginang-original.svg",
    description:
      "Rengginang dengan lapisan bumbu pedas manis. Perpaduan rasa yang cocok untuk oleh-oleh.",
    available: true,
  },
  {
    id: "6",
    name: "Rengginang Bawang",
    category: "Rengginang",
    price: 23000,
    pcs: 10,
    image: "/images/products/rengginang-original.svg",
    description:
      "Rengginang ketan dengan aroma bawang goreng. Gurih, wangi, dan pas untuk pendamping makan.",
    available: false,
  },
];

// Format harga ke Rupiah, contoh: 25000 -> "Rp 25.000"
export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
