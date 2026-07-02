"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/common/AnimatedReveal";

export default function AnalyticsReportsShowcase() {
  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

      {/* Screenshot */}

      <AnimatedReveal direction="left">
        <div>
          <Image
            src="/screenshots/platform/analytics-reports.png"
            alt="Analytics & Reports"
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

      {/* Content */}

      <AnimatedReveal direction="right">
        <div>
          <p className="text-[#F2A900] font-semibold uppercase tracking-[3px] text-sm">
            ANALYTICS & REPORTS
          </p>

          <h3 className="mt-4 text-3xl lg:text-5xl font-bold text-[#0B2E83] leading-tight">
            Turn Data Into Actionable Insights
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Access real-time analytics, campaign performance,
            redemption trends and merchant insights to make
            smarter business decisions.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Performance dashboards</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Campaign ROI analysis</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Merchant & customer insights</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Exportable reports</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Real-Time Analytics
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              ROI Tracking
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Business Intelligence
            </span>
          </div>
        </div>
      </AnimatedReveal>

    </div>
  );
}