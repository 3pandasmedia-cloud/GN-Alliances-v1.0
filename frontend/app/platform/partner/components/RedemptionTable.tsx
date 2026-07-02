const redemptions = [
  {
    customer: "Rahul Kumar",
    offer: "10% Dining Cashback",
    partner: "HDFC Bank",
    amount: "₹450",
    status: "Approved",
    date: "08 Jun 2026",
  },
  {
    customer: "Priya Sharma",
    offer: "Fuel Cashback",
    partner: "Indian Oil",
    amount: "₹250",
    status: "Pending",
    date: "07 Jun 2026",
  },
  {
    customer: "Arjun Patel",
    offer: "Movie Ticket Offer",
    partner: "PVR",
    amount: "₹600",
    status: "Rejected",
    date: "06 Jun 2026",
  },
  {
    customer: "Sneha Rao",
    offer: "Travel Discount",
    partner: "MakeMyTrip",
    amount: "₹1,200",
    status: "Approved",
    date: "05 Jun 2026",
  },
];

export default function RedemptionTable() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      "
    >
      {/* Desktop */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Offer</th>
              <th className="text-left p-4">Partner</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>

            {redemptions.map((item) => (
              <tr
                key={item.customer + item.date}
                className="border-b"
              >
                <td className="p-4">
                  {item.customer}
                </td>

                <td className="p-4">
                  {item.offer}
                </td>

                <td className="p-4">
                  {item.partner}
                </td>

                <td className="p-4 font-medium">
                  {item.amount}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-4">
                  {item.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {redemptions.map((item) => (
          <div
            key={item.customer + item.date}
            className="border rounded-2xl p-4"
          >

            <h3 className="font-bold">
              {item.customer}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {item.offer}
            </p>

            <p className="text-sm">
              {item.partner}
            </p>

            <p className="font-semibold mt-2">
              {item.amount}
            </p>

            <div className="mt-3">
              <span
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {item.status}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              {item.date}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}