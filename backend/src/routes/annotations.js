import express from "express";
import AnnotationController from "../controllers/annotationController.js";

const router = express.Router();

router.get(
  "/images/:imageId/annotations",
  AnnotationController.getAnnotationsByImageId
);
router.post(
  "/images/:imageId/annotations",
  AnnotationController.createAnnotation
);
router.post(
  "/images/:imageId/annotations/batch",
  AnnotationController.createBatchAnnotations
);
router.put( "/annotations/:id", AnnotationController.updateAnnotation );

router.delete( "/annotations/:id", AnnotationController.deleteAnnotation );

router.put(
  "/images/:imageId/annotations",
  AnnotationController.replaceAllAnnotations
);

export default router;
