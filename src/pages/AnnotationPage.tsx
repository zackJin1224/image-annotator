import React, { useCallback } from "react";
import { useAnnotationStore } from "../store/useAnnotationStore";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import AnnotationList from "../components/AnnotationList";

function AnnotationPage() {
  const {
    images,
    currentImageIndex,
    getCurrentImage,
    getAnnotations,
    addImage,
    selectImage,
    setAnnotations,
    deleteAnnotation,
    updateLabel,
  } = useAnnotationStore();

  
  const currentImage = getCurrentImage();
  const annotations = getAnnotations();

  
  const handleAddImage = useCallback(addImage, [addImage]);
  const handleSelectImage = useCallback(selectImage, [selectImage]);
  const handleSetAnnotations = useCallback(setAnnotations, [setAnnotations]);
  const handleDeleteAnnotation = useCallback(deleteAnnotation, [
    deleteAnnotation,
  ]);
  const handleUpdateLabel = useCallback(updateLabel, [updateLabel]);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        images={images}
        currentImageIndex={currentImageIndex}
        onAddImage={handleAddImage}
        onSelectImage={handleSelectImage}
      />
      <Canvas
        imageUrl={currentImage?.url || null}
        annotations={annotations}
        setAnnotations={handleSetAnnotations}
        onDelete={handleDeleteAnnotation}
      />
      <AnnotationList
        annotations={annotations}
        onDelete={handleDeleteAnnotation}
        onUpdateLabel={handleUpdateLabel}
      />
    </div>
  );
}

export default AnnotationPage;
