"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL || "/api";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface LandingOffer {
  id: string;
  title: string;
  banner: string;
  destinationUrl: string;
}

export default function LandingOffers() {
  const [offers, setOffers] = useState<LandingOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const res = await fetch(
        `${API}/landing-offers/public`
      );

      const data = await res.json();

      setOffers(data);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  if (offers.length === 0) return null;

  return (
    <section className="w-full">

      {offers.map((offer) => {

        const image =
          offer.banner.startsWith("http")
            ? offer.banner
            : `${BACKEND}${offer.banner}`;

        return (

          <a
            key={offer.id}
            href={offer.destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >

            <img
              src={image}
              alt={offer.title}
              className="w-full rounded-2xl object-cover"
            />

          </a>

        );

      })}

    </section>
  );
}