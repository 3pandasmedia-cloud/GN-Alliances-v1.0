"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function PendingApprovals() {
  const [stats, setStats] = useState({
    partners: 0,
    campaigns: 0,
    offers: 0,
    users: 0,
  });

  useEffect(() => {
  fetch("/api/dashboard/stats")
    .then((res) => res.json())
    .then(setStats);
}, []);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
      "
    >

      <h3 className="text-xl font-bold mb-6">
        Platform Summary
      </h3>

      <div
        className="
          bg-[#F8FAFC]
          rounded-2xl
          p-5
          flex
          items-center
          gap-4
          mb-6
        "
      >

        <div
          className="
            w-14
            h-14
            rounded-xl
            bg-blue-100
            flex
            items-center
            justify-center
          "
        >
          <Users
            size={26}
            className="text-blue-600"
          />
        </div>

        <div>

          <h4 className="text-4xl font-bold">
            {stats.users}
          </h4>

          <p className="text-gray-600">
            Total Users
          </p>

        </div>

      </div>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Total Partners</span>
          <span className="font-semibold">
            {stats.partners}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Campaigns</span>
          <span className="font-semibold">
            {stats.campaigns}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Offers</span>
          <span className="font-semibold">
            {stats.offers}
          </span>
        </div>

      </div>

    </div>
  );
}
