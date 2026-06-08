"use client";

import { Bell, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TopbarProps = {
    onMenuClick: () => void;
};

export default function Topbar({
    onMenuClick,
}: TopbarProps) {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem("gn-user");
        router.replace("/login");
    };

    const [user, setUser] = useState<{
        email: string;
        role: string;
    } | null>(null);

    useEffect(() => {
        const stored =
            sessionStorage.getItem("gn-user");

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    return (
        <div
            className="
        h-[72px]
        md:h-[80px]
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-4
        md:px-6
        lg:px-8
      "
        >
            {/* Left Side */}

            <div className="flex items-center gap-4">

                {/* Mobile Menu Button */}

                <button
                    onClick={onMenuClick}
                    className="
            lg:hidden
            flex
            items-center
            justify-center
          "
                >
                    <Menu size={26} />
                </button>

                <h1
                    className="
            text-xl
            md:text-2xl
            lg:text-3xl
            font-bold
            text-[#041B57]
          "
                >
                    Dashboard
                </h1>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4 md:gap-6">

                {/* Notification */}

                <div className="relative">

                    <Bell size={22} />

                    <span
                        className="
              absolute
              -top-2
              -right-2
              w-5
              h-5
              rounded-full
              bg-red-500
              text-white
              text-[10px]
              flex
              items-center
              justify-center
            "
                    >
                        8
                    </span>

                </div>

                {/* User Info */}

                <div className="hidden md:block text-right">

                    <p className="font-semibold">
                        {user?.email ?? "User"}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user?.role?.toUpperCase() ?? ""}
                    </p>

                </div>

                {/* Avatar */}

                <div
                    className="
            w-10
            h-10
            rounded-full
            bg-[#0B2E83]
            text-white
            flex
            items-center
            justify-center
            font-semibold
          "
                >
                    {user?.email?.charAt(0).toUpperCase() ?? "U"}
                </div>

                {/* Logout */}

                <button
                    onClick={handleLogout}
                    className="
            text-red-500
            hover:text-red-600
            transition
          "
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>

            </div>

        </div>
    );
}