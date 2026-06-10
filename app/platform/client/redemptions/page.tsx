export default function ClientRedemptionsPage() {
  const redemptions = [
    {
      offer: "Dining Cashback",
      points: 500,
      date: "08 Jun 2026",
      status: "Completed",
    },
    {
      offer: "Movie Discount",
      points: 750,
      date: "06 Jun 2026",
      status: "Completed",
    },
    {
      offer: "Fuel Rewards",
      points: 300,
      date: "04 Jun 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Redemptions
        </h1>

        <p className="text-gray-500 mt-2">
          Your redemption history
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {redemptions.map((item) => (
            <div
              key={item.offer}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold">
                {item.offer}
              </h3>

              <p className="text-gray-500">
                Points Used: {item.points}
              </p>

              <p className="text-sm mt-1">
                {item.date}
              </p>

              <span className="text-green-600 text-sm">
                {item.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}