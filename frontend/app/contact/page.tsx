import ContactHero from "@/sections/ContactHero/ContactHero";
import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold">
              Get In Touch
            </h2>

            <p className="mt-6 text-slate-600">
              We'd love to discuss your loyalty program,
              merchant partnerships and customer engagement goals.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}