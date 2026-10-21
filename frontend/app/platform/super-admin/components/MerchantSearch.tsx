"use client";
import { authFetch } from "@/lib/api";

import { useEffect, useRef, useState } from "react";

type Merchant = {
  id: string;
  name: string;
  type: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MerchantSearch({
  value,
  onChange,
}: Props) {
  const [results, setResults] = useState<Merchant[]>([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!value) {
        setResults([]);
        return;
      }

      const res = await authFetch(
        `/search-merchants?q=${encodeURIComponent(value)}`
      );

      const data = await res.json();

      setResults(data);
    };

    fetchData();
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handler);

    return () =>
      window.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <input
        value={value}
        placeholder="Search or enter merchant..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#0A2E8A]"
      />

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-xl overflow-hidden">

          {results.map((merchant) => (
            <button
              key={merchant.id}
              type="button"
              onClick={() => {
                onChange(merchant.name);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-slate-50"
            >
              <span>{merchant.name}</span>

              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                {merchant.type}
              </span>
            </button>
          ))}

        </div>
      )}
    </div>
  );
}