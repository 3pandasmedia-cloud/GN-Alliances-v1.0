// EDIT GUIDE: Shared dashboard shell, role sidebar and mobile scrolling. See docs/EDITING_GUIDE.md.
"use client";

import { useState, useEffect } from "react";

import { AdminAccessProvider } from "@/components/auth/AdminAccess";
import Topbar from "./Topbar";
import AuthGuard from "@/lib/AuthGuard";

import SuperAdminSidebar from "./SuperAdminSidebar";
import PartnerSidebar from "./PartnerSidebar";
import ClientSidebar from "./ClientSidebar";
import EmployeeSidebar from "./EmployeeSidebar";

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        const close = () => setSidebarOpen(false);
        window.addEventListener("keydown", onEscape);
        function onEscape(event: KeyboardEvent) { if (event.key === "Escape") close(); }
        return () => window.removeEventListener("keydown", onEscape);
    }, []);
    const [role, setRole] = useState("");

    useEffect(() => {
        let active = true;
        queueMicrotask(() => {
            if (!active) return;
            try { setRole(JSON.parse(sessionStorage.getItem("gn-user") || "null")?.role || ""); }
            catch { setRole(""); }
        });
        return () => { active = false; };
    }, []);


    const renderSidebar = () => {
        const props = {
            onLinkClick: () => setSidebarOpen(false),
        };

        switch (role) {
            case "super-admin":
                return <SuperAdminSidebar {...props} />;

            case "admin":
                return <SuperAdminSidebar {...props} clientAdmin />;

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
        <AuthGuard><AdminAccessProvider>
            <div className="h-dvh bg-[#F5F7FB] flex overflow-hidden">

                {/* Desktop Sidebar */}

                <div className="hidden lg:flex">
                    {renderSidebar()}
                </div>

                {/* Mobile Sidebar */}

                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">

                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        />

                        <button type="button" aria-label="Close navigation menu" onClick={() => setSidebarOpen(false)} className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl text-[#041B57] shadow">×</button>
                        <div onClick={event => { if ((event.target as HTMLElement).closest("a")) setSidebarOpen(false); }} className="absolute left-0 top-0 h-full max-w-[85vw] overflow-y-auto">
                            {renderSidebar()}
                        </div>

                    </div>
                )}

                {/* Main Content */}

                <div className="flex-1 flex flex-col min-w-0 min-h-0">

                    <Topbar
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />

                    <main
                        className="
              platform-main
              flex-1
              min-w-0
              min-h-0
              overflow-x-hidden
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
        </AdminAccessProvider></AuthGuard>
    );
}