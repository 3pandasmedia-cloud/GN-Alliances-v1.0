"use client";

import { Store } from "lucide-react";

export default function PendingApprovals() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-4
        md:p-6
        border
        border-gray-100
        shadow-sm
        h-auto
        md:h-[420px]
      "
    >

      {/* Header */}

      <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
        Merchant Onboarding
      </h3>

      {/* Main Stats Card */}

      <div
        className="
          bg-[#F8FAFC]
          rounded-2xl
          p-4
          md:p-5
          flex
          items-center
          gap-4
          mb-6
        "
      >

        <div
          className="
            w-12
            h-12
            md:w-14
            md:h-14
            rounded-xl
            bg-blue-100
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Store
            size={24}
            className="text-blue-600"
          />
        </div>

        <div>

          <h4
            className="
              text-3xl
              md:text-4xl
              font-bold
            "
          >
            245
          </h4>

          <p className="text-gray-600 text-sm md:text-base">
            Pending Approvals
          </p>

          <p className="text-green-600 text-sm mt-1">
            +18 this week
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="space-y-4 mb-6">

        <div className="flex items-center justify-between">

          <span className="text-gray-600 text-sm md:text-base">
            Approved This Month
          </span>

          <span className="font-semibold">
            312
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-gray-600 text-sm md:text-base">
            Rejected This Month
          </span>

          <span className="font-semibold">
            28
          </span>

        </div>

      </div>

      {/* CTA */}

      <button
        className="
          w-full
          h-11
          md:h-12
          rounded-xl
          bg-[#0B2E83]
          text-white
          font-semibold
          text-sm
          md:text-base
          hover:bg-[#08256B]
          transition
        "
      >
        Review Merchants
      </button>

    </div>
  );
}