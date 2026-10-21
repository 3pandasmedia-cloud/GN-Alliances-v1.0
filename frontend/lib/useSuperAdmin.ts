"use client";
import { useEffect, useState } from "react";
export function useSuperAdmin() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  useEffect(() => {
    try { setIsSuperAdmin(JSON.parse(sessionStorage.getItem("gn-user") || "null")?.role === "super-admin"); }
    catch { setIsSuperAdmin(false); }
  }, []);
  return isSuperAdmin;
}
