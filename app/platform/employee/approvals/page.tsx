export default function EmployeeApprovalsPage() {
  const approvals = [
    {
      merchant: "ABC Retail",
      type: "Merchant",
      date: "08 Jun 2026",
    },
    {
      merchant: "XYZ Travel",
      type: "Campaign",
      date: "07 Jun 2026",
    },
    {
      merchant: "PQR Dining",
      type: "Offer",
      date: "06 Jun 2026",
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Approvals
        </h1>

        <p className="text-gray-500 mt-2">
          Pending approval requests
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {approvals.map((item) => (
            <div
              key={item.merchant}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold">
                {item.merchant}
              </h3>

              <p className="text-gray-500">
                Type: {item.type}
              </p>

              <p className="text-sm mt-1">
                Submitted: {item.date}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-green-600
                    text-white
                  "
                >
                  Approve
                </button>

                <button
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-red-600
                    text-white
                  "
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}