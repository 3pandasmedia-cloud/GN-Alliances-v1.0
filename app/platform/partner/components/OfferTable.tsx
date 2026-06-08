const offers = [
  {
    name: "10% Dining Cashback",
    partner: "HDFC Bank",
    campaign: "Summer Saver",
    reward: "10%",
    status: "Active",
  },
  {
    name: "₹250 Fuel Cashback",
    partner: "Indian Oil",
    campaign: "Fuel Rewards",
    reward: "₹250",
    status: "Scheduled",
  },
  {
    name: "Movie Ticket Offer",
    partner: "PVR",
    campaign: "Entertainment Week",
    reward: "Buy 1 Get 1",
    status: "Expired",
  },
  {
    name: "Travel Discount",
    partner: "MakeMyTrip",
    campaign: "Travel Delight",
    reward: "15%",
    status: "Active",
  },
];

export default function OfferTable() {
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
                Offer
              </th>

              <th className="text-left p-4">
                Partner
              </th>

              <th className="text-left p-4">
                Campaign
              </th>

              <th className="text-left p-4">
                Reward
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {offers.map((offer) => (
              <tr
                key={offer.name}
                className="border-b"
              >

                <td className="p-4">
                  {offer.name}
                </td>

                <td className="p-4">
                  {offer.partner}
                </td>

                <td className="p-4">
                  {offer.campaign}
                </td>

                <td className="p-4">
                  {offer.reward}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        offer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : offer.status === "Scheduled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {offer.status}
                  </span>

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

        {offers.map((offer) => (
          <div
            key={offer.name}
            className="border rounded-2xl p-4"
          >

            <h3 className="font-bold">
              {offer.name}
            </h3>

            <p className="text-sm text-gray-500">
              {offer.partner}
            </p>

            <p className="text-sm mt-1">
              {offer.reward}
            </p>

            <div className="mt-3">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-xs
                "
              >
                {offer.status}
              </span>

            </div>

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