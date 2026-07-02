"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/api";

type Merchant = {
  id: string;
  name: string;
  slug: string;
  email: string;
  logo?: string;
  status: string;
};

export default function PartnerTable() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    authFetch("/partners/type/MERCHANT")
      .then((res) => res.json())
      .then(setMerchants)
      .catch(console.error);
  }, []);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        overflow-hidden
      "
    >
      {/* Desktop */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left px-6 py-4">
                Merchant
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {merchants.map((merchant) => (

              <tr
                key={merchant.id}
                className="
                  border-b
                  hover:bg-blue-50
                  transition-all
                  duration-200
                "
              >

                <td className="px-6 py-5">

                  <Link
                    href={`/platform/super-admin/merchants/${merchant.slug}`}
                    className="flex items-center gap-4"
                  >

                    <img
                      src={
                        merchant.logo
                          ? `${merchant.logo}`
                          : "/images/default-logo.png"
                      }
                      alt={merchant.name}
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        border
                        object-cover
                        bg-white
                      "
                    />

                    <div>

                      <h3
                        className="
                          font-semibold
                          text-[#0B2E83]
                          text-lg
                        "
                      >
                        {merchant.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {merchant.email}
                      </p>

                    </div>

                  </Link>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${merchant.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {merchant.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="md:hidden p-4 space-y-4">

        {merchants.map((merchant) => (

          <Link
            key={merchant.id}
            href={`/platform/super-admin/merchants/${merchant.slug}`}
            className="
              block
              border
              rounded-3xl
              p-4
              hover:border-[#0B2E83]
              transition-all
            "
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  merchant.logo
                    ? `${merchant.logo}`
                    : "/images/default-logo.png"
                }
                alt={merchant.name}
                className="
                  w-16
                  h-16
                  rounded-2xl
                  border
                  object-cover
                  bg-white
                "
              />

              <div className="flex-1">

                <h3
                  className="
                    font-bold
                    text-lg
                    text-[#0B2E83]
                  "
                >
                  {merchant.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {merchant.email}
                </p>

                <span
                  className={`
                    inline-block
                    mt-3
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${merchant.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {merchant.status}
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}