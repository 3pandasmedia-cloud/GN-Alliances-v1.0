const partners = [
  {
    name: "HDFC Bank",
    type: "Bank",
    email: "admin@hdfc.com",
    status: "Active",
  },
  {
    name: "ICICI Bank",
    type: "Bank",
    email: "contact@icici.com",
    status: "Pending",
  },
  {
    name: "Swiggy",
    type: "Merchant",
    email: "ops@swiggy.com",
    status: "Active",
  },
  {
    name: "Amazon",
    type: "Affiliate",
    email: "partner@amazon.com",
    status: "Active",
  },
];

export default function PartnerTable() {
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

              <th className="text-left p-4">
                Partner
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {partners.map((partner) => (
              <tr
                key={partner.email}
                className="border-b"
              >

                <td className="p-4">
                  {partner.name}
                </td>

                <td className="p-4">
                  {partner.type}
                </td>

                <td className="p-4">
                  {partner.email}
                </td>

                <td className="p-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-xs
                    "
                  >
                    {partner.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-blue-100
                        text-blue-700
                      "
                    >
                      View
                    </button>

                    <button
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-gray-100
                      "
                    >
                      Edit
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {partners.map((partner) => (
          <div
            key={partner.email}
            className="
              border
              rounded-2xl
              p-4
            "
          >

            <h3 className="font-bold">
              {partner.name}
            </h3>

            <p className="text-sm text-gray-500">
              {partner.type}
            </p>

            <p className="text-sm mt-2">
              {partner.email}
            </p>

            <div className="mt-3">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-xs
                "
              >
                {partner.status}
              </span>

            </div>

            <div className="flex gap-2 mt-4">

              <button
                className="
                  flex-1
                  h-10
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                "
              >
                View
              </button>

              <button
                className="
                  flex-1
                  h-10
                  rounded-xl
                  bg-gray-100
                "
              >
                Edit
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}