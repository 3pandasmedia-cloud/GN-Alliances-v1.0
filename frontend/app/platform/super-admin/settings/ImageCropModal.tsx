"use client";

import Cropper from "react-easy-crop";

type Props = {
    image: string;
    crop: { x: number; y: number };
    zoom: number;

    setCrop: React.Dispatch<any>;
    setZoom: React.Dispatch<any>;

    setCroppedAreaPixels: React.Dispatch<any>;

    onClose: () => void;
    onSave: () => void;
};

export default function ImageCropModal({
    image,
    crop,
    zoom,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
    onClose,
    onSave,
}: Props) {
    return (
        <div className="fixed inset-0 z-[9999]">

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />

            {/* Modal */}

            <div
                className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-3xl
          w-[95%]
          max-w-2xl
          p-6
        "
            >
                <h2 className="text-2xl font-bold mb-6">
                    Crop Profile Picture
                </h2>

                {/* Crop Area */}

                <div
                    className="
            relative
            w-full
            h-[400px]
            bg-black
            rounded-2xl
            overflow-hidden
          "
                >
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedAreaPixels) => {
                            setCroppedAreaPixels(croppedAreaPixels);
                        }}
                    />
                </div>

                {/* Zoom */}

                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Zoom
                    </label>

                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) =>
                            setZoom(
                                Number(e.target.value)
                            )
                        }
                        className="w-full"
                    />
                </div>

                {/* Buttons */}

                <div className="flex gap-3 mt-6">

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
                        onClick={onSave}
                        className="
              flex-1
              h-12
              rounded-xl
              bg-[#0B2E83]
              text-white
            "
                    >
                        Save Crop
                    </button>

                </div>

            </div>

        </div>
    );
}