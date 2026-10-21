"use client";
import { authFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import OfferCard from "./OfferCard";



export default function OffersList() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOffers = async () => {
    try {
      const res = await authFetch(
        "/landing-offers"
      );

      const data = await res.json();

      setOffers(data);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        Loading offers...
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="rounded-2xl border bg-white py-24 text-center">

        <h3 className="text-2xl font-bold text-slate-700">
          No Landing Offers
        </h3>

        <p className="mt-2 text-slate-500">
          Click "Add Offer" to create your first banner.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {offers.map((offer) => (

        <OfferCard
          key={offer.id}
          offer={offer}
        />

      ))}

    </div>
  );
}