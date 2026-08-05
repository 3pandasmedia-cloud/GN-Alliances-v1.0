"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import OffersList from "./OffersList";

export default function LandingOffersPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#0A2E8A]">
            Landing Offers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage homepage offer banners.
          </p>
        </div>

        <Link
          href="/platform/super-admin/landing-offers/new"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#F2A900]
            px-5
            py-3
            font-semibold
            text-white
            hover:opacity-90
          "
        >
          <Plus size={18} />
          Add Offer
        </Link>

      </div>

      <OffersList />

    </div>
  );
}