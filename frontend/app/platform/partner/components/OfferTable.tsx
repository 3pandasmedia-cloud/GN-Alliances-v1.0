"use client";

import { useEffect, useState } from "react";

type Offer = {
  id: string;
  title: string;
  description: string;
  points: number;
  partner: string;
  status: string;
};

export default function OfferTable() {
  const [offers, setOffers] = useState<Offer[]>([]);

  const loadOffers = () => {
    fetch("http://localhost:5000/api/offers")
      .then((res) => res.json())
      .then(setOffers)
      .catch(console.error);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const deleteOffer = async (id: string) => {
    if (!confirm("Delete this offer?")) return;

    await fetch(
      `http://localhost:5000/api/offers/${id}`,
      {
        method: "DELETE",
      }
    );

    loadOffers();
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
                Title
              </th>

              <th className="text-left p-4">
                Partner
              </th>

              <th className="text-left p-4">
                Description
              </th>

              <th className="text-left p-4">
                Points
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
            {offers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b"
              >
                <td className="p-4">
                  {offer.title}
                </td>

                <td className="p-4">
                  {offer.partner}
                </td>

                <td className="p-4">
                  {offer.description}
                </td>

                <td className="p-4">
                  {offer.points}
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
                    {offer.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteOffer(offer.id)
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              border
              rounded-2xl
              p-4
            "
          >
            <h3 className="font-bold">
              {offer.title}
            </h3>

            <p className="text-sm text-gray-500">
              {offer.partner}
            </p>

            <p className="text-sm mt-2">
              {offer.description}
            </p>

            <p className="mt-2 font-medium">
              {offer.points} Points
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
                {offer.status}
              </span>
            </div>

            <button
              onClick={() =>
                deleteOffer(offer.id)
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