export default function PartnerCampaignsPage() {
  const campaigns = [
    {
      name: "Summer Cashback",
      status: "Active",
      clicks: "12,450",
      revenue: "₹2.4L",
    },
    {
      name: "Dining Rewards",
      status: "Active",
      clicks: "8,920",
      revenue: "₹1.8L",
    },
    {
      name: "Fuel Saver",
      status: "Scheduled",
      clicks: "5,300",
      revenue: "₹95K",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Campaigns
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your campaigns
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {campaigns.map((campaign) => (
            <div
              key={campaign.name}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold text-lg">
                {campaign.name}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">

                <div>Status: {campaign.status}</div>

                <div>Clicks: {campaign.clicks}</div>

                <div>Revenue: {campaign.revenue}</div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}