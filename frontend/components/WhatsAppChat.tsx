"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWebsiteContent } from "@/components/WebsiteContent";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppChat() {
  const pathname = usePathname();
  const { whatsapp, cta } = useWebsiteContent();
  if (pathname.startsWith("/platform/") || pathname === "/platform" || pathname.startsWith("/login") || !cta.chatLabel) return null;
  const href = whatsappLink(whatsapp.number, whatsapp.message);
  return <a href={href || "/contact"} target={href ? "_blank" : undefined} rel="noopener noreferrer"
    aria-label={href ? `${cta.chatLabel} on WhatsApp` : cta.chatLabel}
    className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#087f47] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#066b3c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 sm:right-6">
    <MessageCircle size={22} aria-hidden="true"/><span>{cta.chatLabel}</span>
  </a>;
}
