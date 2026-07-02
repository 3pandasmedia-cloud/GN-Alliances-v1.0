import Link from "next/link";
import Image from "next/image";
import Header from "@/components/navigation/Header/Header";
import Footer from "@/components/navigation/Footer/Footer";

type Feature = {
    title: string;
    text: string;
};

type Props = {
    title: string;
    description: string;
    image: string;

    overviewTitle?: string;
    overviewText?: string;

    benefits: string[];

    features: {
        title: string;
        text: string;
    }[];
};

export default function SolutionTemplate({
    title,
    description,
    image,
    overviewTitle,
    overviewText,
    benefits,
    features,
}: Props) {
    return (
        <>
            <Header />

            {/* Hero */}
            <section
                className="relative overflow-hidden bg-white"
                style={{
                    backgroundImage: "url('/images/rewards-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-white/60 z-[1]" />

                <div
                    className="
    absolute
    bottom-0
    left-0
    right-0
    h-40
    bg-gradient-to-b
    from-transparent
    to-white
    z-[2]
  "
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

                    <img
                        src={image}
                        alt={title}
                        className="
        w-full
        max-w-6xl
        mx-auto
        rounded-3xl
        shadow-2xl
      "
                    />

                </div>
            </section>

            {/* Features */}
            {overviewTitle && (
                <section className="relative z-20 -mt-20 md:-mt-32 lg:-mt-30 py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">

                        <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
                            OVERVIEW
                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4">
                            {overviewTitle}
                        </h2>

                        <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                            {overviewText}
                        </p>

                    </div>
                </section>
            )}

            {/* Benefits */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
                            Benefits
                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4">
                            Why Choose GN Alliances
                        </h2>
                    </div>

                    <div
                        className="
    max-w-6xl
    mx-auto
    px-6
    text-center
    bg-white
    rounded-3xl
    shadow-xl
    p-12
  "
                    >
                        <ul className="space-y-5">
                            {benefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-start gap-3 text-lg text-slate-700"
                                >
                                    <span className="text-green-600 font-bold">✓</span>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0A2E8A] text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold">
                        Ready To Launch Your Next Loyalty Initiative?
                    </h2>

                    <p className="mt-6 text-lg text-white/90">
                        Talk to our team about merchant partnerships,
                        rewards programs, and customer engagement solutions.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex mt-10 px-8 py-4 rounded-xl bg-[#F2A900] text-white font-semibold hover:opacity-90 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}