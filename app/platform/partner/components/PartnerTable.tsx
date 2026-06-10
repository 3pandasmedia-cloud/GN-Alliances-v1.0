"use client";

import { useEffect, useState } from "react";

type Partner = {
  id: string;
  name: string;
  type: string;
  email: string;
  status: string;
};

export default function PartnerTable() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch(console.error);
  }, []);

  const deletePartner = async (id: string) => {
    try {
      await fetch(
        `http://localhost:5000/api/partners/${id}`,
        {
          method: "DELETE",
        }
      );

      setPartners((prev) =>
        prev.filter((p) => p.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

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
                key={partner.id}
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
                      onClick={() =>
                        deletePartner(partner.id)
                      }
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-red-100
                        text-red-700
                      "
                    >
                      Delete
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
            key={partner.id}
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

            <button
              onClick={() =>
                deletePartner(partner.id)
              }
              className="
                mt-4
                w-full
                h-10
                rounded-xl
                bg-red-100
                text-red-700
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}