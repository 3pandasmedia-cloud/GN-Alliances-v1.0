"use client";

import { useState } from "react";

import UsersTable from "../../partner/components/UsersTable";
import AddUserModal from "../../partner/components/AddUserModal";

export default function ClientsPage() {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Client Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage clients
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            px-6
            h-12
            rounded-xl
            bg-[#0B2E83]
            text-white
          "
        >
          + Add Client
        </button>

      </div>

      <UsersTable
        endpoint="https://api.gnalliances.com/api/clients"
      />

      <AddUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        forceRole="client"
      />

    </div>
  );
}