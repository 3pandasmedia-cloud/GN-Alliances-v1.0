"use client";

import { useEffect, useState } from "react";

/** Owner-only by default; individual modules may explicitly allow client Admins. */
export default function EntityActions({ children, allowAdmin = false }: { children: React.ReactNode; allowAdmin?: boolean }) {
  const [canManage, setCanManage] = useState(false);
  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("gn-user") || "null");
      setCanManage(user?.role === "super-admin" || (allowAdmin && user?.role === "admin"));
    } catch { setCanManage(false); }
  }, [allowAdmin]);
  return canManage ? <>{children}</> : null;
}
