"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type Props = {
  icon: string;
  label: string;
  end?: number;
  suffix?: string;
  custom?: string;
};

export default function MetricCard({
  icon,
  label,
  end,
  suffix,
  custom,
}: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-8 px-6 text-center"
    >
      <Image
        src={icon}
        alt={label}
        width={44}
        height={44}
        className="mb-4 object-contain"
      />

      <h3 className="text-[#0B2E83] text-5xl font-bold leading-none mb-3">
        {custom ? (
          custom
        ) : (
          <>
            {inView && (
              <CountUp
                start={0}
                end={end || 0}
                duration={2}
                suffix={suffix}
              />
            )}
          </>
        )}
      </h3>

      <p className="text-[#18214D] text-lg font-medium">
        {label}
      </p>
    </div>
  );
}