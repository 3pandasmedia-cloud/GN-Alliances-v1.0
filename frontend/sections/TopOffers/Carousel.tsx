"use client";

import { motion } from "framer-motion";

interface CarouselProps<T> {
  items: T[];
  activeIndex: number;
  renderItem: (item: T) => React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
}

export default function Carousel<T>({
  items,
  activeIndex,
  renderItem,
  onPrev,
  onNext,
}: CarouselProps<T>) {
  const prev =
    items[(activeIndex - 1 + items.length) % items.length];

  const current = items[activeIndex];

  const next =
    items[(activeIndex + 1) % items.length];

  return (
    <div className="relative hidden h-[560px] overflow-hidden lg:flex items-center justify-center">

      {/* LEFT */}

      <motion.div
        layout
        onClick={onPrev}
        className="absolute left-[-140px] z-10 cursor-pointer"
        animate={{
          x: 0,
          scale: .74,
          rotateY: 48,
          opacity: .45,
        }}
        transition={{
          duration: .45,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "right center",
        }}
      >
        <div className="w-[700px]">
          {renderItem(prev)}
        </div>
      </motion.div>

      {/* CENTER */}

      <motion.div
        key={activeIndex}
        layout
        className="relative z-30 w-[980px]"
        animate={{
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: .45,
          ease: "easeInOut",
        }}
      >
        {renderItem(current)}
      </motion.div>

      {/* RIGHT */}

      <motion.div
        layout
        onClick={onNext}
        className="absolute right-[-140px] z-10 cursor-pointer"
        animate={{
          x: 0,
          scale: .74,
          rotateY: -48,
          opacity: .45,
        }}
        transition={{
          duration: .45,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
      >
        <div className="w-[700px]">
          {renderItem(next)}
        </div>
      </motion.div>

    </div>
  );
}