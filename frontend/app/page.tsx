// EDIT GUIDE: Homepage section order/visibility. Saved text is managed in Website Settings; see docs/EDITING_GUIDE.md.
"use client";

import { useWebsiteContent } from "@/components/WebsiteContent";
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
import TopOffers from "@/sections/TopOffers";

export default function Home() {
  const {sections}=useWebsiteContent();
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

      {sections.hero && <Hero />}

      {sections.trusted && <TrustedBusinesses />}

      {sections.offers && <TopOffers />}

      {sections.how && <HowItWorks />}

      {sections.benefits && <Benefits />}

      {sections.platform && <PlatformCapabilities />}

      {sections.why && <WhyGN />}

      {sections.metrics && <Metrics />}

      {sections.cta && <CTA />}

      <Footer />

    </>
  );
}