"use client";

import Link from "next/link";
import Image from "next/image";

import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle2,
  Activity,
  FileText,
  Settings,
} from "lucide-react";

type SidebarProps = {
  onLinkClick?: () => void;
};

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/platform/employee",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    href: "/platform/employee/tasks",
  },
  {
    title: "Approvals",
    icon: CheckCircle2,
    href: "/platform/employee/approvals",
  },
  {
    title: "Activities",
    icon: Activity,
    href: "/platform/employee/activities",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/platform/employee/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/platform/employee/settings",
  },
];

export default function EmployeeSidebar({
  onLinkClick,
}: SidebarProps) {
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

      <div className="flex-1 py-6">

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
                text-[16px]
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
          Employee Portal
        </p>

        <p className="text-xs text-white/40 mt-1">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}