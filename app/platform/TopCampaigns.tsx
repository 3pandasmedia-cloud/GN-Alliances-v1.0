export default function TopCampaigns() {
  const campaigns = [
    {
      name: "Summer Saver",
      revenue: "₹12.4L",
      growth: "+24%",
    },
    {
      name: "Weekend Bonanza",
      revenue: "₹9.8L",
      growth: "+18%",
    },
    {
      name: "Travel Delight",
      revenue: "₹8.4L",
      growth: "+15%",
    },
    {
      name: "Foodie Fiesta",
      revenue: "₹7.6L",
      growth: "+12%",
    },
    {
      name: "Mega Cashback",
      revenue: "₹6.7L",
      growth: "+10%",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h3 className="text-xl font-bold mb-6">
        Top Campaigns
      </h3>

      <div className="space-y-5">

        {campaigns.map((campaign) => (
          <div
            key={campaign.name}
            className="border-b pb-4 last:border-0"
          >
            <h4 className="font-semibold">
              {campaign.name}
            </h4>

            <div className="flex justify-between mt-2 text-sm">

              <span className="text-gray-500">
                {campaign.revenue}
              </span>

              <span className="text-green-600 font-medium">
                {campaign.growth}
              </span>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}