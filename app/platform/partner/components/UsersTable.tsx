const users = [
  {
    name: "Admin User",
    email: "admin@gn.com",
    role: "Admin",
    status: "Active",
    login: "Today",
  },
  {
    name: "Employee User",
    email: "employee@gn.com",
    role: "Employee",
    status: "Active",
    login: "Today",
  },
  {
    name: "Partner User",
    email: "partner@gn.com",
    role: "Partner",
    status: "Active",
    login: "Yesterday",
  },
  {
    name: "Client User",
    email: "client@gn.com",
    role: "Client",
    status: "Inactive",
    login: "3 days ago",
  },
];

export default function UsersTable() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      "
    >
      {/* Desktop */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Last Login</th>
              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.email}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="p-4">
                  {user.login}
                </td>

                <td className="p-4">

                  <button
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-100
                      text-blue-700
                    "
                  >
                    Edit
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {users.map((user) => (
          <div
            key={user.email}
            className="border rounded-2xl p-4"
          >

            <h3 className="font-bold">
              {user.name}
            </h3>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

            <p className="mt-2">
              {user.role}
            </p>

            <div className="mt-2">

              <span
                className={`
                  px-3 py-1 rounded-full text-xs
                  ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {user.status}
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-3">
              {user.login}
            </p>

            <button
              className="
                mt-4
                w-full
                h-10
                rounded-xl
                bg-blue-100
                text-blue-700
              "
            >
              Edit
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}