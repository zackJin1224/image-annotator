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
    deleteImage,
    selectImage,
    setAnnotations,
    deleteAnnotation,
    updateLabel,
    exportJSON,
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

  const [shouldThrowError, setShouldThrowError] = React.useState(false);

  if (shouldThrowError) {
    throw new Error("This is a test error!");
  }
  return (
    <div className="flex flex-1 overflow-hidden bg-gray-50 border-t border-gray-200">
      <button
        onClick={() => setShouldThrowError(true)}
        className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded z-50"
      >
        Test Error Boundary
      </button>
      <Sidebar
        images={images}
        currentImageIndex={currentImageIndex}
        onAddImage={handleAddImage}
        onSelectImage={handleSelectImage}
        onDeleteImage={deleteImage}
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
        onExport={exportJSON}
        hasAnnotations={annotations.length > 0}
      />
    </div>
  );
}

export default AnnotationPage;
