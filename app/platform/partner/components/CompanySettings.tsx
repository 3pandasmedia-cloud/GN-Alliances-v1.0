export default function CompanySettings() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h2 className="text-xl font-bold mb-6">
        Company Information
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Company Name
          </label>

          <input
            defaultValue="GN Alliances"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Website
          </label>

          <input
            defaultValue="https://gnalliances.com"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Support Email
          </label>

          <input
            defaultValue="support@gnalliances.com"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

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
  );
}