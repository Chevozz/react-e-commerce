// Helper kecil untuk menyimpan daftar produk ke localStorage.
const STORAGE_KEY = "cemong-products";

export function loadProducts(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback; // data rusak -> pakai data awal
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // localStorage penuh / tidak tersedia: abaikan, state React tetap jalan
  }
}
