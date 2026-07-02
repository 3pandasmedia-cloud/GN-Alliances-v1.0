"use client";

import { authFetch } from "@/lib/api";
import { useEffect, useState } from "react";
<td className="p-4"></td>
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

type Props = {
  endpoint?: string;
};

export default function UsersTable({
  endpoint = "/api/users",
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] =
    useState(true);

  const loadUsers = async () => {
    try {
      const user = JSON.parse(
        sessionStorage.getItem("gn-user") || "{}"
      );

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      console.log("API Response:", data);

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Desktop */}

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 capitalize">
                  {user.role}
                </td>

                <td className="p-4">

                  <span
                    className={`
    px-3
    py-1
    rounded-full
    text-xs
    ${user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }
  `}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={async () => {
                        const name = prompt(
                          "Enter new name",
                          user.name
                        );

                        if (!name) return;

                        const response =
                          await fetch(
                            `/api/users/${user.id}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type":
                                  "application/json",
                              },
                              body: JSON.stringify({
                                name,
                                email: user.email,
                                role: user.role,
                                status: user.status,
                              }),
                            }
                          );

                        if (response.ok) {
                          loadUsers();
                        }
                      }}
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-blue-100
                        text-blue-700
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const loggedUser = JSON.parse(
                          sessionStorage.getItem("gn-user") || "{}"
                        );

                        await fetch(
                          `/api/users/${user.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${loggedUser.token}`,
                            },
                            body: JSON.stringify({
                              name: user.name,
                              email: user.email,
                              role: user.role,
                              status:
                                user.status === "ACTIVE"
                                  ? "INACTIVE"
                                  : "ACTIVE",
                            }),
                          }
                        );

                        loadUsers();
                      }}
                      className="
    px-3
    py-2
    rounded-lg
    bg-yellow-100
    text-yellow-700
  "
                    >
                      {user.status === "ACTIVE"
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={async () => {
                        if (
                          !confirm(
                            "Delete this user?"
                          )
                        )
                          return;

                        const response =
                          await authFetch(
                            `/users/${user.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                        if (response.ok) {
                          loadUsers();
                        }
                      }}
                      className="
                        px-3
                        py-2
                        rounded-lg
                        bg-red-100
                        text-red-700
                      "
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}