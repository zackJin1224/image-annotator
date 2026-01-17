import { create } from "zustand";
import { ImageData, Box } from "../types";
import toast from "react-hot-toast";

interface AnnotationStore {
  images: ImageData[];
  currentImageIndex: number;
  imageHistories: Map<string, { history: Box[][]; historyIndex: number }>;

  getCurrentImage: () => ImageData | null;
  getAnnotations: () => Box[];

  addImage: (url: string, fileName: string) => void;
  selectImage: (index: number) => void;
  deleteImage: (index: number) => void;
  setAnnotations: (annotations: Box[]) => void;
  deleteAnnotation: (index: number) => void;
  updateLabel: (index: number, newLabel: string) => void;

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  exportJSON: () => void;
}

export const useAnnotationStore = create<AnnotationStore>((set, get) => ({
  images: [],
  currentImageIndex: -1,
  imageHistories: new Map(),

  getCurrentImage: () => {
    const state = get();
    return state.currentImageIndex >= 0
      ? state.images[state.currentImageIndex]
      : null;
  },

  getAnnotations: () => {
    const state = get();
    const currentImage =
      state.currentImageIndex >= 0
        ? state.images[state.currentImageIndex]
        : null;
    return currentImage?.annotations || [];
  },

  addImage: (url, fileName) => {
    set((state) => {
      const newImage: ImageData = {
        id: Date.now().toString(),
        url,
        fileName,
        annotations: [],
      };

      const newHistories = new Map(state.imageHistories);
      newHistories.set(newImage.id, {
        history: [[]],
        historyIndex: 0,
      });

      toast.success(`Added: ${fileName}`);
      return {
        images: [...state.images, newImage],
        currentImageIndex: state.images.length,
        imageHistories: newHistories,
      };
    });
  },

  selectImage: (index) => {
    set({ currentImageIndex: index });
  },

  deleteImage: (index) => {
    set((state) => {
      const deletedImage = state.images[index];
      const newImages = state.images.filter((_, i) => i !== index);
      let newIndex = state.currentImageIndex;

      if (index === state.currentImageIndex) {
        newIndex =
          newImages.length > 0 ? Math.min(index, newImages.length - 1) : -1;
      } else if (index < state.currentImageIndex) {
        newIndex = state.currentImageIndex - 1;
      }

      const newHistories = new Map(state.imageHistories);
      newHistories.delete(deletedImage.id);

      toast.success(`Deleted: ${deletedImage.fileName}`);

      return {
        images: newImages,
        currentImageIndex: newIndex,
        imageHistories: newHistories,
      };
    });
  },

  setAnnotations: (annotations) => {
    set((state) => {
      if (state.currentImageIndex === -1) return state;

      const currentImage = state.images[state.currentImageIndex];
      const imageId = currentImage.id;

      const currentHistory = state.imageHistories.get(imageId) || {
        history: [[]],
        historyIndex: 0,
      };

      const newImages = [...state.images];
      newImages[state.currentImageIndex] = {
        ...newImages[state.currentImageIndex],
        annotations,
      };

      const newHistory = [
        ...currentHistory.history.slice(0, currentHistory.historyIndex + 1),
        annotations,
      ];

      const newHistories = new Map(state.imageHistories);
      newHistories.set(imageId, {
        history: newHistory,
        historyIndex: currentHistory.historyIndex + 1,
      });

      return {
        images: newImages,
        imageHistories: newHistories,
      };
    });
  },

  deleteAnnotation: (index) => {
    set((state) => {
      if (state.currentImageIndex === -1) return state;

      const currentImage = state.images[state.currentImageIndex];
      const annotations = currentImage.annotations || [];
      const imageName = currentImage.fileName || "image";
      const boxLabel = annotations[index]?.label || "Box";
      const imageId = currentImage.id;

      const currentHistory = state.imageHistories.get(imageId) || {
        history: [[]],
        historyIndex: 0,
      };

      const newAnnotations = annotations.filter((_, i) => i !== index);

      const newImages = [...state.images];
      newImages[state.currentImageIndex] = {
        ...newImages[state.currentImageIndex],
        annotations: newAnnotations,
      };

      const newHistory = [
        ...currentHistory.history.slice(0, currentHistory.historyIndex + 1),
        newAnnotations,
      ];

      const newHistories = new Map(state.imageHistories);
      newHistories.set(imageId, {
        history: newHistory,
        historyIndex: currentHistory.historyIndex + 1,
      });

      toast.success(`${imageName}: ${boxLabel} #${index + 1} deleted`);

      return {
        images: newImages,
        imageHistories: newHistories,
      };
    });
  },

  updateLabel: (index, newLabel) => {
    const state = get();
    const annotations = state.getAnnotations();
    const newAnnotations = [...annotations];
    newAnnotations[index] = { ...newAnnotations[index], label: newLabel };
    state.setAnnotations(newAnnotations);
  },

  canUndo: () => {
    const state = get();
    const currentImage = state.getCurrentImage();
    if (!currentImage) return false;

    const imageHistory = state.imageHistories.get(currentImage.id);
    return imageHistory ? imageHistory.historyIndex > 0 : false;
  },

  canRedo: () => {
    const state = get();
    const currentImage = state.getCurrentImage();
    if (!currentImage) return false;

    const imageHistory = state.imageHistories.get(currentImage.id);
    return imageHistory
      ? imageHistory.historyIndex < imageHistory.history.length - 1
      : false;
  },

  undo: () => {
    set((state) => {
      const currentImage = state.getCurrentImage();
      if (!currentImage) return state;

      const imageHistory = state.imageHistories.get(currentImage.id);
      if (!imageHistory || imageHistory.historyIndex <= 0) return state;

      const newIndex = imageHistory.historyIndex - 1;
      const annotations = imageHistory.history[newIndex];

      const newImages = [...state.images];
      newImages[state.currentImageIndex] = {
        ...newImages[state.currentImageIndex],
        annotations,
      };

      const newHistories = new Map(state.imageHistories);
      newHistories.set(currentImage.id, {
        ...imageHistory,
        historyIndex: newIndex,
      });

      return {
        images: newImages,
        imageHistories: newHistories,
      };
    });
  },

  redo: () => {
    set((state) => {
      const currentImage = state.getCurrentImage();
      if (!currentImage) return state;

      const imageHistory = state.imageHistories.get(currentImage.id);
      if (
        !imageHistory ||
        imageHistory.historyIndex >= imageHistory.history.length - 1
      ) {
        return state;
      }

      const newIndex = imageHistory.historyIndex + 1;
      const annotations = imageHistory.history[newIndex];

      const newImages = [...state.images];
      newImages[state.currentImageIndex] = {
        ...newImages[state.currentImageIndex],
        annotations,
      };

      const newHistories = new Map(state.imageHistories);
      newHistories.set(currentImage.id, {
        ...imageHistory,
        historyIndex: newIndex,
      });

      return {
        images: newImages,
        imageHistories: newHistories,
      };
    });
  },

  exportJSON: () => {
    const state = get();
    const currentImage = state.getCurrentImage();
    if (!currentImage) return;

    const annotations = state.getAnnotations();
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
    toast.success(`Exported ${annotations.length} annotations`);
  },
}));
