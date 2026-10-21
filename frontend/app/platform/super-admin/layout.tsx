"use client";
import { usePathname } from "next/navigation";
import RoleGuard from "@/components/auth/RoleGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminsOnly = pathname === "/platform/super-admin/admins" || pathname.startsWith("/platform/super-admin/admins/");
  const ownerOnly = adminsOnly || /^\/platform\/super-admin\/landing-offers\/[^/]+/.test(pathname);
  return <RoleGuard allowedRole={ownerOnly ? "super-admin" : ["super-admin", "admin"]}>{children}</RoleGuard>;
}
