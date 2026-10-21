export default function ReconciliationPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">Reconciliation</h1>
        <p className="mt-2 text-gray-500">Monitor settlements and payouts</p>
      </div>
      <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Reconciliation unavailable</h2>
        <p className="mt-2 text-sm text-gray-500">Settlement and payout records are not connected yet.</p>
      </div>
    </div>
  );
}
