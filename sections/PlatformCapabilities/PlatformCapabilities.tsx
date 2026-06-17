"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";
import Image from "next/image";

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function PlatformCapabilities() {

  const [activeModal, setActiveModal] = useState<
    "client" | "merchant" | null
  >(null);

  return (
    <Section id="platform">
      <Container>
        <div className="-mt-8"></div>

        <div className="text-center mb-16">
          <p className="text-[#F2A900] font-semibold uppercase tracking-[3px]">
            PLATFORM EXPERIENCE
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold mt-4">
            Built For Clients & Merchants
          </h2>

          <p className="text-slate-600 text-lg mt-6 max-w-4xl mx-auto leading-relaxed">
            One platform. Two powerful perspectives. Clients gain campaign
            visibility and merchant performance insights while merchants track
            offer performance, customer engagement and ROI through a unified
            loyalty operations ecosystem.
          </p>
        </div>

        <div className="hidden lg:grid group lg:grid-cols-2 gap-10">
          {/* CLIENT DASHBOARD */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="
              border border-slate-200
              rounded-3xl
              p-6
              bg-white
              shadow-sm
              transition-all
              duration-300
              opacity-100
              group-hover:opacity-50
              hover:!opacity-100
              hover:shadow-2xl
              hover:-translate-y-2
            "
          >
            <h3 className="text-2xl font-bold mb-2">
              Client Dashboard
            </h3>

            <p className="text-slate-500 mb-6">
              Built for MSMEs, Corporates, Banks, Fintechs and Enterprise
              Clients.
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/client-dashboard.png"
                alt="Client Dashboard"
                width={1200}
                height={700}
                className="w-full h-auto transition-transform duration-500 hover:scale-105"
              />
            </div>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>✓ Campaign Performance Analytics</li>
              <li>✓ Merchant Network Visibility</li>
              <li>✓ Real-Time Reporting</li>
              <li>✓ Spend & Redemption Insights</li>
              <li>✓ Reconciliation Tracking</li>
              <li>✓ Cross-Border Campaign Reporting</li>
            </ul>

            <button className="mt-6 px-5 py-2 rounded-xl bg-[#0A2E8A] text-white hover:bg-[#08246d] transition">
              Watch Client Workflow
            </button>
          </motion.div>

          {/* MERCHANT DASHBOARD */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="
              border border-slate-200
              rounded-3xl
              p-6
              bg-white
              shadow-sm
              transition-all
              duration-300
              opacity-100
              group-hover:opacity-50
              hover:!opacity-100
              hover:shadow-2xl
              hover:-translate-y-2
            "
          >
            <h3 className="text-2xl font-bold mb-2">
              Merchant Dashboard
            </h3>

            <p className="text-slate-500 mb-6">
              Built for leading retail, dining, fashion, lifestyle and service brands across India.
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/merchant-dashboard.png"
                alt="Merchant Dashboard"
                width={1200}
                height={700}
                className="w-full h-auto transition-transform duration-500 hover:scale-105"
              />
            </div>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>✓ Offer Performance Tracking</li>
              <li>✓ Customer Growth Analytics</li>
              <li>✓ Revenue Attribution</li>
              <li>✓ Settlement Monitoring</li>
              <li>✓ Campaign ROI Visibility</li>
              <li>✓ Real-Time Redemption Insights</li>
            </ul>

            <button className="mt-6 px-5 py-2 rounded-xl bg-[#0A2E8A] text-white hover:bg-[#08246d] transition">
              Watch Merchant Workflow
            </button>
          </motion.div>
        </div>

        {/* MOBILE VERSION */}
        <div className="lg:hidden space-y-5 -mt-10">
          <button
            onClick={() => setActiveModal("client")}
            className="w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center"
          >
            <h3 className="text-2xl font-bold text-[#0A2E8A]">
              For Clients
            </h3>

            <p className="text-slate-600 mt-3">
              Campaign visibility, reporting and reconciliation.
            </p>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#0A2E8A] text-white font-semibold">
                View Client Workflow →
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveModal("merchant")}
            className="w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center"
          >
            <h3 className="text-2xl font-bold text-[#0A2E8A]">
              For Merchants
            </h3>

            <p className="text-slate-600 mt-3">
              Offer performance, ROI and customer insights.
            </p>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#0A2E8A] text-white font-semibold">
                View Client Workflow →
              </span>
            </div>
          </button>
        </div>

        {activeModal && (
          <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-black text-2xl"
              >
                ✕
              </button>

              {activeModal === "client" ? (
                <>
                  <h3 className="text-2xl font-bold mb-4">
                    Client Dashboard
                  </h3>

                  <Image
                    src="/images/client-dashboard.png"
                    alt="Client Dashboard"
                    width={1200}
                    height={700}
                    className="rounded-2xl border border-slate-200"
                  />

                  <ul className="mt-6 space-y-3 text-slate-700">
                    <li>✓ Campaign Performance Analytics</li>
                    <li>✓ Merchant Network Visibility</li>
                    <li>✓ Real-Time Reporting</li>
                    <li>✓ Spend & Redemption Insights</li>
                    <li>✓ Reconciliation Tracking</li>
                    <li>✓ Cross-Border Campaign Reporting</li>
                  </ul>

                  <button className="mt-4 w-full px-6 py-4 rounded-xl bg-[#0A2E8A] text-white font-semibold shadow-lg hover:bg-[#08246d] transition-all">
                    Watch Client Workflow
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-4">
                    Merchant Dashboard
                  </h3>

                  <Image
                    src="/images/merchant-dashboard.png"
                    alt="Merchant Dashboard"
                    width={1200}
                    height={700}
                    className="rounded-2xl border border-slate-200"
                  />

                  <ul className="mt-6 space-y-3 text-slate-700">
                    <li>✓ Offer Performance Tracking</li>
                    <li>✓ Customer Growth Analytics</li>
                    <li>✓ Revenue Attribution</li>
                    <li>✓ Settlement Monitoring</li>
                    <li>✓ Campaign ROI Visibility</li>
                    <li>✓ Real-Time Redemption Insights</li>
                  </ul>

                  <button className="mt-8 w-full px-6 py-4 rounded-xl bg-[#0A2E8A] text-white font-semibold shadow-lg hover:bg-[#08246d] transition-all">
                    Watch Merchant Workflow
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </Container>
    </Section>
  );
}