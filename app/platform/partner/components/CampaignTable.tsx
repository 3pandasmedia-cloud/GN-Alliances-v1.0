const campaigns = [
  {
    name: "Summer Saver",
    partner: "HDFC Bank",
    type: "Cashback",
    status: "Active",
    budget: "₹10,00,000",
  },
  {
    name: "Fuel Rewards",
    partner: "Indian Oil",
    type: "Loyalty",
    status: "Scheduled",
    budget: "₹5,00,000",
  },
  {
    name: "Travel Delight",
    partner: "MakeMyTrip",
    type: "Coupon",
    status: "Completed",
    budget: "₹8,00,000",
  },
  {
    name: "Dining Festival",
    partner: "Swiggy",
    type: "Discount",
    status: "Active",
    budget: "₹12,00,000",
  },
];

export default function CampaignTable() {
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

              <th className="text-left p-4">
                Campaign
              </th>

              <th className="text-left p-4">
                Partner
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Budget
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {campaigns.map((campaign) => (
              <tr
                key={campaign.name}
                className="border-b"
              >

                <td className="p-4">
                  {campaign.name}
                </td>

                <td className="p-4">
                  {campaign.partner}
                </td>

                <td className="p-4">
                  {campaign.type}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : campaign.status === "Scheduled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {campaign.status}
                  </span>

                </td>

                <td className="p-4">
                  {campaign.budget}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700">
                      View
                    </button>

                    <button className="px-3 py-1 rounded-lg bg-gray-100">
                      Edit
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {campaigns.map((campaign) => (
          <div
            key={campaign.name}
            className="border rounded-2xl p-4"
          >

            <h3 className="font-bold">
              {campaign.name}
            </h3>

            <p className="text-sm text-gray-500">
              {campaign.partner}
            </p>

            <p className="text-sm mt-1">
              {campaign.type}
            </p>

            <div className="mt-3">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                {campaign.status}
              </span>
            </div>

            <p className="mt-3 font-semibold">
              {campaign.budget}
            </p>

            <div className="flex gap-2 mt-4">

              <button className="flex-1 h-10 rounded-xl bg-blue-100 text-blue-700">
                View
              </button>

              <button className="flex-1 h-10 rounded-xl bg-gray-100">
                Edit
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}