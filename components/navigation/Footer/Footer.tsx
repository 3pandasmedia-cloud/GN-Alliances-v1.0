import Container from "@/components/common/Container/Container";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-5">
      <Container>
        <div className="py-10">

          {/* ================= Desktop Footer ================= */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-10">

            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/logos/gn-logoa.png"
                alt="GN Alliances"
                width={300}
                height={300}
                className="h-52 w-auto object-contain -mt-10"
              />
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">
                Company
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact Us</li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="font-semibold mb-4">
                Solutions
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>Merchant Management</li>
                <li>Offer Management</li>
                <li>Campaign Management</li>
                <li>Reconciliation</li>
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
                <li>Integrations</li>
                <li>API</li>
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
            <div className="flex justify-center mb-8">
              <Image
                src="/logos/gn-logoa.png"
                alt="GN Alliances"
                width={220}
                height={220}
                className="h-28 w-auto object-contain"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-center">

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-3">
                  Company
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact Us</li>
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

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Features</li>
                  <li>Security</li>
                  <li>Integrations</li>
                  <li>API</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold mb-3">
                  Get In Touch
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>hello@gnalliances.com</li>
                  <li>+91 97197 27347</li>
                  <li>Bangalore, India</li>
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
                <a
                  href="#"
                  className="hover:text-[#0B2E83] transition"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="hover:text-[#0B2E83] transition"
                >
                  Terms Of Use
                </a>
              </div>

              {/* Center */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  Marketed By
                </span>

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
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  © 2026 GN Alliances. All rights reserved.
                </p>
              </div>

            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center gap-4">

              <div className="flex gap-5 text-sm text-gray-500">
                <a href="#">
                  Privacy Policy
                </a>

                <a href="#">
                  Terms Of Use
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Marketed By
                </span>

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