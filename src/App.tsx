import { useCallback, useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import AnnotationList from "./components/AnnotationList";
import { useHistory } from "./hooks/useHistory";
import { ImageData, Box } from "./types";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);

  const currentImage =
    currentImageIndex >= 0 ? images[currentImageIndex] : null;

  const currentAnnotations = useMemo(
    () => currentImage?.annotations || [],
    [currentImage]
  );
  const updateCurrentAnnotations = useCallback(
    (newAnnotations: Box[]) => {
      if (currentImageIndex === -1) return;

      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentImageIndex] = {
          ...newImages[currentImageIndex],
          annotations: newAnnotations,
        };
        return newImages;
      });
    },
    [currentImageIndex]
  );

  const {
    state: annotations,
    set: setAnnotations,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  } = useHistory(currentAnnotations);

  useEffect(() => {
    reset(currentAnnotations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, reset]);

  useEffect(() => {
    if (currentImageIndex !== -1 && annotations !== currentAnnotations) {
      updateCurrentAnnotations(annotations);
    }
  }, [
    annotations,
    currentAnnotations,
    currentImageIndex,
    updateCurrentAnnotations,
  ]);

  const handleAddImage = (url: string, fileName: string) => {
    const newImage: ImageData = {
      id: Date.now().toString(),
      url: url,
      fileName: fileName,
      annotations: [],
    };
    setImages([...images, newImage]);
    setCurrentImageIndex(images.length);
  };

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleDelete = (index: number) => {
    setAnnotations(annotations.filter((box, i) => i !== index));
  };

  const handleExport = () => {
    if (!currentImage) return;

    const annotationsData = annotations.map((box, index) => ({
      id: index + 1,
      label: box.label,
      x: Math.min(box.startX, box.endX),
      y: Math.min(box.startY, box.endY),
      width: Math.abs(box.endX - box.startX),
      height: Math.abs(box.endY - box.startY),
    }));

    const exportData = {
      image: {
        fileName: currentImage.fileName || "image.jpg",
        width: 800,
        height: 600,
      },
      annotations: annotationsData,
    };

    const jsonString = JSON.stringify(exportData, null, 2);

    //Blob:binary large object
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    a.download = `annotations_${timestamp}.json`;

    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpdateLabel = (index: number, newLabel: string) => {
    const updateAnnotations = [...annotations];
    updateAnnotations[index] = {
      ...updateAnnotations[index],
      label: newLabel,
    };
    setAnnotations(updateAnnotations);
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) undo();
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        ((e.shiftKey && e.key === "z") || e.key === "y")
      ) {
        e.preventDefault();
        if (canRedo) redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <div className="h-screen flex flex-col">
      <Header
        onExport={handleExport}
        hasImage={currentImage !== null}
        hasAnnotations={annotations.length > 0}
      />
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
          setAnnotations={setAnnotations}
          onDelete={handleDelete}
        />
        <AnnotationList
          annotations={annotations}
          onDelete={handleDelete}
          onUpdateLabel={handleUpdateLabel}
        />
      </div>
    </div>
  );
}

export default App;
