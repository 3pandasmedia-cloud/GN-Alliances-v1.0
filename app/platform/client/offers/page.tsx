export default function ClientOffersPage() {
  const offers = [
    {
      title: "10% Dining Cashback",
      merchant: "Swiggy",
      expiry: "30 Jun 2026",
    },
    {
      title: "15% Movie Discount",
      merchant: "PVR",
      expiry: "25 Jun 2026",
    },
    {
      title: "5% Fuel Cashback",
      merchant: "Indian Oil",
      expiry: "20 Jun 2026",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Offers
        </h1>

        <p className="text-gray-500 mt-2">
          Available offers for you
        </p>
      </div>

      <div className="grid gap-4">

        {offers.map((offer) => (
          <div
            key={offer.title}
            className="
              bg-white
              rounded-2xl
              p-5
              border
              border-gray-100
              shadow-sm
            "
          >
            <h3 className="font-semibold text-lg">
              {offer.title}
            </h3>

            <p className="text-gray-500 mt-1">
              {offer.merchant}
            </p>

            <p className="text-sm mt-2">
              Expires: {offer.expiry}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}