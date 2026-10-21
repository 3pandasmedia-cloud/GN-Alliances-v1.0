"use client";
import { popup } from "@/components/ui/Popup";


import EntityActions from "@/components/auth/EntityActions";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import { useSuperAdmin } from "@/lib/useSuperAdmin";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import DeleteMerchantModal from "../modals/DeleteMerchantModal";

type Props = {
  merchant: any;
  onUpdated: () => void;
};

export default function MerchantSettings({
  merchant,
  onUpdated,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    status: "ACTIVE",

    apiEnabled: false,
    apiKey: "",
    webhookUrl: "",
    merchantApiUrl: "",
  });

  const isSuperAdmin = useSuperAdmin();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (merchant) {
      setForm({
        name: merchant.name || "",
        email: merchant.email || "",
        username: merchant.username || "",
        status: merchant.status || "ACTIVE",

        apiEnabled: merchant.apiEnabled || false,
        apiKey: merchant.apiKey || "",
        webhookUrl: merchant.webhookUrl || "",
        merchantApiUrl: merchant.merchantApiUrl || "",
      });
    }
  }, [merchant]);

  const saveChanges = async () => {
    try {
      setSaving(true);

      const response = await authFetch(
        `/partners/${merchant.id}`,
        {
          method: "PUT",
          body: JSON.stringify(isSuperAdmin ? form : Object.fromEntries(Object.entries(form).filter(([key]) => !["apiEnabled", "apiKey", "webhookUrl", "merchantApiUrl", "callbackUrl"].includes(key)))),
        }
      );

      if (!response.ok) {
        await popup.alert("Unable to save merchant.");
        return;
      }

      await popup.alert("Merchant updated successfully.");

      onUpdated();

    } catch (error) {
      console.error(error);
      await popup.alert("Server error.");
    } finally {
      setSaving(false);
    }
  };

  const [passwordOpen, setPasswordOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const uploadLogo = async () => {
    if (!logoFile) return;

    try {
      const user =
        sessionStorage.getItem("gn-user");

      const token = user
        ? JSON.parse(user).token
        : "";

      const formData = new FormData();

      formData.append(
        "logo",
        logoFile
      );

      const response =
        await fetch(
          "/api/partners/upload-logo",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        await popup.alert(data.message);
        return;
      }

      await authFetch(
        `/partners/${merchant.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            logo: data.logo,
          }),
        }
      );

      await popup.alert("Logo updated successfully.");

      onUpdated();

    } catch (error) {
      console.error(error);
    }
  };

  const generateApiKey = async () => {
    try {

      const response = await authFetch(
        `/partners/${merchant.id}/generate-api-key`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        await popup.alert(data.message);
        return;
      }

      setForm((prev) => ({
        ...prev,
        apiEnabled: true,
        apiKey: data.apiKey,
      }));

      await popup.alert("API Key generated successfully.");

    } catch (error) {

      console.error(error);

      await popup.alert("Server error.");

    }
  };

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [logoPreview, setLogoPreview] =
  useState(
    merchant.logo
      ? merchant.logo
      : "/images/default-logo.png"
  );

  return (
    <fieldset disabled={!isSuperAdmin} className="space-y-8 min-w-0">

      {/* Merchant Profile */}

      <div className="flex items-center gap-6 mb-8">

        <img
          src={logoPreview}
          className="
      w-28
      h-28
      rounded-3xl
      border
      object-cover
    "
        />

        <div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              if (!e.target.files?.length)
                return;

              setLogoFile(
                e.target.files[0]
              );

              setLogoPreview(
                URL.createObjectURL(
                  e.target.files[0]
                )
              );

            }}
          />

          <EntityActions><button
            onClick={uploadLogo}
            className="
        mt-4
        h-11
        px-5
        rounded-xl
        bg-[#0B2E83]
        text-white
      "
          >
            Upload Logo
          </button></EntityActions>

        </div>

      </div>

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Merchant Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm font-medium">
              Merchant Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full h-11 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full h-11 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Username
            </label>

            <input
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              className="w-full h-11 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="w-full h-11 border rounded-xl px-4 mt-2"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>
            </select>
          </div>

        </div>

      </div>

      {/* Login Credentials */}

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Login Credentials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <input
              value="ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢"
              disabled
              className="
          w-full
          h-11
          border
          rounded-xl
          px-4
          mt-2
          bg-gray-100
        "
            />

          </div>

        </div>

        <EntityActions><button
          onClick={() => setPasswordOpen(true)}
          className="
      mt-6
      h-11
      px-6
      rounded-xl
      bg-[#0B2E83]
      text-white
    "
        >
          Change Password
        </button></EntityActions>

      </div>

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          API Settings
        </h2>

        {isSuperAdmin ? (
        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.apiEnabled}
              onChange={(e) =>
                setForm({
                  ...form,
                  apiEnabled: e.target.checked,
                })
              }
            />

            <span>API Enabled</span>

          </div>

          <div>

            <label className="text-sm font-medium">
              API Key
            </label>

            <input
              value={form.apiKey}
              readOnly
              className="
    w-full
    h-11
    border
    rounded-xl
    px-4
    bg-gray-100
  "
            />

          </div>

          <EntityActions><button
            onClick={generateApiKey}
            className="
    h-11
    px-5
    rounded-xl
    bg-[#0B2E83]
    text-white
    hover:bg-[#09256A]
  "
          >
            Generate New API Key
          </button></EntityActions>

          <div>

            <label className="text-sm font-medium">
              Webhook URL
            </label>

            <input
              value={form.webhookUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  webhookUrl: e.target.value,
                })
              }
              className="
    w-full
    h-11
    border
    rounded-xl
    px-4
  "
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Merchant API URL
            </label>

            <input
              value={form.merchantApiUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  merchantApiUrl: e.target.value,
                })
              }
              className="
    w-full
    h-11
    border
    rounded-xl
    px-4
  "
            />

          </div>

        </div>

        ) : <p className="text-gray-600">Please contact 3Pandas Media to edit APIs.</p>}

      </div>

      <EntityActions>
      <div className="bg-white border border-red-300 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-red-600">
          Danger Zone
        </h2>

        <p className="text-gray-500 mt-3">
          Permanently delete this merchant and all
          related platform data.
        </p>

        <EntityActions><button
          onClick={() => setDeleteOpen(true)}
          className="
      mt-6
      h-11
      px-6
      rounded-xl
      bg-red-600
      text-white
    "
        >
          Delete Merchant
        </button></EntityActions>

      </div>

      </EntityActions>

      {/* Save */}

      <div className="flex justify-end">

        <EntityActions><button
          onClick={saveChanges}
          disabled={saving}
          className="h-12 px-8 rounded-xl bg-[#0B2E83] text-white"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button></EntityActions>

      </div>

      <ChangePasswordModal
        isOpen={passwordOpen}
        onClose={() =>
          setPasswordOpen(false)
        }
        merchantId={merchant.id}
      />

      <DeleteMerchantModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        merchantId={merchant.id}
        merchantName={merchant.name}
      />

    </fieldset>
  );
}
