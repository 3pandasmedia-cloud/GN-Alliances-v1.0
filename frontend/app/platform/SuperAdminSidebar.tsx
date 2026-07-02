"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Gift,
  BarChart3,
  Wallet,
  Settings,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Building2,
} from "lucide-react";

const menuItems = [
  {
    title: "Campaigns",
    icon: Megaphone,
    href: "/platform/super-admin/campaigns",
  },
  {
    title: "Offers",
    icon: Gift,
    href: "/platform/super-admin/offers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/platform/super-admin/analytics",
  },
  {
    title: "Reconciliation",
    icon: Wallet,
    href: "/platform/super-admin/reconciliation",
  },
  {
    title: "Admins",
    icon: ShieldCheck,
    href: "/platform/super-admin/admins",
  },
  {
    title: "Employees",
    icon: Users,
    href: "/platform/super-admin/employees",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/platform/super-admin/settings",
  },
];

type SidebarProps = {
  onLinkClick?: () => void;
};

export default function AdminSidebar({
  onLinkClick,
}: SidebarProps) {
  const [clientsOpen, setClientsOpen] =
    useState(true);

  return (
    <aside
      className="
        w-[280px]
        h-screen
        bg-[#041B57]
        text-white
        flex
        flex-col
      "
    >
      {/* Logo */}

      <div className="px-8 py-8 border-b border-white/10">
        <Image
          src="/logos/gn-logo-white.png"
          alt="GN"
          width={180}
          height={80}
        />
      </div>

      {/* Menu */}

      <div className="flex-1 py-6 overflow-y-auto">

        {/* Dashboard */}

        <Link
          href="/platform/super-admin"
          onClick={onLinkClick}
          className="
            flex
            items-center
            gap-4
            px-8
            py-4
            hover:bg-[#1847B8]
            transition
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Clients */}

        <button
          onClick={() =>
            setClientsOpen(!clientsOpen)
          }
          className="
            w-full
            flex
            items-center
            justify-between
            px-8
            py-4
            hover:bg-[#1847B8]
            transition
          "
        >
          <div className="flex items-center gap-4">
            <Building2 size={20} />
            <span>Clients</span>
          </div>

          {clientsOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {clientsOpen && (
          <div className="ml-14 mb-3 space-y-1">

            <Link
              href="/platform/super-admin/merchants"
              onClick={onLinkClick}
              className="
                block
                py-2
                text-sm
                text-white/80
                hover:text-white
              "
            >
              Merchants
            </Link>

            <Link
              href="/platform/super-admin/clients/banks"
              onClick={onLinkClick}
              className="
                block
                py-2
                text-sm
                text-white/80
                hover:text-white
              "
            >
              Banks
            </Link>

            <Link
              href="/platform/super-admin/clients/fintechs"
              onClick={onLinkClick}
              className="
                block
                py-2
                text-sm
                text-white/80
                hover:text-white
              "
            >
              FinTechs
            </Link>

          </div>
        )}

        {/* Remaining Menu */}

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onLinkClick}
              className="
                flex
                items-center
                gap-4
                px-8
                py-4
                hover:bg-[#1847B8]
                transition
              "
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}

      </div>

      {/* Footer */}

      <div className="p-8 border-t border-white/10">

        <p className="text-sm text-white/60">
          GN Alliances Platform
        </p>

        <p className="text-xs text-white/40 mt-1">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}