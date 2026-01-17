import express from "express";
import ImageController from "../controllers/imageController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", ImageController.getAllImages);
router.get("/:id", ImageController.getImageById);
router.post("/", upload.single("image"), ImageController.uploadImage);
router.delete("/:id", ImageController.deleteImage);

export default router;
