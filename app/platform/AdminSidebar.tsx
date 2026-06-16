"use client";

import Link from "next/link";
import Image from "next/image";

import {
  LayoutDashboard,
  Users,
  Gift,
  BarChart3,
  Settings,
  Megaphone,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/platform/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Campaigns",
    href: "/platform/admin/campaigns",
    icon: Megaphone,
  },
  {
    title: "Accounts",
    href: "/platform/admin/users",
    icon: Users,
  },
  {
    title: "Offers",
    href: "/platform/admin/offers",
    icon: Gift,
  },
  {
    title: "Analytics",
    href: "/platform/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/platform/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-[280px] h-screen bg-[#041B57] text-white flex flex-col">

      <div className="px-8 py-8 border-b border-white/10">

        <Image
          src="/logos/gn-logo-white.png"
          alt="GN"
          width={180}
          height={80}
        />

      </div>

      <div className="flex-1 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
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

    </aside>
  );
}