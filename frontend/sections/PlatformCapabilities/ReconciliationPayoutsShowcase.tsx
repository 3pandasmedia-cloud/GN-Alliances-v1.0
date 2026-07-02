"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/common/AnimatedReveal";

export default function ReconciliationPayoutsShowcase() {
  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">

      {/* Content */}

      <AnimatedReveal direction="left">
        <div className="order-2 lg:order-1">
          <p className="text-[#F2A900] font-semibold uppercase tracking-[3px] text-sm">
            RECONCILIATION & PAYOUTS
          </p>

          <h3 className="mt-4 text-3xl lg:text-5xl font-bold text-[#0B2E83] leading-tight">
            Automated Settlements & Financial Accuracy
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Simplify financial operations with automated reconciliation,
            payout management and complete transaction transparency.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Automated payout calculations</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Merchant settlement tracking</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Financial reconciliation</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Audit-ready reporting</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Automated Payouts
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Financial Control
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Reconciliation Engine
            </span>
          </div>
        </div>
      </AnimatedReveal>

      {/* Screenshot */}

      <AnimatedReveal direction="right">
        <div className="order-1 lg:order-2">
          <Image
            src="/screenshots/platform/reconciliation-payouts.png"
            alt="Reconciliation & Payouts"
            width={1200}
            height={800}
            className="
              w-full
              rounded-3xl
              border
              border-gray-200
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              hover:scale-[1.01]
              transition-all
              duration-700
            "
          />
        </div>
      </AnimatedReveal>

    </div>
  );
}