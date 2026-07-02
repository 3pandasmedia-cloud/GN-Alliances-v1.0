const transactions = [
  {
    id: "TXN-1001",
    partner: "HDFC Bank",
    amount: "₹12,450",
    status: "Matched",
    date: "08 Jun 2026",
  },
  {
    id: "TXN-1002",
    partner: "Indian Oil",
    amount: "₹8,200",
    status: "Pending",
    date: "07 Jun 2026",
  },
  {
    id: "TXN-1003",
    partner: "PVR",
    amount: "₹4,600",
    status: "Failed",
    date: "06 Jun 2026",
  },
  {
    id: "TXN-1004",
    partner: "MakeMyTrip",
    amount: "₹15,800",
    status: "Matched",
    date: "05 Jun 2026",
  },
];

export default function ReconciliationTable() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">Transaction ID</th>
              <th className="text-left p-4">Partner</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Settlement Date</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b"
              >
                <td className="p-4">{txn.id}</td>
                <td className="p-4">{txn.partner}</td>
                <td className="p-4">{txn.amount}</td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        txn.status === "Matched"
                          ? "bg-green-100 text-green-700"
                          : txn.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {txn.status}
                  </span>

                </td>

                <td className="p-4">{txn.date}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="border rounded-2xl p-4"
          >
            <h3 className="font-bold">
              {txn.id}
            </h3>

            <p className="text-gray-500 text-sm">
              {txn.partner}
            </p>

            <p className="font-semibold mt-2">
              {txn.amount}
            </p>

            <div className="mt-2">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                {txn.status}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              {txn.date}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}