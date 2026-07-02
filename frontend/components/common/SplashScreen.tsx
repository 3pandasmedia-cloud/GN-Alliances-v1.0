"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      setShow(false);
    }, 2500);

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            fixed
            inset-0
            h-screen
            w-full
            z-[999999]
            overflow-hidden
          "
        >
          {/* Desktop Background */}

          <Image
            src="/images/splash/gn-splash-bg1.png"
            alt="GN Alliances Splash Desktop"
            fill
            priority
            className="
              hidden
              md:block
              object-cover
              object-center
              select-none
            "
          />

          {/* Mobile Background */}

          <Image
            src="/images/splash/gn-splash-mobile.png"
            alt="GN Alliances Splash Mobile"
            fill
            priority
            className="
              md:hidden
              object-cover
              object-center
              select-none
            "
          />

          {/* Soft Overlay */}

          <div className="absolute inset-0 bg-white/10" />

          {/* Center Glow */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-[220px]
                h-[220px]

                md:w-[420px]
                md:h-[420px]

                lg:w-[650px]
                lg:h-[650px]

                rounded-full
                bg-white/40
                blur-[120px]
              "
            />
          </div>

          {/* Main Content */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {/* Rotating Circle */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="
                absolute
                flex
                items-center
                justify-center
                -translate-y-32

md:-translate-y-8

lg:translate-y-0
              "
            >
              <Image
                src="/images/ecosystem/circlesss.png"
                alt="Circle Animation"
                width={900}
                height={900}
                priority
                className="
  w-[320px]
  sm:w-[420px]

  md:w-[600px]

  lg:w-[700px]

  xl:w-[900px]

  h-auto
  opacity-30
  select-none
"
              />
            </motion.div>

            {/* GN Ecosystem Logo */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: {
                  duration: 1,
                },
                scale: {
                  duration: 1,
                },
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
              }}
              className="
                relative
                z-10
                flex
                items-center
                justify-center
                -translate-y-32

md:-translate-y-8

lg:translate-y-0
              "
            >
              <Image
                src="/images/ecosystem/gn-ecosystem.png"
                alt="GN Alliances"
                width={950}
                height={950}
                priority
                className="
  w-[300px]

  sm:w-[360px]

  md:w-[520px]

  lg:w-[620px]

  xl:w-[600px]

  h-auto
  object-contain
  select-none
  drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]
"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}