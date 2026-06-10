"use client";

import { useState, useEffect } from "react";
import Container from "@/components/common/Container/Container";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RequestDemoModal from "@/components/modals/RequestDemoModal";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`
                    fixed
                    top-0
                    left-0
                    right-0
                    z-50
                    transition-all
                    duration-500
                    ${scrolled
                        ? `
                            bg-white/1
                            backdrop-blur-2xl
                            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                            border-b border-white/30
                        `
                        : `
                            bg-transparent
                        `
                    }
                `}
            >
                <Container>
                    <div
                        className={`
                            flex
                            items-center
                            justify-between
                            transition-all
                            duration-300
                            px-2 lg:px-0
                            ${scrolled
                                ? "h-[70px] lg:h-[78px]"
                                : "h-[80px] lg:h-[130px]"
                            }
                        `}
                    >

                        {/* Logo */}

                        <Link href="/">
                            <Image
                                src="/logos/gn-logoa.png"
                                alt="GN Alliances"
                                width={220}
                                height={120}
                                className={`
    w-auto
    transition-all
    duration-300

    ml-[-4px]
    md:ml-5

    ${scrolled
                                        ? `
            h-[60px]
            md:h-[75px]
            xl:h-[68px]
          `
                                        : `
            h-[75px]
            md:h-[95px]
            lg:h-[105px]
            xl:h-[150px]
          `
                                    }
`}
                            />
                        </Link>

                        {/* Desktop Navigation */}

                        <nav
                            className="
                                hidden xl:flex
                                items-center
                                gap-12
                                text-[17px]
                                font-medium
                                text-[#111827]
                            "
                        >
                            <a
                                href="#"
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    hover:text-[#0B2E83]
                                "
                            >
                                Solutions
                                <ChevronDown size={16} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-[#0B2E83]"
                            >
                                Platform
                            </a>

                            <a
                                href="#"
                                className="hover:text-[#0B2E83]"
                            >
                                Who We Work With
                            </a>

                            <a
                                href="#"
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    hover:text-[#0B2E83]
                                "
                            >
                                Resources
                                <ChevronDown size={16} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-[#0B2E83]"
                            >
                                About Us
                            </a>

                            <a
                                href="#"
                                className="hover:text-[#0B2E83]"
                            >
                                Contact
                            </a>
                        </nav>

                        {/* Desktop CTA Buttons */}

                        <div className="hidden xl:flex items-center gap-4">

                            <Link
                                href="/login"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    h-14
                                    px-8
                                    rounded-xl
                                    border
                                    border-[#E3A008]
                                    text-[#E3A008]
                                    font-semibold
                                    text-[17px]
                                    hover:bg-[#E3A008]
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                            >
                                Login
                            </Link>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    bg-[#E3A008]
                                    text-white
                                    px-8
                                    h-14
                                    rounded-xl
                                    font-semibold
                                    text-[17px]
                                    hover:bg-[#d29500]
                                    transition-all
                                    duration-300
                                "
                            >
                                Request Demo
                                <span className="text-xl">›</span>
                            </button>

                        </div>

                        {/* Mobile Menu */}

                        <button
                            className="xl:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={32} />
                        </button>

                    </div>
                </Container>
            </header>

            {/* Request Demo Modal */}

            <RequestDemoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Mobile Drawer */}

            {mobileOpen && (
                <div className="fixed inset-0 z-[999]">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />

                    <div
                        className="
                            absolute
                            right-0
                            top-0
                            h-full
                            w-72
                            bg-white
                            p-6
                            shadow-xl
                        "
                    >

                        <div className="flex items-center justify-between mb-10">

                            <h3 className="font-bold text-lg">
                                Menu
                            </h3>

                            <button
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl"
                            >
                                ✕
                            </button>

                        </div>

                        <nav className="flex flex-col gap-6 text-[16px] font-medium">

                            <a href="#">Solutions</a>

                            <a href="#">Platform</a>

                            <a href="#">Who We Work With</a>

                            <a href="#">Resources</a>

                            <a href="#">About Us</a>

                            <a href="#">Contact</a>

                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="
                                    mt-2
                                    border
                                    border-[#E3A008]
                                    text-[#E3A008]
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    text-center
                                "
                            >
                                Login
                            </Link>

                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    setIsModalOpen(true);
                                }}
                                className="
                                    bg-[#E3A008]
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                "
                            >
                                Request Demo
                            </button>

                        </nav>

                    </div>

                </div>
            )}
        </>
    );
}