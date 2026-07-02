"use client";

import { useState } from "react";

import UsersTable from "../../partner/components/UsersTable";
import AddUserModal from "../../partner/components/AddUserModal";

export default function AdminsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        Admin Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage platform administrators
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
                    + Add Admin
                </button>

            </div>

            <UsersTable endpoint="http://localhost:5000/api/admins" />

            <AddUserModal
                isOpen={open}
                onClose={() => setOpen(false)}
                forceRole="admin"
            />

        </div>
    );
}