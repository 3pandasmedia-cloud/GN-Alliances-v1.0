"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateOfferModal({
  isOpen,
  onClose,
}: Props) {
  const [title, setTitle] = useState("");
  const [partner, setPartner] = useState("");
  const [description, setDescription] =
    useState("");
  const [points, setPoints] =
    useState("");

  if (!isOpen) return null;

  const createOffer = async () => {
    try {
      const res = await fetch(
        "/api/offers",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            partner,
            description,
            points,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to create offer");
        return;
      }

      setTitle("");
      setPartner("");
      setDescription("");
      setPoints("");

      onClose();

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-[999]">
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
        <h2 className="text-2xl font-bold mb-6">
          Create Offer
        </h2>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Offer Title"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            value={partner}
            onChange={(e) =>
              setPartner(e.target.value)
            }
            placeholder="Partner Name"
            className="w-full h-12 border rounded-xl px-4"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Offer Description"
            className="
              w-full
              h-28
              border
              rounded-xl
              p-4
            "
          />

          <input
            type="number"
            value={points}
            onChange={(e) =>
              setPoints(e.target.value)
            }
            placeholder="Reward Points"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              flex-1
              h-12
              rounded-xl
              border
            "
          >
            Cancel
          </button>

          <button
            onClick={createOffer}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            Create Offer
          </button>
        </div>
      </div>
    </div>
  );
}