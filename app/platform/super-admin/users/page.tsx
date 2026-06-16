"use client";

import { useState } from "react";

import UserStatsCard from "../../partner//components/UserStatsCard";
import UsersTable from "../../partner//components/UsersTable";
import AddUserModal from "../../partner/components/AddUserModal";

export default function UsersPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl md:text-4xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage platform users
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            h-12
            px-6
            rounded-xl
            bg-[#0B2E83]
            text-white
            font-medium
          "
        >
          + Add User
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <UserStatsCard
          title="Total Users"
          value="284"
        />

        <UserStatsCard
          title="Admins"
          value="6"
        />

        <UserStatsCard
          title="Employees"
          value="42"
        />

        <UserStatsCard
          title="Partners"
          value="236"
        />

      </div>

      <UsersTable />

      <AddUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        allowAdmin={false}
      />

    </div>
  );
}