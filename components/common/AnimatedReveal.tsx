"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
};

export default function AnimatedReveal({
  children,
  direction = "left",
}: Props) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        initial={{
          opacity: 0,
          x: direction === "left" ? -80 : 80,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}