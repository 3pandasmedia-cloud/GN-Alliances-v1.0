export default function SecuritySettings() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h2 className="text-xl font-bold mb-6">
        Security Settings
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Session Timeout (Minutes)
          </label>

          <input
            defaultValue="30"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Password Minimum Length
          </label>

          <input
            defaultValue="8"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div className="flex items-center justify-between border rounded-xl p-4">

          <span>Enable Two Factor Authentication</span>

          <input type="checkbox" />

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
          Save Security
        </button>

      </div>

    </div>
  );
}