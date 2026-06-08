export default function RecentCampaigns() {
  const rows = [
    {
      campaign: "Dining Cashback",
      partner: "Swiggy",
      status: "Active",
      revenue: "₹2.4L",
      date: "08 Jun 2026",
    },
    {
      campaign: "Mega Rewards",
      partner: "Amazon",
      status: "Active",
      revenue: "₹1.8L",
      date: "07 Jun 2026",
    },
    {
      campaign: "Fuel Saver",
      partner: "Indian Oil",
      status: "Pending",
      revenue: "₹1.1L",
      date: "06 Jun 2026",
    },
    {
      campaign: "Movie Night",
      partner: "PVR",
      status: "Active",
      revenue: "₹3.2L",
      date: "05 Jun 2026",
    },
    {
      campaign: "Travel Delight",
      partner: "MakeMyTrip",
      status: "Scheduled",
      revenue: "₹2.9L",
      date: "04 Jun 2026",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-4
        md:p-6
        border
        border-gray-100
        shadow-sm
        h-auto
        xl:h-[420px]
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h3 className="text-lg md:text-xl font-bold">
          Recent Campaigns
        </h3>

      </div>

      {/* Mobile Safe Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>

            <tr className="text-left border-b">

              <th className="py-3 text-sm font-semibold">
                Campaign
              </th>

              <th className="py-3 text-sm font-semibold">
                Partner
              </th>

              <th className="py-3 text-sm font-semibold">
                Status
              </th>

              <th className="py-3 text-sm font-semibold">
                Revenue
              </th>

              <th className="py-3 text-sm font-semibold">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (
              <tr
                key={row.campaign}
                className="border-b last:border-b-0"
              >

                <td className="py-4 font-medium">
                  {row.campaign}
                </td>

                <td>
                  {row.partner}
                </td>

                <td>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      ${getStatusStyle(row.status)}
                    `}
                  >
                    {row.status}
                  </span>

                </td>

                <td className="font-medium">
                  {row.revenue}
                </td>

                <td className="text-gray-500">
                  {row.date}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}