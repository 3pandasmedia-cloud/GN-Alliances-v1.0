import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";
import Link from "next/link";

import {
  Store,
  Tag,
  Megaphone,
  Gift,
  Receipt,
  BarChart3,
} from "lucide-react";

import {
  Landmark,
  Wallet,
  Users,
} from "lucide-react";

import {
  ShieldCheck,
  Lock,
  FileSearch,
  Database,
} from "lucide-react";

export default function PlatformPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/rewards-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/60 z-[1]" />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="order-2 lg:order-1">

              <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
                GN PLATFORM
              </p>

              <h1 className="mt-4 text-5xl lg:text-7xl font-bold">
                Unified Loyalty
                <br />
                Operations Platform
              </h1>

              <div className="w-24 h-1 bg-[#F2A900] rounded-full mt-6" />

              <p className="mt-8 text-lg text-slate-700 leading-relaxed">
                Manage merchants, campaigns, rewards,
                analytics and settlements through one
                centralized platform.
              </p>

              <Link
                href="/contact"
                className="
      inline-flex
      mt-10
      px-8
      py-4
      rounded-xl
      bg-[#0A2E8A]
      text-white
      font-semibold
    "
              >
                Request Demo
              </Link>

            </div>

            <div className="order-1 lg:order-2 lg:mt-44">
              <img
                src="/images/platform/platform-dashboard.png"
                alt="GN Platform Dashboard"
                className="
      w-full
      max-w-[600px]
      mx-auto
      lg:max-w-none
      drop-shadow-2xl
    "
              />
            </div>

          </div>

        </div>
      </section>

      {/* Architecture */}
      <section className="-mt-1 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
              ARCHITECTURE
            </p>

            <h2 className="text-5xl font-bold mt-4">
              One Platform. Multiple Stakeholders.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

            {[
              {
                icon: Landmark,
                title: "Banks",
              },
              {
                icon: Wallet,
                title: "FinTechs",
              },
              {
                icon: Store,
                title: "Merchants",
              },
              {
                icon: Users,
                title: "Customers",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-5
          md:p-8
          shadow-sm
          text-center
        "
                >
                  <Icon
                    size={40}
                    className="
            text-[#0A2E8A]
            mx-auto
            mb-4
          "
                  />

                  <h3
                    className="
            text-lg
            md:text-2xl
            font-bold
            text-[#0A2E8A]
          "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
              CAPABILITIES
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Platform Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

            {[
              {
                icon: Store,
                title: "Merchant Network",
              },
              {
                icon: Tag,
                title: "Offer Management",
              },
              {
                icon: Megaphone,
                title: "Campaign Engine",
              },
              {
                icon: Gift,
                title: "Rewards Engine",
              },
              {
                icon: Receipt,
                title: "Reconciliation",
              },
              {
                icon: BarChart3,
                title: "Analytics & Reporting",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-5
              md:p-8
              shadow-sm
              hover:shadow-xl
              transition-all
            "
                >
                  <Icon
                    size={40}
                    className="text-[#0A2E8A] mb-4"
                  />

                  <h3
                    className="
                text-lg
                md:text-2xl
                font-bold
                text-[#0A2E8A]
              "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Dashboard Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
              DASHBOARDS
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Platform Screens
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <img
              src="/images/platform/dashboard.png"
              alt="Dashboard"
              className="rounded-3xl shadow-xl"
            />

            <img
              src="/images/platform/analytics.png"
              alt="Analytics"
              className="rounded-3xl shadow-xl"
            />

          </div>

        </div>
      </section>

      {/* Security */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
              SECURITY
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Enterprise Grade Security
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

            {[
              {
                icon: ShieldCheck,
                title: "Secure Authentication",
              },
              {
                icon: Lock,
                title: "Role Based Access",
              },
              {
                icon: FileSearch,
                title: "Audit Logs",
              },
              {
                icon: Database,
                title: "Data Protection",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-5
          md:p-8
          shadow-sm
          text-center
        "
                >
                  <Icon
                    size={40}
                    className="
            text-[#0A2E8A]
            mx-auto
            mb-4
          "
                  />

                  <h3
                    className="
            text-lg
            md:text-xl
            font-bold
            text-[#0A2E8A]
          "
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A2E8A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-4xl lg:text-5xl font-bold">
            Ready To Transform Loyalty Operations?
          </h2>

          <p className="mt-6 text-lg text-white/90">
            Talk to our team about merchant partnerships,
            rewards programs and customer engagement solutions.
          </p>

          <Link
            href="/contact"
            className="inline-flex mt-10 px-8 py-4 rounded-xl bg-[#F2A900] text-white font-semibold"
          >
            Request Demo
          </Link>

        </div>
      </section>

      <Footer />
    </>
  );
}