import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products";

// Satu baris item di halaman Cart.
// props: item, onIncrease, onDecrease, onRemove
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-md bg-sand-100 object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={`/product/${item.id}`}
          className="font-semibold text-ink-700 hover:text-brand-600"
        >
          {item.name}
        </Link>
        <p className="price mt-0.5 text-sm text-ink-500">
          {formatRupiah(item.price)} / bungkus
          {!item.available && (
            <span className="ml-2 rounded bg-danger-50 px-2 py-0.5 text-xs font-medium text-danger">
              Habis
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          className="h-10 w-10 rounded-md border border-line bg-white text-lg leading-none text-ink-700 hover:bg-sand-100"
          aria-label={`Kurangi jumlah ${item.name}`}
        >
          −
        </button>
        <span className="price w-8 text-center font-semibold text-ink-700">
          {item.qty}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          className="h-10 w-10 rounded-md border border-line bg-white text-lg leading-none text-ink-700 hover:bg-sand-100"
          aria-label={`Tambah jumlah ${item.name}`}
        >
          +
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-3 sm:w-44 sm:justify-end sm:border-t-0 sm:pt-0">
        <span className="price font-semibold text-brand-700">
          {formatRupiah(item.price * item.qty)}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex min-h-8 items-center text-sm font-medium text-danger hover:underline"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
