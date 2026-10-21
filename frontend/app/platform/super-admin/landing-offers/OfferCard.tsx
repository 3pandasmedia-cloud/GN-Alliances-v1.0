"use client";
import { popup } from "@/components/ui/Popup";


import EntityActions from "@/components/auth/EntityActions";
import {
  ExternalLink,
  Link2Off,
} from "lucide-react";
import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  Pencil,
  Trash2,
} from "lucide-react";

interface OfferCardProps {
  offer: any;
}

export default function OfferCard({
  offer,
}: OfferCardProps) {

  const deleteOffer = async () => {
    const confirmed = await popup.confirm(
      "Are you sure you want to delete this landing offer?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `/api/landing-offers/${offer.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        await popup.alert(data.message || "Failed to delete.");
        return;
      }

      await popup.alert("Offer deleted successfully!");

      window.location.reload();

    } catch (err) {
      console.error(err);
      await popup.alert("Server error.");
    }
  };

  const BACKEND =
    process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const imageUrl =
    offer.banner?.startsWith("http")
      ? offer.banner
      : `${BACKEND}${offer.banner}`;


  return (
    <div className="flex min-h-[170px] overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-lg transition">

      {/* Banner */}

      <div className="flex h-[170px] w-[280px] shrink-0 items-center justify-center overflow-hidden rounded-l-2xl border-r bg-slate-50 p-4">

        <img
          src={imageUrl}
          alt={offer.title}
          className="
      max-h-full
      max-w-full
      rounded-lg
      object-contain
      shadow-sm
    "
        />

      </div>

      {/* Content */}

      <div className="flex flex-1 items-center justify-between p-6">
        {/* Left */}

        <div className="min-w-0 flex-1 space-y-5">

          <div>

            <h3 className="text-2xl font-bold text-[#0A2E8A]">
              {offer.title}
            </h3>

            <p className="mt-1 text-slate-500">
              {offer.merchantName}
            </p>

          </div>

          <div className="flex gap-10">

            <div>
              <p className="text-xs text-slate-500">
                Clicks
              </p>

              <p className="font-semibold">
                {offer.clicks}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Start Date
              </p>

              <p className="font-semibold">
                {new Date(offer.startDate).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                End Date
              </p>

              <p className="font-semibold">
                {new Date(offer.endDate).toLocaleDateString("en-IN")}
              </p>
            </div>

          </div>

          {offer.destinationUrl ? (
            <a
              href={offer.destinationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <ExternalLink size={14} />
              Open Link
            </a>
          ) : (
            <span className="flex items-center gap-1 text-sm text-slate-400">
              <Link2Off size={14} />
              Not Linked
            </span>
          )}

        </div>

        {/* Right */}

        <div className="flex w-[180px] shrink-0 flex-col items-end justify-between self-stretch">

          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${offer.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {offer.status}
          </span>

          <div className="flex gap-3">

            <EntityActions><Link
              href={`/platform/super-admin/landing-offers/${offer.id}`}
              className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            hover:bg-slate-50
          "
            >
              <Pencil size={16} />
              Edit
            </Link></EntityActions>

            <EntityActions><button
              onClick={deleteOffer}
              className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-300
            px-4
            py-2
            text-red-600
            hover:bg-red-50
          "
            >
              <Trash2 size={16} />
              Delete
            </button></EntityActions>

          </div>

        </div>

      </div>

    </div>
  );
}