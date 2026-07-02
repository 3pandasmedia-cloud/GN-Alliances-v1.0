import AboutHero from "@/sections/AboutHero/AboutHero";
import Founders from "@/sections/AboutHero/Founders";
import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>

        <AboutHero />

        {/* Our Story */}
        <section className="py-24 bg-white">
          ...
        </section>

        <Founders />

        {/* Mission & Vision */}
        <section className="py-24 bg-white">
          ...
        </section>

        <Footer />

      </main>
      </>

      );
}