import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-5">
      <Container>
        <div className="py-10">

          {/* ================= Desktop Footer ================= */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-12 items-start">

            {/* Logo */}
            <div className="flex justify-center lg:justify-start lg:-mt-4">
              <Image
                src="/logos/gn-logoa.png"
                alt="GN Alliances"
                width={300}
                height={300}
                className="h-36 w-auto object-contain"
              />
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">
                Company
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#0A2E8A] transition"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#0A2E8A] transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-4">
                Solutions
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>
                  <Link href="/solutions/merchant-funded-offers">
                    Merchant Funded Offers
                  </Link>
                </li>

                <li>
                  <Link href="/solutions/rewards-programs">
                    Rewards Programs
                  </Link>
                </li>

                <li>
                  <Link href="/solutions/campaign-management">
                    Campaign Management
                  </Link>
                </li>

                <li>
                  <Link href="/solutions/reconciliation">
                    Reconciliation & Settlements
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold mb-4">
                Platform
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>Features</li>
                <li>Security</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">
                Get In Touch
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>hello@gnalliances.com</li>
                <li>+91 97197 27347</li>
                <li>Bangalore, India</li>
              </ul>
            </div>

          </div>

          {/* ================= Mobile Footer ================= */}
          <div className="lg:hidden">

            {/* Logo */}
            <Link href="/">
              <Image
                src="/logos/gn-logoa.png"
                alt="GN Alliances"
                width={300}
                height={300}
                className="h-28 w-auto object-contain mx-auto"
              />
            </Link>

            {/* Grid */}
            <div className="space-y-8 text-center">

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-3">
                  Company
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-[#0A2E8A] transition"
                    >
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-[#0A2E8A] transition"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="font-semibold mb-3">
                  Solutions
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Merchant Management</li>
                  <li>Offer Management</li>
                  <li>Campaign Management</li>
                  <li>Reconciliation</li>
                </ul>
              </div>

              {/* Platform */}
              <div>
                <h3 className="font-semibold mb-3">
                  Platform
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li><Link href="/platform">Features</Link></li>
                  <li><Link href="/platform">Security</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="col-span-2 text-center">
                <h3 className="font-semibold mb-3">
                  Get In Touch
                </h3>

                <ul className="space-y-3 text-gray-600">
                  <li>
                    <a href="mailto:hello@gnalliances.com">
                      hello@gnalliances.com
                    </a>
                  </li>

                  <li>
                    <a href="tel:+919719727347">
                      +91 97197 27347
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://maps.google.com/?q=Bangalore,India"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bangalore, India
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ================= Bottom Footer ================= */}
          <div className="mt-8 pt-6 border-t">

            {/* Desktop */}
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">

              {/* Left */}
              <div className="flex gap-6 text-sm text-gray-500">
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>

                <Link href="/terms-of-use">
                  Terms Of Use
                </Link>
              </div>

              {/* Center */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  Marketed By
                </span>

                <Link
                  href="https://www.3pandasmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <Image
                    src="/logos/3pandas-logos.png"
                    alt="3Pandas Media"
                    width={150}
                    height={150}
                    className="w-14 h-auto object-contain"
                  />

                  <span className="text-sm text-gray-600 font-medium">
                    3Pandas Media
                  </span>
                </Link>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  © 2026 GN Alliances. All rights reserved.
                </p>
              </div>

            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center gap-5 text-center">

              <div className="flex gap-5 text-sm text-gray-500">
                <a href="#">
                  Privacy Policy
                </a>

                <a href="#">
                  Terms Of Use
                </a>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  Marketed By
                </span>

                <Link
                  href="https://www.3pandasmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <Image
                    src="/logos/3pandas-logos.png"
                    alt="3Pandas Media"
                    width={120}
                    height={120}
                    className="w-12 h-auto object-contain"
                  />

                  <span className="text-sm text-gray-600 font-medium">
                    3Pandas Media
                  </span>
                </Link>
              </div>

              <p className="text-center text-sm text-gray-500">
                © 2026 GN Alliances. All rights reserved.
              </p>

            </div>

          </div>

        </div>
      </Container>
    </footer>
  );
}