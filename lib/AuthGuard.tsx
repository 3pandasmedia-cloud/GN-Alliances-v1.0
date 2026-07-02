"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const user =
      sessionStorage.getItem("gn-user");

    if (!user) {
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F7FB]">
        <div className="text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}