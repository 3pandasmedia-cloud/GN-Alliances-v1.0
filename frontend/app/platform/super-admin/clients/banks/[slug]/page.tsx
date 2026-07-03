"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/lib/api";

import BankTabs from "../components/BankTabs";
import BankOverview from "../components/BankOverview";
import BankCampaigns from "../components/BankCampaigns";
import BankMerchants from "../components/BankMerchants";
import BankAnalytics from "../components/BankAnalytics";
import BankSettings from "../components/BankSettings";

export default function BankDashboard() {
  const params = useParams();

  const slug = params.slug as string;

  const [bank, setBank] = useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {
    if (slug) {
      loadBank();
    }
  }, [slug]);

  const loadBank = async () => {
    try {
      const response = await authFetch(
        `/partners/slug/${slug}`
      );

      const data = await response.json();

      setBank(data);

    } catch (error) {
      console.error(error);
    }
  };

  if (!bank) {
    return (
      <div className="p-10">
        Loading Bank...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div
        className="
          bg-white
          border
          rounded-3xl
          p-6
          flex
          items-center
          gap-6
        "
      >
        <div className="w-24 h-24 rounded-2xl border bg-white flex items-center justify-center p-2">
          <img
            src={
  bank.logo
    ? bank.logo
    : "/images/default-logo.png"
}
            alt={bank.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div>

          <h1 className="text-4xl font-bold">
            {bank.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {bank.email}
          </p>

          <p className="mt-2">
            Status :
            <span className="ml-2 text-green-600 font-semibold">
              {bank.status}
            </span>
          </p>

        </div>

      </div>

      <BankTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "overview" && (
        <BankOverview
          bankId={bank.id}
        />
      )}

      {activeTab === "campaigns" && (
        <BankCampaigns
          bankId={bank.id}
          bankName={bank.name}
        />
      )} 

      {activeTab === "merchants" && (
        <BankMerchants
          bankId={bank.id}
         />
      )}

      {activeTab === "analytics" && (
        <BankAnalytics
          bankId={bank.id}
        />
      )}

      {activeTab === "settings" && (
        <BankSettings
          bank={bank}
          onUpdated={loadBank}
        />
      )}

    </div>
  );
}
