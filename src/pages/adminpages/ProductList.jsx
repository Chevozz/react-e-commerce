import { Link } from "react-router-dom";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../context/ProductContext";

// Halaman /admin/produk: daftar semua produk + aksi edit/hapus/toggle status.
export default function ProductList() {
  const { products, deleteProduct, toggleAvailability } = useProducts();

  function handleDelete(product) {
    const yakin = window.confirm("Yakin ingin menghapus produk ini?");
    if (yakin) deleteProduct(product.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-700">Kelola Produk</h1>
          <p className="mt-1 text-ink-500">
            {products.length} produk · perubahan langsung terlihat di halaman
            toko.
          </p>
        </div>

        <Link to="/admin/produk/tambah" className="btn btn-primary">
          + Tambah Produk
        </Link>
      </div>

      <ProductTable
        products={products}
        onToggle={toggleAvailability}
        onDelete={handleDelete}
      />
    </div>
  );
}
