"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/common/AnimatedReveal";

export default function DashboardShowcase() {
    return (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

            {/* Screenshot */}

            <AnimatedReveal direction="left">
                <Image
                    src="/screenshots/platform/dashboard.png"
                    alt="Dashboard"
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
            </AnimatedReveal>

            {/* Content */}

            <AnimatedReveal direction="right">
                <div>
                    <p className="text-[#F2A900] font-semibold uppercase tracking-[3px] text-sm">
                        DASHBOARD
                    </p>

                    <h3 className="mt-4 text-3xl lg:text-5xl font-bold text-[#0B2E83] leading-tight">
                        Your Loyalty Operations Command Center
                    </h3>

                    <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                        Get a complete view of campaigns, merchants, offers,
                        redemptions, payouts and performance metrics from one
                        centralized dashboard.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-green-600">✓</span>
                            <span>Real-time campaign tracking</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-600">✓</span>
                            <span>Merchant performance insights</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-600">✓</span>
                            <span>Redemption analytics</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-600">✓</span>
                            <span>Settlement visibility</span>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
                            Merchant Network
                        </span>

                        <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
                            Campaign Automation
                        </span>

                        <span className="px-4 py-2 rounded-full bg-[#0B2E83]/10 text-[#0B2E83] text-sm font-medium">
                            Real-Time Insights
                        </span>
                    </div>
                </div>
            </AnimatedReveal>

        </div>
    );
}