import { AdminModuleGuard } from "@/components/auth/AdminAccess";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminModuleGuard>{children}</AdminModuleGuard>;
}
