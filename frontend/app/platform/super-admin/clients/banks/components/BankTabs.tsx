"use client";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function BankTabs({
  activeTab,
  setActiveTab,
}: Props) {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "campaigns",
      label: "Campaigns",
    },
    {
      id: "merchants",
      label: "Merchants",
    },
    {
      id: "analytics",
      label: "Analytics",
    },
    {
      id: "settings",
      label: "Settings",
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-3
      "
    >
      <div
        className="
          flex
          flex-wrap
          gap-2
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
              px-6
              rounded-xl
              font-medium
              transition-all
              ${
                activeTab === tab.id
                  ? "bg-[#0B2E83] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}