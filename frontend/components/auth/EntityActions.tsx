"use client";

import { useEffect, useState } from "react";

/** Hide entity mutation actions from client Admins, including during initial load. */
export default function EntityActions({ children }: { children: React.ReactNode }) {
  const [canManage, setCanManage] = useState(false);
  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("gn-user") || "null");
      setCanManage(user?.role === "super-admin");
    } catch { setCanManage(false); }
  }, []);
  return canManage ? <>{children}</> : null;
}
