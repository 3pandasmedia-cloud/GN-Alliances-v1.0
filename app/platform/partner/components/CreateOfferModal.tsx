"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateOfferModal({
  isOpen,
  onClose,
}: Props) {
  if (!isOpen) return null;

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
            placeholder="Offer Name"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Partner"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Campaign"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Reward Value"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            type="date"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            type="date"
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