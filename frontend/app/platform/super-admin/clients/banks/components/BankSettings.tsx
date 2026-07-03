"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  bank: any;
  onUpdated: () => void;
};

export default function BankSettings({
  bank,
  onUpdated,
}: Props) {
  const [saving, setSaving] =
    useState(false);

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [logoPreview, setLogoPreview] =
    useState("/images/default-logo.png");

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",

    apiEnabled: false,
    apiKey: "",
    webhookUrl: "",
    callbackUrl: "",
  });

  useEffect(() => {
    if (!bank) return;

    setLogoPreview(
  bank.logo
    ? bank.logo
    : "/images/default-logo.png"
);

    setForm({
      name: bank.name || "",
      email: bank.email || "",
      username: bank.username || "",

      apiEnabled: bank.apiEnabled || false,
      apiKey: bank.apiKey || "",
      webhookUrl: bank.webhookUrl || "",
      callbackUrl: bank.callbackUrl || "",
    });

  }, [bank]);

  const saveChanges = async () => {
    try {

      setSaving(true);

      const response =
        await authFetch(
          `/partners/${bank.id}`,
          {
            method: "PUT",
            body: JSON.stringify(form),
          }
        );

      if (!response.ok) {
        alert("Unable to save.");
        return;
      }

      alert("Bank updated.");

      onUpdated();

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);

    }
  };

  const generateApiKey =
    async () => {
      try {

        const response =
          await authFetch(
            `/partners/${bank.id}/generate-api-key`,
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        setForm({
          ...form,
          apiEnabled: true,
          apiKey: data.apiKey,
        });

      } catch (error) {

        console.error(error);

      }
    };

  const uploadLogo =
    async () => {

      if (!logoFile) return;

      const user =
        sessionStorage.getItem(
          "gn-user"
        );

      const token = user
        ? JSON.parse(user).token
        : "";

      const formData =
        new FormData();

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

      await authFetch(
        `/partners/${bank.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            logo: data.logo,
          }),
        }
      );

      onUpdated();
    };

  return (
    <div className="space-y-8">

      {/* Logo */}

      <div className="flex items-center gap-6">

        <div className="w-28 h-28 rounded-3xl border bg-white flex items-center justify-center p-3">
          <img
            src={logoPreview || "/images/default-logo.png"}
            alt="Bank Logo"
            className="max-w-full max-h-full object-contain"
          />
        </div>

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

          <button
            onClick={uploadLogo}
            className="
              mt-4
              h-11
              px-6
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            Upload Logo
          </button>

        </div>

      </div>

      {/* Profile */}

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Bank Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            placeholder="Bank Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="h-11 border rounded-xl px-4"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="h-11 border rounded-xl px-4"
          />

          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            className="h-11 border rounded-xl px-4"
          />

        </div>

      </div>

      {/* API */}

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          API Settings
        </h2>

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

            API Enabled

          </div>

          <input
            value={form.apiKey}
            readOnly
            placeholder="API Key"
            className="
              w-full
              h-11
              border
              rounded-xl
              px-4
              bg-gray-100
            "
          />

          <button
            onClick={generateApiKey}
            className="
              h-11
              px-6
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            Generate API Key
          </button>

          <input
            placeholder="Webhook URL"
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

          <input
            placeholder="Callback URL"
            value={form.callbackUrl}
            onChange={(e) =>
              setForm({
                ...form,
                callbackUrl: e.target.value,
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

      {/* Integrations */}

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Network Integrations
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="border rounded-2xl p-6">

            <h3 className="font-bold">
              Mastercard
            </h3>

            <p className="text-gray-500 mt-2">
              Coming Soon
            </p>

          </div>

          <div className="border rounded-2xl p-6">

            <h3 className="font-bold">
              Visa
            </h3>

            <p className="text-gray-500 mt-2">
              Coming Soon
            </p>

          </div>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={saveChanges}
          disabled={saving}
          className="
            h-12
            px-8
            rounded-xl
            bg-[#0B2E83]
            text-white
          "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}
