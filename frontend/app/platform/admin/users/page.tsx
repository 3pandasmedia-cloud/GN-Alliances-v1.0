"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import UsersTable from "../../partner/components/UsersTable";

export default function AdminUsersPage() {
  return (
    <RoleGuard allowedRole="admin">

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Account Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage partners, employees and clients
          </p>

        </div>

        <UsersTable
          endpoint="/api/users/admin-view"
        />

      </div>

    </RoleGuard>
  );
}