"use client";

import {
  Bell,
  Menu,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type TopbarProps = {
  onMenuClick: () => void;
};

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
};

export default function Topbar({
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = sessionStorage.getItem("gn-user");

        if (!stored) {
          router.replace("/login");
          return;
        }

        const parsed = JSON.parse(stored);

        if (!parsed?.token) {
          router.replace("/login");
          return;
        }

        const response = await fetch(
          "/api/profile",
          {
            headers: {
              Authorization: `Bearer ${parsed.token}`,
            },
          }
        );

        if (!response.ok) {
          sessionStorage.removeItem("gn-user");
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!data || data.message) {
          sessionStorage.removeItem("gn-user");
          router.replace("/login");
          return;
        }

        setUser({
          ...parsed,
          name: data.name ?? parsed.name,
          email: data.email ?? parsed.email,
          role: data.role ?? parsed.role,
          avatar: data.avatar ?? "",
        });

      } catch (error) {
        console.error(error);

        sessionStorage.removeItem("gn-user");
        router.replace("/login");
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("gn-user");
    router.replace("/login");
  };

  const openSettings = () => {
    router.push(
      `/platform/${user?.role}/settings`
    );
  };

  const getInitials = () => {
    if (!user?.name) return "U";

    const words =
      user.name.split(" ");

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    ).toUpperCase();
  };

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
      {/* Left */}

      <div className="flex items-center gap-4">
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

      {/* Right */}

      <div className="flex items-center gap-4 md:gap-6">

        {/* Notifications */}

        <div className="relative">
          <Link href="#">
            <Bell size={22} />
          </Link>

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

        {/* User */}

        <div
          onClick={openSettings}
          className="
            hidden
            md:block
            text-right
            cursor-pointer
          "
        >
          <p className="font-semibold">
            {user?.name || "User"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role
              ?.replace("-", " ")
              .toUpperCase()}
          </p>
        </div>

        {/* Avatar */}

        <button
          onClick={openSettings}
          className="
    w-10
    h-10
    rounded-full
    overflow-hidden
    border
    hover:scale-105
    transition
  "
        >
          {user?.avatar ? (
            <img
              src={`${user.avatar}`}
              alt="Profile"
              className="
        w-full
        h-full
        object-cover
      "
            />
          ) : (
            <div
              className="
        w-full
        h-full
        bg-[#0B2E83]
        text-white
        flex
        items-center
        justify-center
        font-semibold
      "
            >
              {getInitials()}
            </div>
          )}
        </button>

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