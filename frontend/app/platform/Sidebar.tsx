"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Gift,
    BarChart3,
    Wallet,
    UserCog,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/platform/admin",
    },
    {
        title: "Merchants",
        icon: Users,
        href: "/platform/Merchants",
    },
    {
        title: "Campaigns",
        icon: Megaphone,
        href: "#",
    },
    {
        title: "Offers",
        icon: Gift,
        href: "#",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        href: "#",
    },
    {
        title: "Reconciliation",
        icon: Wallet,
        href: "#",
    },
    {
        title: "Users",
        icon: UserCog,
        href: "#",
    },
    {
        title: "Settings",
        icon: Settings,
        href: "#",
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="
        w-[280px]
        max-w-[85vw]
        h-screen
        bg-[#041B57]
        text-white
        flex
        flex-col
        shrink-0
      "
        >

            {/* Logo */}

            <div className="px-8 py-8 border-b border-white/10">

                <Image
                    src="/logos/gn-logo-white.png"
                    alt="GN"
                    width={180}
                    height={80}
                    className="w-auto h-auto"
                />

            </div>

            {/* Menu */}

            <div className="flex-1 py-6 px-4">

                {menuItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        pathname === item.href;

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`
                flex
                items-center
                gap-4
                px-5
                py-3.5
                rounded-xl
                text-[15px]
                font-medium
                transition-all
                mb-2

                ${isActive
                                    ? "bg-[#1847B8] shadow-lg"
                                    : "hover:bg-[#1847B8]/70"
                                }
              `}
                        >
                            <Icon size={20} />

                            <span>
                                {item.title}
                            </span>

                        </Link>
                    );
                })}

            </div>

            {/* Footer */}

            <div className="p-6 border-t border-white/10">

                <p className="text-xs text-white/60">
                    GN Alliances Platform
                </p>

                <p className="text-xs text-white/40 mt-1">
                    Version 1.0.0
                </p>

            </div>

        </aside>
    );
}