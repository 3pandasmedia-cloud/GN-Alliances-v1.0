"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function AddBankModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [logo, setLogo] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const createBank = async () => {
    if (
      !name ||
      !email ||
      !username ||
      !password
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append(
        "username",
        username
      );
      formData.append(
        "password",
        password
      );

      // IMPORTANT
      formData.append(
        "type",
        "BANK"
      );

      if (logo) {
        formData.append(
          "logo",
          logo
        );
      }

      const user =
        sessionStorage.getItem(
          "gn-user"
        );

      const token = user
        ? JSON.parse(user).token
        : "";

      const response =
        await fetch(
          "https://api.gnalliances.com/api/partners",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to create bank."
        );
        return;
      }

      alert(
        "Bank created successfully."
      );

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setLogo(null);
      setPreview("");

      onCreated();
      onClose();

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 z-[9999]">

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
          p-6
          md:p-8
          w-[95%]
          max-w-xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <h2 className="text-3xl font-bold mb-6">
          Add Bank
        </h2>

        {/* Logo */}

        <div className="mb-5">

          <label className="block text-sm font-medium mb-2">
            Bank Logo
          </label>

          <div className="flex items-center gap-4">

            {preview ? (
              <Image
                src={preview}
                alt="Bank Logo"
                width={80}
                height={80}
                className="
                  rounded-xl
                  border
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  w-20
                  h-20
                  rounded-xl
                  border
                  flex
                  items-center
                  justify-center
                  text-gray-400
                "
              >
                Logo
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (!file) return;

                setLogo(file);

                setPreview(
                  URL.createObjectURL(
                    file
                  )
                );
              }}
            />

          </div>

        </div>

        {/* Form */}

        <div className="space-y-4">

          <input
            placeholder="Bank Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            type="email"
            placeholder="Bank Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            placeholder="Login Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

          <input
            type="password"
            placeholder="Login Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              px-4
            "
          />

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              flex-1
              h-12
              border
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={createBank}
            disabled={loading}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
              font-medium
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating..."
              : "Create Bank"}
          </button>

        </div>

      </div>

    </div>
  );
}