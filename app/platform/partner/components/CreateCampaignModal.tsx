"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateCampaignModal({
  isOpen,
  onClose,
}: Props) {
  const [name, setName] =
    useState("");

  const [partnerName, setPartnerName] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  if (!isOpen) return null;

  const createCampaign =
    async () => {
      await fetch(
        "/api/campaigns",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            partnerId:
              crypto.randomUUID(),
            partnerName,
            startDate,
            endDate,
          }),
        }
      );

      onClose();

      window.location.reload();
    };

  return (
    <div className="fixed inset-0 z-[999]">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 w-[95%] max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          Create Campaign
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Campaign Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Partner Name"
            value={partnerName}
            onChange={(e) =>
              setPartnerName(
                e.target.value
              )
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="w-full h-12 border rounded-xl px-4"
          />

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={
              createCampaign
            }
            className="flex-1 h-12 rounded-xl bg-[#0B2E83] text-white"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}