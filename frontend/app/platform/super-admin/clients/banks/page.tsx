"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/api";
import AddBankModal from "./modals/AddBankModal";

type Bank = {
    id: string;
    name: string;
    slug: string;
    email: string;
    logo?: string;
    status: string;
};

export default function BanksPage() {
    const [open, setOpen] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
    });

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            const res = await authFetch("/partners/type/BANK");
            const data = await res.json();

            setBanks(data);

            setStats({
                total: data.length,
                active: data.filter(
                    (b: Bank) => b.status === "ACTIVE"
                ).length,
                inactive: data.filter(
                    (b: Bank) => b.status === "INACTIVE"
                ).length,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold">
                        Banks
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage Banking Partners
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
                    + Add Bank
                </button>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-3xl border p-6">
                    <p className="text-gray-500">
                        Total Banks
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {stats.total}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl border p-6">
                    <p className="text-gray-500">
                        Active Banks
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {stats.active}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl border p-6">
                    <p className="text-gray-500">
                        Pending
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        0
                    </h2>
                </div>

                <div className="bg-white rounded-3xl border p-6">
                    <p className="text-gray-500">
                        Inactive
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {stats.inactive}
                    </h2>
                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-3xl border overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-50 border-b">

                        <tr>

                            <th className="text-left px-6 py-4">
                                Bank
                            </th>

                            <th className="text-left px-6 py-4">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {banks.map((bank) => (

                            <tr
                                key={bank.id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                <td className="px-6 py-5">

                                    <Link
                                        href={`/platform/super-admin/clients/banks/${bank.slug}`}
                                        className="flex items-center gap-4"
                                    >

                                        <div className="w-14 h-14 rounded-2xl border bg-white flex items-center justify-center p-1">
                                            <img
                                                src={
                                                    bank.logo
                                                        ? `https://api.gnalliances.com${bank.logo}`
                                                        : "/images/default-logo.png"
                                                }
                                                alt={bank.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-lg text-[#0B2E83]">
                                                {bank.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {bank.email}
                                            </p>

                                        </div>

                                    </Link>

                                </td>

                                <td className="px-6">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${bank.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {bank.status}
                                    </span>

                                </td>

                            </tr>

                        ))}


                    </tbody>

                </table>

            </div>

            <AddBankModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onCreated={loadBanks}
            />

        </div>

    );
}