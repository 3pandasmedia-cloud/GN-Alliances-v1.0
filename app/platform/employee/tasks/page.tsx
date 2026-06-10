export default function EmployeeTasksPage() {
  const tasks = [
    {
      title: "Review HDFC Campaign",
      priority: "High",
      due: "10 Jun 2026",
    },
    {
      title: "Verify Merchant Documents",
      priority: "Medium",
      due: "11 Jun 2026",
    },
    {
      title: "Update Offer Details",
      priority: "Low",
      due: "12 Jun 2026",
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Assigned work items
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          {tasks.map((task) => (
            <div
              key={task.title}
              className="border rounded-2xl p-4"
            >
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-500 mt-2">
                Priority: {task.priority}
              </p>

              <p className="text-sm mt-1">
                Due: {task.due}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}