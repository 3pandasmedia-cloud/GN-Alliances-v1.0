"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("gn-cookie-consent");

        const timer = setTimeout(() => {
            if (!consent) {
                setVisible(true);
            }
        }, 4000); // Match splash screen duration

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("gn-cookie-consent", "accepted");
        setVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("gn-cookie-consent", "rejected");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999]">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Cookie Preferences
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    We use cookies to improve your experience, analyze website traffic,
                    and enhance our services. You can accept or reject non-essential
                    cookies.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={handleReject}
                        className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                    >
                        Reject
                    </button>

                    <button
                        onClick={handleAccept}
                        className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}