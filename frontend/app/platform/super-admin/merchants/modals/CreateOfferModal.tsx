"use client";

import { useState } from "react";

type Campaign = {
  id: string;
  name: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  merchantName: string;
  campaigns: Campaign[];
  onCreated: () => void;
};

export default function CreateOfferModal({
  isOpen,
  onClose,
  merchantId,
  merchantName,
  campaigns,
  onCreated,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [campaignId, setCampaignId] = useState("");

  const [description, setDescription] =
    useState("");

  const [points, setPoints] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const createOffer =
    async () => {
      try {
        setLoading(true);

        const user =
          sessionStorage.getItem(
            "gn-user"
          );

        const token = user
          ? JSON.parse(user).token
          : "";

        const response =
          await fetch(
            "/api/offers",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                title,
                description,
                points: Number(points),

                campaignId,

                partnerId: merchantId,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        alert(
          "Offer created successfully"
        );

        onCreated();
        onClose();

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[9999]">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-3xl
          p-8
          w-[95%]
          max-w-xl
        "
      >
        <h2 className="text-3xl font-bold mb-6">
          Create Offer
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Offer Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              w-full
              h-28
              border
              rounded-xl
              p-4
            "
          />

          <select
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            className="w-full h-12 border rounded-xl px-4"
          >
            <option value="">
              Select Campaign
            </option>

            {campaigns.map((campaign) => (
              <option
                key={campaign.id}
                value={campaign.id}
              >
                {campaign.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Reward Points"
            value={points}
            onChange={(e) =>
              setPoints(
                e.target.value
              )
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

        </div>

        <div className="flex gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              flex-1
              h-12
              border
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={createOffer}
            disabled={loading}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            {loading
              ? "Creating..."
              : "Create Offer"}
          </button>

        </div>

      </div>

    </div>
  );
}