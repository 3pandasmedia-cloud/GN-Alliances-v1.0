"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
  Store,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "https://api.gnalliances.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Login failed"
        );
        return;
      }

      sessionStorage.setItem(
        "gn-user",
        JSON.stringify({
          email: data.email,
          role: data.role,
          token: data.token,
        })
      );

      router.push(
        `/platform/${data.role}`
      );
    } catch (error) {
      setError(
        "Unable to connect to server"
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[55%_45%]">

      {/* LEFT PANEL */}

      <div className="hidden lg:block relative overflow-hidden">

        <Image
          src="/images/login-bgg.png"
          alt="GN Alliances"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#041B57]/25" />

        {/* Logo */}

        <Link
          href="/"
          className="
            absolute
            top-16
            left-1/2
            -translate-x-1/2
            z-20
            transition
            hover:scale-105
          "
        >
          <Image
            src="/logos/gn-logo-white.png"
            alt="GN Alliances"
            width={260}
            height={120}
            priority
          />
        </Link>

        {/* Heading */}

        <div
          className="
            absolute
            top-[260px]
            left-1/2
            -translate-x-1/2
            z-20
            w-[700px]
            text-center
            text-white
          "
        >
          <h2 className="text-5xl font-bold leading-tight">
            The All-in-One Platform for
            <br />
            Smarter Partnerships & Higher Rewards
          </h2>
        </div>

        {/* Features */}

        <div
          className="
            absolute
            bottom-32
            left-[100px]
            right-[100px]
            z-20
            grid
            grid-cols-2
            gap-10
            text-white
          "
        >

          <div>
            <Store
              size={42}
              className="text-[#4F7FFF] mb-4"
            />

            <h3 className="font-semibold text-2xl mb-2">
              Manage Merchants
            </h3>

            <p className="text-white/80 text-base leading-relaxed">
              Onboard and manage merchants seamlessly
            </p>
          </div>

          <div>
            <Megaphone
              size={42}
              className="text-[#4F7FFF] mb-4"
            />

            <h3 className="font-semibold text-2xl mb-2">
              Run Campaigns
            </h3>

            <p className="text-white/80 text-base leading-relaxed">
              Create, launch and optimize impactful campaigns
            </p>
          </div>

          <div>
            <BarChart3
              size={42}
              className="text-[#4F7FFF] mb-4"
            />

            <h3 className="font-semibold text-2xl mb-2">
              Track Performance
            </h3>

            <p className="text-white/80 text-base leading-relaxed">
              Real-time analytics and actionable insights
            </p>
          </div>

          <div>
            <ShieldCheck
              size={42}
              className="text-[#4F7FFF] mb-4"
            />

            <h3 className="font-semibold text-2xl mb-2">
              Ensure Transparency
            </h3>

            <p className="text-white/80 text-base leading-relaxed">
              Accurate reconciliation and on-time payouts
            </p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="relative flex items-center justify-center px-4 md:px-8">

        {/* Mobile Background */}

        <div className="absolute inset-0 lg:hidden">

          <Image
            src="/images/login-bgg.png"
            alt="GN Alliances"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#041B57]/70" />

        </div>

        {/* Desktop Background */}

        <div className="hidden lg:block absolute inset-0 bg-[#F8FAFC]" />

        {/* Login Card */}

        <div
          className="
      relative
      z-10
      w-full
      max-w-lg
      bg-white
      rounded-3xl
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      border
      border-gray-100
      p-6
      md:p-10
      my-6
    "
        >

          {/* Mobile Logo */}

          <div className="lg:hidden flex justify-center mb-8">

            <Link href="/">
              <Image
                src="/logos/gn-logoa.png"
                alt="GN Alliances"
                width={180}
                height={70}
              />
            </Link>

          </div>

          <div className="mb-8 md:mb-10">

            <h1
              className="
          text-3xl
          md:text-5xl
          font-bold
          text-[#0B2E83]
        "
            >
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3 text-base md:text-lg">
              Sign in to continue to your account
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5 md:space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email address"
                className="
            w-full
            h-12
            md:h-14
            px-4
            md:px-5
            rounded-xl
            border
            border-gray-300
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#0B2E83]
          "
              />

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="
              w-full
              h-12
              md:h-14
              px-4
              md:px-5
              pr-14
              rounded-xl
              border
              border-gray-300
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#0B2E83]
            "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember / Forgot */}

            <div
              className="
          flex
          items-center
          justify-between
          text-sm
        "
            >

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                href="/login/forgot-password"
                className="text-[#0B2E83] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Button */}

            <button
              type="submit"
              className="
          w-full
          h-12
          md:h-14
          rounded-xl
          bg-gradient-to-r
          from-[#0B2E83]
          to-[#1847B8]
          text-white
          font-semibold
          text-base
          md:text-lg
          shadow-sm
          hover:shadow-md
          transition
        "
            >
              Sign In
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 md:mt-10 text-center text-sm text-gray-400">
            © 2026 GN Alliances. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
}