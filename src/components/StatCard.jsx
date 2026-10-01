// Kartu statistik reusable.
// props: title, value, description
export default function StatCard({ title, value, description }) {
  return (
    <div className="card p-4 sm:p-5">
      <p className="text-sm font-medium text-ink-500">{title}</p>
      <p className="price mt-2 text-3xl font-bold text-brand-700">{value}</p>
      {description && <p className="mt-1 text-xs text-ink-500">{description}</p>}
    </div>
  );
}
