export default function IntegrationSettings() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h2 className="text-xl font-bold mb-6">
        Integrations
      </h2>

      <div className="space-y-4">

        <input
          placeholder="SMTP Server"
          className="w-full h-12 border rounded-xl px-4"
        />

        <input
          placeholder="SMS Gateway API Key"
          className="w-full h-12 border rounded-xl px-4"
        />

        <input
          placeholder="Payment Gateway Key"
          className="w-full h-12 border rounded-xl px-4"
        />

        <input
          placeholder="Webhook URL"
          className="w-full h-12 border rounded-xl px-4"
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
          Save Integrations
        </button>

      </div>

    </div>
  );
}