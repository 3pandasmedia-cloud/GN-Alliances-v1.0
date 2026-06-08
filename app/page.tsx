"use client";

import { useEffect, useState } from "react";

import SplashScreen from "@/components/common/SplashScreen";
import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";

import Hero from "@/sections/Hero/Hero";
import HowItWorks from "@/sections/HowItWorks/HowItWorks";
import Benefits from "@/sections/Benefits/Benefits";
import PlatformCapabilities from "@/sections/PlatformCapabilities/PlatformCapabilities";
import WhyGN from "@/sections/WhyGN/WhyGN";
import Metrics from "@/sections/Metrics/Metrics";
import CTA from "@/sections/CTA/CTA";
import TrustedBusinesses from "@/sections/TrustedBusinesses/TrustedBusinesses";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />

      <Hero />

      <TrustedBusinesses />

      <HowItWorks />

      <Benefits />

      <PlatformCapabilities />

      <WhyGN />

      <Metrics />

      <CTA />

      <Footer />
    </>
  );
}