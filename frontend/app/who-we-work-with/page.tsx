import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";

import {
  Building2,
  Landmark,
  Store,
  CreditCard,
  Briefcase,
  Wallet,
} from "lucide-react";

export default function WhoWeWorkWithPage() {
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 lg:pt-52 pb-40">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Mobile Image First */}
            <div className="order-1 lg:order-2">
              <img
                src="/images/who-we-work-with/who-we-work-with.png"
                alt="GN Alliances Ecosystem"
                className="
          w-full
          rounded-3xl
          shadow-2xl
        "
              />
            </div>

            {/* Text */}
            <div className="order-2 lg:order-1">

              <p className="uppercase tracking-[4px] text-[#F2A900] font-semibold">
                WHO WE WORK WITH
              </p>

              <h1
                className="
          mt-4
          text-[42px]
          md:text-6xl
          lg:text-7xl
          font-bold
          leading-[1.05]
        "
              >
                Built For Every
                <br />
                Loyalty Ecosystem
              </h1>

              <div className="w-24 h-1 bg-[#F2A900] rounded-full mt-6" />

              <p
                className="
          mt-8
          text-lg
          text-slate-700
          leading-relaxed
          max-w-xl
        "
              >
                GN Alliances connects banks, fintechs,
                merchants, retail brands and payment
                networks through a unified loyalty
                platform that drives customer engagement,
                rewards and measurable business growth.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Industries */}
      <section className="-mt-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
              INDUSTRIES
            </p>

            <h2
              className="
    text-4xl
    md:text-5xl
    font-bold
    mt-4
  "
            >
              Trusted Across Multiple Sectors
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

            {[
              {
                icon: Landmark,
                title: "Banks",
                text: "Increase cardholder engagement through merchant-funded offers and rewards.",
              },
              {
                icon: Wallet,
                title: "FinTechs",
                text: "Launch customer acquisition and retention campaigns faster.",
              },
              {
                icon: Briefcase,
                title: "Enterprises",
                text: "Build employee and customer loyalty ecosystems.",
              },
              {
                icon: Store,
                title: "Merchants",
                text: "Drive footfall, transactions and customer retention.",
              },
              {
                icon: Building2,
                title: "Retail Brands",
                text: "Create targeted promotions and personalized campaigns.",
              },
              {
                icon: CreditCard,
                title: "Payment Networks",
                text: "Expand partnerships and deliver value-added programs.",
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
rounded-2xl
p-4
md:p-8
"
                >
                  <Icon
                    size={40}
                    className="text-[#0A2E8A] mb-6"
                  />

                  <h3 className="text-lg md:text-2xl font-bold text-[#0A2E8A]">
                    {item.title}
                  </h3>

                  <p className="mt-2 md:mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
              ECOSYSTEM
            </p>

            <h2
              className="
    text-4xl
    md:text-5xl
    font-bold
    mt-4
  "
            >
              Connecting Every Stakeholder
            </h2>
          </div>

          <div className="flex flex-col items-center gap-8">

            <div className="bg-white rounded-3xl px-12 py-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0A2E8A]">
                Banks
              </h3>
            </div>

            <div className="text-4xl text-[#F2A900]">↓</div>

            <div className="
  bg-[#0A2E8A]
  text-white
  rounded-3xl
  px-8
  md:px-12
  py-8
  shadow-xl
">
              <h3 className="text-3xl font-bold">
                GN Alliances Platform
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">

              <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold text-[#0A2E8A]">
                  Merchants
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
                <h3 className="text-2xl font-bold text-[#0A2E8A]">
                  FinTechs
                </h3>
              </div>

            </div>

            <div className="text-4xl text-[#F2A900]">↓</div>

            <div className="bg-white rounded-3xl px-12 py-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0A2E8A]">
                Customers
              </h3>
            </div>

          </div>

        </div>
      </section>

      {/* Metrics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
              IMPACT
            </p>

            <h2
              className="
    text-4xl
    md:text-5xl
    font-bold
    mt-4
  "
            >
              Driving Loyalty At Scale
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

            {[
              { number: "500+", label: "Merchant Partners" },
              { number: "50+", label: "Active Campaigns" },
              { number: "1M+", label: "Customers Reached" },
              { number: "100%", label: "Platform Availability" },
            ].map((item) => (
              <div
                key={item.label}
                className="
    bg-slate-50
    rounded-2xl
    p-5
    md:p-10
    text-center
  "
              >
                <h3
                  className="
    text-3xl
    md:text-5xl
    font-bold
    text-[#0A2E8A]
  "
                >
                  {item.number}
                </h3>

                <p className="mt-2 md:mt-4 text-sm md:text-base text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A2E8A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="
  text-3xl
  md:text-4xl
  lg:text-5xl
  font-bold
">
            Ready To Grow Your Loyalty Ecosystem?
          </h2>

          <p className="mt-6 text-lg text-white/90">
            Partner with GN Alliances to connect customers,
            merchants and loyalty programs through one
            powerful platform.
          </p>

          <a
            href="/contact"
            className="
              inline-flex
              mt-10
              px-8
              py-4
              rounded-xl
              bg-[#F2A900]
              text-white
              font-semibold
            "
          >
            Request Demo
          </a>

        </div>
      </section>

      <Footer />
    </>
  );
}