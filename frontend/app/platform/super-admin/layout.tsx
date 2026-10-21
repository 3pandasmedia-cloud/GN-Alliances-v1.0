"use client";
import { usePathname } from "next/navigation";
import { AdminModuleGuard } from "@/components/auth/AdminAccess";
import RoleGuard from "@/components/auth/RoleGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminsOnly = pathname === "/platform/super-admin/admins" || pathname.startsWith("/platform/super-admin/admins/");
  const ownerOnly = adminsOnly || pathname === "/platform/super-admin/website-settings";
  return <RoleGuard allowedRole={ownerOnly ? "super-admin" : ["super-admin", "admin"]}><AdminModuleGuard>{children}</AdminModuleGuard></RoleGuard>;
}
