export default function PartnerSettingsPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Update company information
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <div className="space-y-4">

          <input
            placeholder="Company Name"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Email Address"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            placeholder="Phone Number"
            className="w-full h-12 border rounded-xl px-4"
          />

          <textarea
            placeholder="Company Address"
            className="w-full border rounded-xl p-4"
            rows={4}
          />

          <button
            className="
              h-12
              px-6
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}