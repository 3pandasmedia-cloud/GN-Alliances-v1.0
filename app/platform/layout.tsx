"use client";

import { useState, useEffect } from "react";

import Topbar from "./Topbar";
import AuthGuard from "@/lib/AuthGuard";

import SuperAdminSidebar from "./SuperAdminSidebar";
import AdminSidebar from "./AdminSidebar";
import PartnerSidebar from "./PartnerSidebar";
import ClientSidebar from "./ClientSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const storedUser =
            sessionStorage.getItem("gn-user");

        if (!storedUser) return;

        const user = JSON.parse(storedUser);

        setRole(user.role);
    }, []);


    const renderSidebar = () => {
        const props = {
            onLinkClick: () => setSidebarOpen(false),
        };

        switch (role) {
            case "super-admin":
                return <SuperAdminSidebar {...props} />;

            case "admin":
                return <AdminSidebar {...props} />;

            case "partner":
                return <PartnerSidebar {...props} />;

            case "client":
                return <ClientSidebar {...props} />;

            case "employee":
                return <EmployeeSidebar {...props} />;

            default:
                return null;
        }
    };

    return (
        <AuthGuard>
            <div className="h-screen bg-[#F5F7FB] flex overflow-hidden">

                {/* Desktop Sidebar */}

                <div className="hidden lg:flex">
                    {renderSidebar()}
                </div>

                {/* Mobile Sidebar */}

                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">

                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        />

                        <div className="absolute left-0 top-0 h-full">
                            {renderSidebar()}
                        </div>

                    </div>
                )}

                {/* Main Content */}

                <div className="flex-1 flex flex-col min-w-0">

                    <Topbar
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />

                    <main
                        className="
              flex-1
              overflow-y-auto
              p-4
              md:p-6
              lg:p-8
            "
                    >
                        {children}
                    </main>

                </div>

            </div>
        </AuthGuard>
    );
}