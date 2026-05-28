import { Router, Request, Response } from "express";
import { getUserProfile } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;
