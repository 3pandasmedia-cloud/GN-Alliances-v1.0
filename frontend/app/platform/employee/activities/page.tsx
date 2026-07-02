export default function EmployeeActivitiesPage() {
  const activities = [
    "Approved HDFC Campaign",
    "Reviewed Merchant Documents",
    "Created Cashback Offer",
    "Updated Campaign Details",
    "Verified Partner Account",
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Activities
        </h1>

        <p className="text-gray-500 mt-2">
          Recent employee actions
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {activities.map((activity) => (
            <div
              key={activity}
              className="border-l-4 border-blue-600 pl-4 py-2"
            >
              {activity}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}