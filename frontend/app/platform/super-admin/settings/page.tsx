"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import ImageCropModal from "../settings/ImageCropModal";
import getCroppedImg from "@/lib/cropImage";
import {
  Eye,
  EyeOff,
} from "lucide-react";


export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);

  const [showCrop, setShowCrop] =
    useState(false);

  const [show2FA, setShow2FA] =
    useState(false);

  const [otpEmail, setOtpEmail] =
    useState("");

  const [otpCode, setOtpCode] =
    useState("");

  const [sendingOtp, setSendingOtp] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [crop, setCrop] =
    useState({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [uploading, setUploading] =
    useState(false);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null);

  const [name, setName] = useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const loadProfile = async () => {
    const response =
      await authFetch("/profile");

    const data =
      await response.json();

    setProfile(data);
    setName(data.name);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const response =
      await authFetch("/profile", {
        method: "PUT",
        body: JSON.stringify({
          name,
        }),
      });

    if (response.ok) {
      alert("Profile Updated");
      loadProfile();
    }
  };

  const updatePassword = async () => {
    if (
      newPassword !== confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    const response =
      await authFetch(
        "/profile/password",
        {
          method: "PUT",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

    const data =
      await response.json();

    alert(data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleTwoFactor = async () => {
    await authFetch(
      "/profile/two-factor",
      {
        method: "PUT",
        body: JSON.stringify({
          enabled:
            !profile.twoFactor,
        }),
      }
    );

    loadProfile();
  };

  if (!profile)
    return (
      <div>Loading...</div>
    );

  const sendOTP = async () => {
    try {
      setSendingOtp(true);

      const response =
        await authFetch(
          "/two-factor/send-otp",
          {
            method: "POST",
            body: JSON.stringify({
              email: otpEmail,
            }),
          }
        );

      const data =
        await response.json();

      alert(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOTP = async () => {
    try {
      const response =
        await authFetch(
          "/two-factor/verify-otp",
          {
            method: "POST",
            body: JSON.stringify({
              email: otpEmail,
              otp: otpCode,
            }),
          }
        );

      const data =
        await response.json();

      alert(data.message);

      if (response.ok) {
        setShow2FA(false);
        loadProfile();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disable2FA = async () => {
    const response =
      await authFetch(
        "/two-factor/disable",
        {
          method: "PUT",
        }
      );

    const data =
      await response.json();

    alert(data.message);

    loadProfile();
  };

  const uploadAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const user = JSON.parse(
      sessionStorage.getItem("gn-user") || "{}"
    );

    const response = await fetch(
      "/api/profile/avatar",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      // update profile immediately
      setProfile(data);

      // optional: reload profile from backend
      await loadProfile();

      alert("Profile picture updated");
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Account Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your profile, password and security preferences
        </p>
      </div>

      {/* PROFILE */}

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">

        {/* Cover Banner */}

        <div className="h-36 md:h-48 bg-gradient-to-r from-[#041B57] to-[#0B2E83]" />

        <div className="px-6 md:px-10 pb-8">

          {/* Avatar */}

          <div className="flex justify-center -mt-16 md:-mt-20">

            <div className="relative">

              <div
                className="
    w-36
    h-36
    md:w-44
    md:h-44
    rounded-full
    overflow-hidden
    border-[5px]
    border-white
    bg-white
    shadow-xl
    flex
    items-center
    justify-center
  "
              >
                {profile.avatar ? (
                  <img
  src={`${profile.avatar}?t=${Date.now()}`}
  alt="Profile"
  className="
    w-full
    h-full
    object-contain
    p-3
  "
/>
                ) : (
                  <div
                    className="
        w-full
        h-full
        bg-[#0B2E83]
        flex
        items-center
        justify-center
        text-white
        text-5xl
        font-bold
      "
                  >
                    {profile.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <label
                className="
    absolute
    bottom-2
    right-2
    w-10
    h-10
    rounded-full
    bg-white
    shadow-md
    border
    flex
    items-center
    justify-center
    cursor-pointer
  "
              >
                📷

                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0];

                    if (!file) return;

                    const imageUrl =
                      URL.createObjectURL(file);

                    setSelectedImage(
                      imageUrl
                    );

                    setShowCrop(true);
                  }}
                />
              </label>

            </div>

            {showCrop && (
              <ImageCropModal
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                setCrop={setCrop}
                setZoom={setZoom}
                setCroppedAreaPixels={setCroppedAreaPixels}
                onClose={() => setShowCrop(false)}
                onSave={async () => {
                  try {
                    const fileInput =
                      document.getElementById(
                        "avatarInput"
                      ) as HTMLInputElement;

                    const file =
                      fileInput?.files?.[0];

                    if (!file) return;

                    const formData =
                      new FormData();

                    formData.append(
                      "avatar",
                      file
                    );

                    const user = JSON.parse(
                      sessionStorage.getItem(
                        "gn-user"
                      ) || "{}"
                    );

                    const response =
                      await fetch(
                        "/api/profile/avatar",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${user.token}`,
                          },
                          body: formData,
                        }
                      );

                    if (!response.ok) {
                      alert("Upload failed");
                      return;
                    }

                    alert(
                      "Profile picture updated"
                    );

                    loadProfile();

                    setShowCrop(false);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
            )}

          </div>

          {/* User Info */}

          <div className="text-center mt-6">

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {profile.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {profile.email}
            </p>

            <div
              className="
          inline-flex
          items-center
          mt-4
          px-4
          py-2
          rounded-full
          bg-[#0B2E83]/10
          text-[#0B2E83]
          text-sm
          font-semibold
        "
            >
              {profile.role
                .replace("-", " ")
                .toUpperCase()}
            </div>

          </div>

          {/* Profile Form */}

          <div className="mt-10 grid gap-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-200
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-[#0B2E83]
          "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                value={profile.email}
                disabled
                className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
          "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Role
              </label>

              <input
                value={profile.role}
                disabled
                className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            px-4
          "
              />
            </div>

            <button
              onClick={saveProfile}
              className="
          w-full
          md:w-auto
          h-12
          px-8
          rounded-xl
          bg-[#0B2E83]
          text-white
          font-medium
          hover:bg-[#08225f]
          transition
        "
            >
              Save Profile Changes
            </button>

          </div>

        </div>

      </div>

      {/* PASSWORD */}

      <div className="bg-white rounded-3xl p-8 border">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-4">

          {/* Current Password */}

          <div className="relative">

            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              placeholder="Current Password"
              className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          pr-12
        "
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
              className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
        "
            >
              {showCurrent ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* New Password */}

          <div className="relative">

            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="New Password"
              className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          pr-12
        "
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
        "
            >
              {showNew ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          {/* Confirm Password */}

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
              className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          pr-12
        "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
        "
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <button
            onClick={updatePassword}
            className="
        h-12
        px-6
        rounded-xl
        bg-[#0B2E83]
        text-white
        hover:bg-[#08225f]
      "
          >
            Update Password
          </button>

        </div>

      </div>

      {/* 2FA */}

      <div className="bg-white rounded-3xl p-8 border">

        <h2 className="text-2xl font-bold mb-4">
          Two Factor Authentication
        </h2>

        <p className="text-gray-500 mb-6">
          Secure your account using email OTP
        </p>

        {profile.twoFactor ? (

          <div>

            <div
              className="
          bg-green-50
          border
          border-green-200
          rounded-2xl
          p-4
          mb-4
        "
            >
              <p className="font-semibold text-green-700">
                ✓ Two Factor Authentication Enabled
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {profile.twoFactorEmail}
              </p>
            </div>

            <button
              onClick={disable2FA}
              className="
          h-12
          px-6
          rounded-xl
          bg-red-500
          text-white
        "
            >
              Disable 2FA
            </button>

          </div>

        ) : (

          <button
            onClick={() =>
              setShow2FA(true)
            }
            className="
        h-12
        px-6
        rounded-xl
        bg-green-600
        text-white
      "
          >
            Enable 2FA
          </button>

        )}

      </div>

      {show2FA && (
        <div className="fixed inset-0 z-[9999]">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setShow2FA(false)
            }
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

            <h3 className="text-2xl font-bold mb-6">
              Enable 2FA
            </h3>

            <input
              type="email"
              placeholder="Email Address"
              value={otpEmail}
              onChange={(e) =>
                setOtpEmail(
                  e.target.value
                )
              }
              className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          mb-4
        "
            />

            <button
              onClick={sendOTP}
              disabled={sendingOtp}
              className="
          w-full
          h-12
          rounded-xl
          bg-[#0B2E83]
          text-white
          mb-4
        "
            >
              Send OTP
            </button>

            <input
              placeholder="Enter OTP"
              value={otpCode}
              onChange={(e) =>
                setOtpCode(
                  e.target.value
                )
              }
              className="
          w-full
          h-12
          border
          rounded-xl
          px-4
          mb-4
        "
            />

            <button
              onClick={verifyOTP}
              className="
          w-full
          h-12
          rounded-xl
          bg-green-600
          text-white
        "
            >
              Verify OTP
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
