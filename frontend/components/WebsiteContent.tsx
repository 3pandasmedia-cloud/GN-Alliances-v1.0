"use client";
import { createContext, useContext, useEffect, useState } from "react";
import defaults from "@/lib/websiteDefaults.json";
import { API_URL } from "@/lib/config";
export type WebsiteContent = typeof defaults;
const Context = createContext<WebsiteContent>(defaults);
export const useWebsiteContent = () => useContext(Context);
export function WebsiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaults);
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => { try { const response = await fetch(`${API_URL}/website-settings/public`, { cache: "no-store", signal: controller.signal }); if (response.ok) { const data = await response.json(); if (data.content) setContent(data.content); } } catch {} };
    void load(); window.addEventListener("focus", load);
    return () => { controller.abort(); window.removeEventListener("focus", load); };
  }, []);
  return <Context.Provider value={content}>{children}</Context.Provider>;
}
