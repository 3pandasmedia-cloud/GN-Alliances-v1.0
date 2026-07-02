"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function AddPartnerModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Bank");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const createPartner = async () => {
    await fetch(
      "https://api.gnalliances.com/api/partners",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          email,
        }),
      }
    );

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 w-[95%] max-w-xl">
        <h2 className="text-2xl font-bold mb-6">
          Add Partner
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Partner Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full h-12 border rounded-xl px-4"
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full h-12 border rounded-xl px-4"
          >
            <option>Bank</option>
            <option>Merchant</option>
            <option>Affiliate</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-12 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={createPartner}
            className="flex-1 h-12 rounded-xl bg-[#0B2E83] text-white"
          >
            Create Partner
          </button>
        </div>
      </div>
    </div>
  );
}