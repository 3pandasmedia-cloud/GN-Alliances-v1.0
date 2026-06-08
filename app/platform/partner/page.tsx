export default function PartnersPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Partners
          </h1>

          <p className="text-gray-500 mt-2">
            Manage banks, merchants and affiliate partners.
          </p>
        </div>

        <button
          className="
            bg-[#0B2E83]
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
          "
        >
          + Add Partner
        </button>

      </div>

    </div>
  );
}