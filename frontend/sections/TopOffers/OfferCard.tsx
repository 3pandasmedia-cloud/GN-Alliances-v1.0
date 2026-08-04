// sections/TopOffers/OfferCard.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Offer } from "./offers";

interface OfferCardProps {
    offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: .3 }}
            className="rounded-[28px]"
        >
            <div className="relative w-full">
                <Image
                    src={offer.image}
                    alt={offer.merchant}
                    width={1100}
                    height={620}
                    className="w-full rounded-3xl"
                    priority
                />
            </div>
        </motion.div>
    );
}