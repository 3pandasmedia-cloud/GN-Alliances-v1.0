"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  allowAdmin?: boolean;
};

export default function AddUserModal({
  isOpen,
  onClose,
  allowAdmin = false,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [role, setRole] =
    useState("employee");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      if (!response.ok) {
        alert("Failed to create user");
        return;
      }

      alert("User created");

      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");

      onClose();

      window.location.reload();
    } catch (error) {
      alert(
        "Unable to connect to server"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999]">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-3xl
          p-8
          w-[95%]
          max-w-xl
        "
      >

        <h2 className="text-2xl font-bold mb-6">
          Add User
        </h2>

        <div className="space-y-4">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Full Name"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            className="w-full h-12 border rounded-xl px-4"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="w-full h-12 border rounded-xl px-4"
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full h-12 border rounded-xl px-4"
          >

            {allowAdmin && (
              <option value="admin">
                Admin
              </option>
            )}

            <option value="partner">
              Partner
            </option>

            <option value="employee">
              Employee
            </option>

            <option value="client">
              Client
            </option>

          </select>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              flex-1
              h-12
              rounded-xl
              border
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            Create User
          </button>

        </div>

      </div>

    </div>
  );
}