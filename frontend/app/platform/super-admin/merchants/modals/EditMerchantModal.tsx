"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  merchant?: any;
  onUpdated?: () => void;
};

export default function EditMerchantModal({
  isOpen,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold">
          Edit Merchant
        </h2>

        <p className="text-gray-500 mt-2">
          Edit Merchant Modal
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full h-11 rounded-xl bg-[#0B2E83] text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
