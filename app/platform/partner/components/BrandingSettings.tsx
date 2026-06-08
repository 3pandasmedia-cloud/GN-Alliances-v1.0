export default function BrandingSettings() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h2 className="text-xl font-bold mb-6">
        Branding
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Logo URL
          </label>

          <input
            placeholder="https://..."
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Primary Color
          </label>

          <input
            defaultValue="#0B2E83"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Secondary Color
          </label>

          <input
            defaultValue="#1847B8"
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
          Save Branding
        </button>

      </div>

    </div>
  );
}