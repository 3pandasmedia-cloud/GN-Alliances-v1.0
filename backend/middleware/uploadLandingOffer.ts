import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "landing-offers"
);

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadPath);
  },

  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `offer-${Date.now()}${ext}`
    );
  },
});

const uploadLandingOffer = multer({
  storage,

  fileFilter: (_, file, cb) => {
    if (
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image files are allowed.")
      );
    }
  },
});

export default uploadLandingOffer;