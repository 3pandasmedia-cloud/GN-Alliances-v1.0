"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
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
                  <div className="flex gap-2">

                    <button
                      onClick={async () => {
                        const name = prompt(
                          "Enter new name",
                          user.name
                        );

                        if (!name) return;

                        const response = await fetch(
                          `http://localhost:5000/api/users/${user.id}`,
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
                          window.location.reload();
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
                        if (
                          !confirm(
                            "Delete this user?"
                          )
                        )
                          return;

                        await fetch(
                          `http://localhost:5000/api/users/${user.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        window.location.reload();
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