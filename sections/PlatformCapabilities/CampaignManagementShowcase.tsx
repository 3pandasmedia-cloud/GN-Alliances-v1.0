"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/common/AnimatedReveal";

export default function CampaignManagementShowcase() {
  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">

      {/* Content */}

      <AnimatedReveal direction="left">
        <div className="order-2 lg:order-1">
          <p className="text-[#F2A900] font-semibold uppercase tracking-[3px] text-sm">
            CAMPAIGN MANAGEMENT
          </p>

          <h3 className="mt-4 text-3xl lg:text-5xl font-bold text-[#0B2E83] leading-tight">
            Launch & Monitor Campaigns With Confidence
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Create, schedule and manage large-scale loyalty campaigns
            across multiple merchants while monitoring performance in
            real time.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Campaign creation & scheduling</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Multi-merchant campaign execution</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Approval & governance workflows</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600">✓</span>
              <span>Live campaign monitoring</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Campaign Builder
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Workflow Automation
            </span>

            <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
              Performance Tracking
            </span>
          </div>
        </div>
      </AnimatedReveal>

      {/* Screenshot */}

      <AnimatedReveal direction="right">
        <div className="order-1 lg:order-2">
          <Image
            src="/screenshots/platform/campaign-management.png"
            alt="Campaign Management"
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