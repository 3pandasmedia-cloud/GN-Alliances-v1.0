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
};

export default function CreateCampaignModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [banks, setBanks] = useState<Partner[]>([]);
  const [merchants, setMerchants] = useState<Partner[]>([]);

  const [bankId, setBankId] = useState("");
  const [merchantId, setMerchantId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [campaignType, setCampaignType] =
    useState("BANK");

  const [budget, setBudget] =
    useState("");

  const [priority, setPriority] =
    useState("1");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  useEffect(() => {
    if (!isOpen) return;

    loadPartners();
  }, [isOpen]);

  const loadPartners = async () => {
    try {
      const response =
        await authFetch("/partners");

      const data =
        await response.json();

      setBanks(
        data.filter(
          (p: Partner) =>
            p.type === "BANK"
        )
      );

      setMerchants(
        data.filter(
          (p: Partner) =>
            p.type === "MERCHANT"
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const createCampaign =
    async () => {

      if (
        !name ||
        !bankId ||
        !merchantId ||
        !startDate ||
        !endDate
      ) {
        alert("Please fill all required fields.");
        return;
      }

      try {

        setLoading(true);

        const response =
          await authFetch(
            "/campaigns",
            {
              method: "POST",
              body: JSON.stringify({
                name,
                description,

                bankId,
                merchantId,

                campaignType,

                budget,
                priority,

                startDate,
                endDate,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Unable to create campaign."
          );
          return;
        }

        alert(
          "Campaign created successfully."
        );

        onCreated();
        onClose();

      } catch (error) {

        console.error(error);

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

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 w-[95%] max-w-2xl">

        <h2 className="text-3xl font-bold mb-8">
          Create Campaign
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Campaign Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full h-28 border rounded-xl p-4"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <select
              value={bankId}
              onChange={(e) =>
                setBankId(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            >
              <option value="">
                Select Bank
              </option>

              {banks.map((bank) => (
                <option
                  key={bank.id}
                  value={bank.id}
                >
                  {bank.name}
                </option>
              ))}

            </select>

            <select
              value={merchantId}
              onChange={(e) =>
                setMerchantId(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            >
              <option value="">
                Select Merchant
              </option>

              {merchants.map(
                (merchant) => (
                  <option
                    key={
                      merchant.id
                    }
                    value={
                      merchant.id
                    }
                  >
                    {merchant.name}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="grid md:grid-cols-3 gap-4">

            <select
              value={campaignType}
              onChange={(e) =>
                setCampaignType(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            >
              <option value="BANK">
                Bank Campaign
              </option>

              <option value="SEASONAL">
                Seasonal
              </option>

              <option value="FESTIVAL">
                Festival
              </option>

            </select>

            <input
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) =>
                setBudget(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            />

            <input
              type="number"
              placeholder="Priority"
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              className="h-12 border rounded-xl px-4"
            />

          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 h-12 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={createCampaign}
            disabled={loading}
            className="flex-1 h-12 rounded-xl bg-[#0B2E83] text-white"
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