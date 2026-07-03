"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/lib/api";
import MerchantTabs from "../components/MerchantTabs";
import MerchantOverview from "../components/MerchantOverview";
import MerchantCampaigns from "../components/MerchantCampaigns";
import MerchantOffers from "../components/MerchantOffers";
import MerchantAnalytics from "../components/MerchantAnalytics";
import MerchantSettings from "../components/MerchantSettings";
import MerchantRedemptions from "../components/MerchantRedemptions";
import MerchantReconciliation from "../components/MerchantReconciliation";

export default function MerchantDashboard() {
    const params = useParams();

    const slug = params.slug as string;

    const [merchant, setMerchant] =
        useState<any>(null);

    const [activeTab, setActiveTab] =
        useState("overview");

    useEffect(() => {
        if (slug) {
            loadMerchant();
        }
    }, [slug]);

    const loadMerchant =
        async () => {
            try {
                const response =
                    await authFetch(
                        `/partners/slug/${slug}`
                    );

                const data =
                    await response.json();

                setMerchant(data);
            } catch (error) {
                console.error(error);
            }
        };

    if (!merchant) {
        return (
            <div className="p-10">
                Loading Merchant...
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}

            <div
                className="
          bg-white
          rounded-3xl
          border
          p-6
          flex
          items-center
          gap-6
        "
            >
                <img
                    src={
  merchant.logo
    ? merchant.logo
    : "/images/default-logo.png"
}
                    alt={merchant.name}
                    className="w-[90px] h-[90px] rounded-2xl border object-cover"
                />

                <div>
                    <h1 className="text-4xl font-bold">
                        {merchant.name}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {merchant.email}
                    </p>

                    <p className="text-sm mt-2">
                        Status:
                        <span className="ml-2 text-green-600 font-medium">
                            {merchant.status}
                        </span>
                    </p>
                </div>
            </div>

            <MerchantTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {activeTab === "overview" && (
                <MerchantOverview
                    merchantId={merchant.id}
                />
            )}

            {activeTab === "campaigns" && (
                <MerchantCampaigns
                    merchantId={merchant.id}
                />
            )}

            {activeTab === "offers" && (
                <MerchantOffers
                    merchantId={merchant.id}
                    merchantName={merchant.name}
                />
            )}

            {activeTab === "analytics" && (
                <MerchantAnalytics
                    merchantId={merchant.id}
                />
            )}

            {activeTab === "redemptions" && (
                <MerchantRedemptions />
            )}

            {activeTab === "reconciliation" && (
                <MerchantReconciliation />
            )}

            {activeTab === "settings" && (
                <MerchantSettings
                    merchant={merchant}
                    onUpdated={loadMerchant}
                />
            )}

        </div>
    );
}
