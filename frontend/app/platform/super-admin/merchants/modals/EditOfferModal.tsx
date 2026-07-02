"use client";

import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onUpdated: () => void;
};

export default function EditOfferModal({
  isOpen,
  onClose,
  offer,
  onUpdated,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [points, setPoints] =
    useState("");

  const [status, setStatus] =
    useState("ACTIVE");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (offer) {
      setTitle(offer.title || "");

      setDescription(
        offer.description || ""
      );

      setPoints(
        String(offer.points || 0)
      );

      setStatus(
        offer.status || "ACTIVE"
      );
    }
  }, [offer]);

  if (!isOpen || !offer) {
    return null;
  }

  const updateOffer =
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
            `http://localhost:5000/api/offers/${offer.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                title,
                description,
                points,
                status,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Failed to update offer"
          );
          return;
        }

        alert(
          "Offer updated successfully"
        );

        onUpdated();
        onClose();

      } catch (error) {
        console.error(error);

        alert(
          "Unable to connect to server"
        );
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
          Edit Offer
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Offer Title"
            value={title}
            onChange={(e) =>
              setTitle(
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

          <select
            value={status}
            onChange={(e) =>
              setStatus(
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
            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="INACTIVE">
              INACTIVE
            </option>
          </select>

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
            onClick={updateOffer}
            disabled={loading}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
              disabled:opacity-50
            "
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}