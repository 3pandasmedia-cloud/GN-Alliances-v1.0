export default function PartnerRedemptionsPage() {
  const redemptions = [
    {
      id: "RD001",
      customer: "Customer A",
      offer: "Dining Cashback",
      points: 500,
    },
    {
      id: "RD002",
      customer: "Customer B",
      offer: "Movie Night",
      points: 800,
    },
    {
      id: "RD003",
      customer: "Customer C",
      offer: "Fuel Saver",
      points: 300,
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Redemptions
        </h1>

        <p className="text-gray-500 mt-2">
          Customer redemption history
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {redemptions.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold">
                {item.offer}
              </h3>

              <p className="text-gray-500 mt-1">
                {item.customer}
              </p>

              <p className="mt-2">
                Points Used: {item.points}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}