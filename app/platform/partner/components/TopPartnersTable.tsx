const partners = [
  {
    name: "HDFC Bank",
    revenue: "₹42L",
    campaigns: 18,
  },
  {
    name: "ICICI Bank",
    revenue: "₹36L",
    campaigns: 15,
  },
  {
    name: "Swiggy",
    revenue: "₹28L",
    campaigns: 12,
  },
  {
    name: "MakeMyTrip",
    revenue: "₹24L",
    campaigns: 9,
  },
];

export default function TopPartnersTable() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h3 className="text-xl font-bold mb-6">
        Top Partners
      </h3>

      <div className="space-y-4">

        {partners.map((partner) => (
          <div
            key={partner.name}
            className="
              flex
              items-center
              justify-between
              border-b
              pb-3
            "
          >
            <div>
              <p className="font-semibold">
                {partner.name}
              </p>

              <p className="text-sm text-gray-500">
                {partner.campaigns} Campaigns
              </p>
            </div>

            <span className="font-bold">
              {partner.revenue}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}