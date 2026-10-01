import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products";

// Kartu produk reusable. Dipakai di Dashboard (grid).
// props: product, onAddToCart
export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card flex flex-col overflow-hidden transition-colors hover:border-sand-300">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full bg-sand-100 object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-ink-700">
          <Link to={`/product/${product.id}`} className="hover:text-brand-600">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">
          {product.description}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="price text-lg font-bold text-brand-700">
            {formatRupiah(product.price)}
          </span>
          <span className="text-xs text-ink-500">{product.pcs} pcs</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline flex-1 px-3"
          >
            Lihat Detail
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.available}
            className="btn btn-primary flex-1 px-3"
          >
            {product.available ? "+ Keranjang" : "Habis"}
          </button>
        </div>
      </div>
    </article>
  );
}
