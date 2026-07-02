"use client";

import {
  Home,
  Megaphone,
  Gift,
  BarChart3,
  Ticket,
  Wallet,
  Settings,
  ChevronRight,
} from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
  },
  {
    id: "offers",
    label: "Offers",
    icon: Gift,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "redemptions",
    label: "Coming Soon",
    icon: Ticket,
  },
  {
    id: "reconciliation",
    label: "Coming Soon",
    icon: Wallet,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MerchantTabs({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <>
      {/* Desktop */}

      <div
        className="
          hidden
          md:flex
          bg-white
          border
          rounded-2xl
          p-2
          gap-2
          flex-wrap
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              h-11
              px-5
              rounded-xl
              flex
              items-center
              gap-2
              transition
              ${
                activeTab === tab.id
                  ? "bg-[#0B2E83] text-white"
                  : "hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            <tab.icon size={18} />

            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile */}

      <div
        className="
          md:hidden
          bg-white
          rounded-3xl
          border
          overflow-hidden
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              w-full
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              last:border-b-0
              transition
              ${
                activeTab === tab.id
                  ? "bg-[#0B2E83] text-white"
                  : "hover:bg-gray-50"
              }
            `}
          >
            <div className="flex items-center gap-3">

              <tab.icon size={20} />

              <span className="font-medium">
                {tab.label}
              </span>

            </div>

            <ChevronRight size={18} />

          </button>
        ))}
      </div>
    </>
  );
}