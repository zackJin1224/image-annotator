import Image from "../models/Image.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageController {
  static async getAllImages(req, res) {
    try {
      const images = await Image.findAll();

      const imagesWithUrls = images.map((img) => ({
        ...img,
        url: `http://localhost:${
          process.env.PORT || 5000
        }/uploads/${path.basename(img.file_path)}`,
      }));

      res.json({
        success: true,
        data: imagesWithUrls,
      });
    } catch (error) {
      console.error("Error getting images:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get images",
      });
    }
  }

  static async getImageById(req, res) {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);

      if (!image) {
        return res.status(404).json({
          success: false,
          error: "Image not found",
        });
      }

      image.url = `http://localhost:${
        process.env.PORT || 5000
      }/uploads/${path.basename(image.file_path)}`;

      res.json({
        success: true,
        data: image,
      });
    } catch (error) {
      console.error("Error getting image:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get image",
      });
    }
  }

  static async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
      }

      const { filename, path: filePath, size, originalname } = req.file;

      const metadata = await sharp(filePath).metadata();

      const image = await Image.create({
        fileName: originalname,
        filePath: filePath,
        fileSize: size,
        width: metadata.width,
        height: metadata.height,
      });

      res.status(201).json({
        success: true,
        data: {
          ...image,
          url: `http://localhost:${
            process.env.PORT || 5000
          }/uploads/${filename}`,
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);

      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        error: "Failed to upload image",
      });
    }
  }

  static async deleteImage(req, res) {
    try {
      const { id } = req.params;

      const image = await Image.findById(id);

      if (!image) {
        return res.status(404).json({
          success: false,
          error: "Image not found",
        });
      }

      await Image.delete(id);

      if (fs.existsSync(image.file_path)) {
        fs.unlinkSync(image.file_path);
      }

      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete image",
      });
    }
  }
}

export default ImageController;
