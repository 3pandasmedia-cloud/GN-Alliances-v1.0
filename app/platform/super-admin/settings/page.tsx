import CompanySettings from "../../partner//components/CompanySettings";
import BrandingSettings from "../../partner//components/BrandingSettings";
import SecuritySettings from "../../partner//components/SecuritySettings";
import IntegrationSettings from "../../partner/components/IntegrationSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage platform configuration
        </p>

      </div>

      <CompanySettings />

      <BrandingSettings />

      <SecuritySettings />

      <IntegrationSettings />

    </div>
  );
}