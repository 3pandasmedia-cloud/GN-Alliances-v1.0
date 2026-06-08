"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  allowedRole: string;
  children: React.ReactNode;
};

export default function RoleGuard({
  allowedRole,
  children,
}: Props) {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const stored =
      sessionStorage.getItem("gn-user");

    if (!stored) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(stored);

    if (user.role !== allowedRole) {
      router.replace(
        `/platform/${user.role}`
      );
      return;
    }

    setAuthorized(true);
  }, [allowedRole, router]);

  if (!authorized) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}