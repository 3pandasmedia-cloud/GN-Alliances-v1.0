"use client";

import { useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
};

export default function ChangePasswordModal({
  isOpen,
  onClose,
  merchantId,
}: Props) {
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  const updatePassword = async () => {

    if (!password) {
      alert("Enter password");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response =
        await authFetch(
          `/partners/${merchantId}/password`,
          {
            method: "PUT",
            body: JSON.stringify({
              password,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(
        "Password updated successfully."
      );

      setPassword("");
      setConfirmPassword("");

      onClose();

    } catch (error) {

      console.error(error);

      alert("Server error.");

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
          p-8
          w-[95%]
          max-w-md
        "
      >

        <h2 className="text-3xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="New Password"
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

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
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

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            Show Password

          </label>

        </div>

        <div className="flex gap-3 mt-8">

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
            onClick={updatePassword}
            disabled={loading}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </div>

    </div>
  );
}