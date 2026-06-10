export default function PartnerOffersPage() {
  const offers = [
    {
      name: "10% Dining Cashback",
      category: "Dining",
      discount: "10%",
    },
    {
      name: "Movie Night Offer",
      category: "Entertainment",
      discount: "15%",
    },
    {
      name: "Fuel Rewards",
      category: "Fuel",
      discount: "5%",
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Offers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage available offers
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {offers.map((offer) => (
            <div
              key={offer.name}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold">
                {offer.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {offer.category}
              </p>

              <p className="text-blue-600 mt-2 font-semibold">
                {offer.discount} Discount
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}