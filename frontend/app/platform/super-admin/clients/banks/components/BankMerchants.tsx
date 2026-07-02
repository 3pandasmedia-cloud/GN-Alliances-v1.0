"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  bankId: string;
};

type Merchant = {
  id: string;
  name: string;
  email: string;
  logo?: string;
  status: string;
};

export default function BankMerchants({
  bankId,
}: Props) {
  const [merchants, setMerchants] =
    useState<Merchant[]>([]);

  const loadMerchants = async () => {
    try {

      const response =
        await authFetch(
          `/banks/${bankId}/merchants`
        );

      if (!response.ok) return;

      const data =
        await response.json();

      setMerchants(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (bankId) {
      loadMerchants();
    }
  }, [bankId]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Connected Merchants
          </h2>

          <p className="text-gray-500 mt-1">
            Merchants associated with this bank.
          </p>

        </div>

        <button
          className="
            h-11
            px-6
            rounded-xl
            bg-[#0B2E83]
            text-white
          "
        >
          + Link Merchant
        </button>

      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
        "
      >

        <div className="bg-white border rounded-3xl p-6">

          <p className="text-gray-500">
            Total Merchants
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {merchants.length}
          </h2>

        </div>

        <div className="bg-white border rounded-3xl p-6">

          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {
              merchants.filter(
                (merchant) =>
                  merchant.status === "ACTIVE"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white border rounded-3xl p-6">

          <p className="text-gray-500">
            Inactive
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {
              merchants.filter(
                (merchant) =>
                  merchant.status === "INACTIVE"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Merchant Table */}

      <div className="bg-white border rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-5">
                Merchant
              </th>

              <th className="text-left p-5">
                Email
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {merchants.length === 0 && (

              <tr>

                <td
                  colSpan={3}
                  className="text-center p-10 text-gray-500"
                >
                  No merchants linked.
                </td>

              </tr>

            )}

            {merchants.map((merchant) => (

              <tr
                key={merchant.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        merchant.logo
                          ? `https://api.gnalliances.com${merchant.logo}`
                          : "/images/default-logo.png"
                      }
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        border
                        object-cover
                      "
                    />

                    <div>

                      <h3 className="font-semibold">
                        {merchant.name}
                      </h3>

                    </div>

                  </div>

                </td>

                <td className="p-5">
                  {merchant.email}
                </td>

                <td className="p-5">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        merchant.status === "ACTIVE"
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

    </div>
  );
}