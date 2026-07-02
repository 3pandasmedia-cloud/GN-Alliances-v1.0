"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import CreateOfferModal from "../modals/CreateOfferModal";
import EditOfferModal from "../modals/EditOfferModal";

type Props = {
  merchantId: string;
  merchantName: string;
};

type Offer = {
  id: string;
  title: string;
  description: string;
  points: number;
  status: string;

  views: number;
  redemptions: number;
};

type Campaign = {
  id: string;
  name: string;
};

export default function MerchantOffers({
  merchantId,
  merchantName,
}: Props) {
  const [offers, setOffers] =
    useState<Offer[]>([]);

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [open, setOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedOffer, setSelectedOffer] =
    useState<any>(null);

  const toggleStatus = async (
    id: string,
    currentStatus: string
  ) => {
    try {

      const user =
        sessionStorage.getItem(
          "gn-user"
        );

      const token = user
        ? JSON.parse(user).token
        : "";

      await fetch(
        `https://api.gnalliances.com/api/offers/${id}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status:
              currentStatus === "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE",
          }),
        }
      );

      loadOffers();

    } catch (error) {
      console.error(error);
    }
  };

  const loadCampaigns = async () => {
    try {
      const response = await authFetch(
        `/campaigns/merchant/${merchantId}`
      );

      const data = await response.json();

      setCampaigns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOffers =
    async () => {
      try {

        const response =
          await authFetch(
            `/offers/merchant/${merchantId}`
          );

        const data =
          await response.json();

        setOffers(data);

      } catch (error) {
        console.error(error);
      }
    };

  const deleteOffer = async (
    id: string
  ) => {
    try {

      const user =
        sessionStorage.getItem(
          "gn-user"
        );

      const token = user
        ? JSON.parse(user).token
        : "";

      const response =
        await fetch(
          `https://api.gnalliances.com/api/offers/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        alert("Delete failed");
        return;
      }

      loadOffers();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (merchantId) {
      loadOffers();
      loadCampaigns();
    }
  }, [merchantId]);

  return (
    <>
      <div
        className="
          bg-white
          border
          rounded-3xl
          p-6
        "
      >

        <div
          className="
grid
grid-cols-2
lg:grid-cols-4
gap-4
mb-6
"
        >

          <div className="
border
rounded-3xl
p-5
min-h-[110px]
">
            <p className="text-gray-500">
              Total Offers
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {offers.length}
            </h2>
          </div>

          <div className="border rounded-3xl p-6">
            <p className="text-gray-500">
              Active Offers
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                offers.filter(
                  (offer) =>
                    offer.status === "ACTIVE"
                ).length
              }
            </h2>
          </div>

          <div className="border rounded-3xl p-6">
            <p className="text-gray-500">
              Total Redemptions
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                offers.reduce(
                  (sum, offer) =>
                    sum +
                    (offer.redemptions || 0),
                  0
                )
              }
            </h2>
          </div>

          <div className="border rounded-3xl p-6">
            <p className="text-gray-500">
              Total Views
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {
                offers.reduce(
                  (sum, offer) =>
                    sum +
                    (offer.views || 0),
                  0
                )
              }
            </h2>
          </div>

        </div>
        <div className="mb-6">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Offers
            </h2>

            <button
              onClick={() => setOpen(true)}
              className="
        hidden
        md:block
        h-11
        px-5
        rounded-xl
        bg-[#0B2E83]
        text-white
      "
            >
              + Create Offer
            </button>

          </div>

          <button
            onClick={() => setOpen(true)}
            className="
      md:hidden
      mt-4
      w-full
      h-12
      rounded-xl
      bg-[#0B2E83]
      text-white
      font-medium
    "
          >
            + Create Offer
          </button>

        </div>

        {offers.length === 0 ? (
          <p className="text-gray-500">
            No offers available.
          </p>
        ) : (
          <div className="space-y-4">

            {offers.map((offer) => (

              <div
                key={offer.id}
                className="
    border
    rounded-3xl
    p-5
    shadow-sm
  "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-bold">
                      {offer.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {offer.description}
                    </p>

                  </div>

                  <span
                    className={
                      offer.status === "ACTIVE"
                        ? "px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"
                        : "px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium"
                    }
                  >
                    {offer.status}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-[#0B2E83] text-xl font-bold">
                    ⭐ {offer.points} Points
                  </p>

                </div>

                <div
                  className="
      mt-5
      grid
      grid-cols-2
      gap-4
      text-sm
      text-gray-600
    "
                >

                  <div>
                    👁 Views
                    <p className="font-semibold text-black mt-1">
                      {offer.views || 0}
                    </p>
                  </div>

                  <div>
                    🎯 Redemptions
                    <p className="font-semibold text-black mt-1">
                      {offer.redemptions || 0}
                    </p>
                  </div>

                </div>

                <div
                  className="
      mt-6
      grid
      grid-cols-2
      md:flex
      gap-3
    "
                >

                  <button
                    onClick={() => {
                      setSelectedOffer(offer);
                      setEditOpen(true);
                    }}
                    className="
        h-10
        rounded-xl
        bg-blue-100
        text-blue-700
        font-medium
      "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(
                        offer.id,
                        offer.status
                      )
                    }
                    className="
        h-10
        rounded-xl
        bg-yellow-100
        text-yellow-700
        font-medium
      "
                  >
                    {offer.status === "ACTIVE"
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() =>
                      deleteOffer(offer.id)
                    }
                    className="
        h-10
        rounded-xl
        bg-red-100
        text-red-700
        font-medium
        col-span-2
        md:col-span-1
      "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}
      </div>

      <CreateOfferModal
        isOpen={open}
        onClose={() => setOpen(false)}
        merchantId={merchantId}
        merchantName={merchantName}
        campaigns={campaigns}
        onCreated={loadOffers}
      />

      <EditOfferModal
        isOpen={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedOffer(null);
        }}
        offer={selectedOffer}
        onUpdated={loadOffers}
      />
    </>
  );
}