"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Partner = {
  id: string;
  name: string;
  type: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  bankId: string;
};

export default function CreateCampaignModal({
  isOpen,
  onClose,
  onCreated,
  bankId,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [partners, setPartners] = useState<Partner[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [partnerId, setPartnerId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadPartners();
    }
  }, [isOpen]);

  const loadPartners = async () => {
    try {
      const response = await authFetch("/partners/type/MERCHANT");

      const data = await response.json();

      setPartners(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCampaign = async () => {
    if (
      !name ||
      !partnerId ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const partner = partners.find(
        (p) => p.id === partnerId
      );

      const response = await authFetch(
        "/campaigns",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            description,

            bankId,
            merchantId: partnerId,

            campaignType: "BANK",

            startDate,
            endDate,
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Unable to create campaign."
        );
        return;
      }

      alert("Campaign created successfully.");

      setName("");
      setDescription("");
      setPartnerId("");
      setStartDate("");
      setEndDate("");

      onCreated();
      onClose();

    } catch (error) {
      console.error(error);

      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
          Create Campaign
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Campaign Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
              border
              rounded-xl
              px-4
              py-3
              min-h-[100px]
            "
          />

          <select
            value={partnerId}
            onChange={(e) =>
              setPartnerId(
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
          >
            <option value="">
              Select Partner
            </option>

            {partners.map((partner) => (
              <option
                key={partner.id}
                value={partner.id}
              >
                {partner.name} ({partner.type})
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-gray-500">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
                  border
                  rounded-xl
                  px-4
                  mt-1
                "
              />

            </div>

            <div>

              <label className="text-sm text-gray-500">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
                  border
                  rounded-xl
                  px-4
                  mt-1
                "
              />

            </div>

          </div>

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
            onClick={createCampaign}
            disabled={loading}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
              font-medium
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating..."
              : "Create Campaign"}
          </button>

        </div>

      </div>

    </div>
  );
}
