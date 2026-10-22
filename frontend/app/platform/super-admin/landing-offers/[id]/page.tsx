"use client";
import { authFetch } from "@/lib/api";
import { popup } from "@/components/ui/Popup";


import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MerchantSearch from "../../components/MerchantSearch";
import { useParams } from "next/navigation";

import {
    ArrowLeft,
    Upload,
    Save,
} from "lucide-react";

export default function NewLandingOfferPage() {

    const [merchant, setMerchant] = useState("");
    const [title, setTitle] = useState("");
    const [destinationUrl, setDestinationUrl] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [displayOrder, setDisplayOrder] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [bannerPath, setBannerPath] = useState("");
    const { id } = useParams();

    const saveOffer = async () => {
        try {
            const res = await authFetch(
                `/landing-offers/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        merchantName: merchant,
                        merchantId: null,
                        banner: bannerPath,
                        destinationUrl,
                        description,
                        status,
                        displayOrder,
                        startDate,
                        endDate,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                await popup.alert(data.message);
                return;
            }

            await popup.alert("Offer updated successfully!");

            window.location.href =
                "/platform/super-admin/landing-offers";

        } catch (err) {

            console.error(err);

            await popup.alert("Server error.");

        }
    };

    useEffect(() => {
        if (id) {
            loadOffer();
        }
    }, [id]);

    const loadOffer = async () => {
        try {
            const res = await authFetch(
                `/landing-offers/${id}`
            );

            const data = await res.json();

            setMerchant(data.merchantName);
            setTitle(data.title);
            setDestinationUrl(data.destinationUrl);
            setDescription(data.description || "");
            setStatus(data.status);
            setDisplayOrder(data.displayOrder);
            setStartDate(data.startDate?.slice(0, 10));
            setEndDate(data.endDate?.slice(0, 10));

            setBannerPath(data.banner);

            setPreview(
                data.banner
            );

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="space-y-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <Link
                        href="/platform/super-admin/landing-offers"
                        className="rounded-xl border p-3 hover:bg-slate-100 transition"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-3xl font-bold text-[#0A2E8A]">
                            Edit Landing Offer
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Update the homepage promotional banner.
                        </p>
                    </div>

                </div>

                <button
                    onClick={saveOffer}
                    className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#F2A900]
            px-6
            py-3
            font-semibold
            text-white
            hover:opacity-90
            transition
          "
                >
                    <Save size={18} />
                    Save Offer
                </button>

            </div>

            {/* Content */}

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Left */}

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="mb-6 text-xl font-semibold">
                        Offer Details
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <label className="mb-2 block font-medium">
                                Merchant
                            </label>

                            <div className="space-y-2">

                                <label className="text-sm font-semibold">
                                    Merchant
                                </label>

                                <MerchantSearch
                                    value={merchant}
                                    onChange={setMerchant}
                                />

                                <p className="text-xs text-slate-500">
                                    Search an existing Merchant/Client or type a new one.
                                </p>

                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Offer Title
                            </label>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border px-4 py-3"
                                placeholder="Flat ₹500 OFF"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Destination URL
                            </label>

                            <input
                                value={destinationUrl}
                                onChange={(e) => setDestinationUrl(e.target.value)}
                                className="w-full rounded-xl border px-4 py-3"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Description
                            </label>

                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-xl border px-4 py-3"
                                placeholder="Offer description..."
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="mb-2 block font-medium">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="mb-2 block font-medium">
                                    Display Order
                                </label>

                                <input
                                    type="number"
                                    value={displayOrder}
                                    onChange={(e) =>
                                        setDisplayOrder(Number(e.target.value))
                                    }
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3"
                                >
                                    <option>ACTIVE</option>
                                    <option>INACTIVE</option>
                                </select>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="space-y-6">

                    {/* Upload */}

                    <div className="rounded-2xl border bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-xl font-semibold">
                            Banner Upload
                        </h2>

                        <label
                            className="
                flex
                h-[320px]
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-slate-300
                transition
                hover:border-[#0A2E8A]
                hover:bg-slate-50
              "
                        >

                            <Upload
                                size={50}
                                className="text-[#0A2E8A]"
                            />

                            <p className="mt-5 text-lg font-semibold">
                                Click to Upload Banner
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                Recommended Size
                            </p>

                            <p className="font-bold text-[#F2A900]">
                                1600 × 900 px
                            </p>

                            <p className="mt-3 text-sm text-slate-400">
                                JPG • PNG • WEBP
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    setImage(file);

                                    // Show local preview immediately
                                    setPreview(URL.createObjectURL(file));

                                    const formData = new FormData();
                                    formData.append("banner", file);

                                    try {
                                        const res = await authFetch(
                                            "/landing-offers/upload",
                                            {
                                                method: "POST",
                                                body: formData,
                                            }
                                        );

                                        const data = await res.json();

                                        if (!res.ok) {
                                            await popup.alert(data.message);
                                            return;
                                        }

                                        setBannerPath(data.banner);

                                        setPreview(
                                            data.banner
                                        );

                                        console.log(data.banner);

                                    } catch (err) {
                                        console.error(err);
                                        await popup.alert("Upload failed.");
                                    }
                                }}
                            />

                        </label>

                    </div>

                    {/* Preview */}

                    <div className="rounded-2xl border bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-xl font-semibold">
                            Live Preview
                        </h2>

                        <div className="aspect-video overflow-hidden rounded-2xl border bg-slate-100">

                            {preview ? (

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />

                            ) : (

                                <div className="flex h-full items-center justify-center text-slate-400">
                                    Banner Preview
                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}