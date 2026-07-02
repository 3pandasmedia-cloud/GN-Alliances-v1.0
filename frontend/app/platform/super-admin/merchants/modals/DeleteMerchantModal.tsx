"use client";

import { useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  merchantName: string;
};

export default function DeleteMerchantModal({
  isOpen,
  onClose,
  merchantId,
  merchantName,
}: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const deleteMerchant = async () => {
    try {
      setLoading(true);

      const response = await authFetch(
        `/partners/${merchantId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Merchant deleted successfully.");

      window.location.href =
        "/platform/super-admin/merchants";

    } catch (error) {
      console.error(error);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[520px]">

        <h2 className="text-3xl font-bold text-red-600">
          Delete Merchant
        </h2>

        <p className="mt-5 text-gray-600">
          You're about to permanently delete
          <strong> {merchantName}</strong>.
        </p>

        <p className="mt-2 text-red-600">
          This action cannot be undone.
        </p>

        <p className="mt-6 text-sm">
          Type <b>DELETE</b> to continue.
        </p>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-12 border rounded-xl px-4 mt-3"
        />

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="h-11 px-6 border rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={text !== "DELETE" || loading}
            onClick={deleteMerchant}
            className="h-11 px-6 rounded-xl bg-red-600 text-white disabled:opacity-40"
          >
            {loading
              ? "Deleting..."
              : "Delete Merchant"}
          </button>

        </div>

      </div>

    </div>
  );
}