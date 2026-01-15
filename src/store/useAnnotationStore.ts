import { create } from "zustand";
import { ImageData, Box } from "../types";

interface AnnotationStore {
  // States
  images: ImageData[];
  currentImageIndex: number;

  // Calculate propoties
  getCurrentImage: () => ImageData | null;
  getAnnotations: () => Box[];

  // Actions
  addImage: (url: string, fileName: string) => void;
  selectImage: (index: number) => void;
  deleteImage: (index: number) => void;
  setAnnotations: (annotations: Box[]) => void;
  deleteAnnotation: (index: number) => void;
  updateLabel: (index: number, newLabel: string) => void;

  // Undo and redo
  history: Box[][];
  historyIndex: number;
  undo: () => void;
  redo: () => void;

  // Export
  exportJSON: () => void;
}

export const useAnnotationStore = create<AnnotationStore>(
    (set, get) => ({
      // Initial states
      images: [],
      currentImageIndex: -1,

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

      // History
      history: [[]],
      historyIndex: 0,

      // Actions
      addImage: (url, fileName) => {
        set((state) => {
          const newImage: ImageData = {
            id: Date.now().toString(),
            url,
            fileName,
            annotations: [],
          };
          return {
            images: [...state.images, newImage],
            currentImageIndex: state.images.length,
          };
        });
      },

      selectImage: (index) => {
        set({ currentImageIndex: index });
      },

      deleteImage: (index) => {
        set((state) => {
          const newImages = state.images.filter((_, i) => i !== index);
          let newIndex = state.currentImageIndex;

          if (index === state.currentImageIndex) {
            newIndex = -1;
          } else if (index < state.currentImageIndex) {
            newIndex = state.currentImageIndex - 1;
          }

          return {
            images: newImages,
            currentImageIndex: newIndex,
          };
        });
      },

      setAnnotations: (annotations) => {
        set((state) => {
          if (state.currentImageIndex === -1) return state;

          const newImages = [...state.images];
          newImages[state.currentImageIndex] = {
            ...newImages[state.currentImageIndex],
            annotations,
          };

          return {
            images: newImages,
            history: [
              ...state.history.slice(0, state.historyIndex + 1),
              annotations,
            ],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      deleteAnnotation: (index) => {
        const state = get();
        const annotations = state.getAnnotations();
        const newAnnotations = annotations.filter((_, i) => i !== index);
        state.setAnnotations(newAnnotations);
      },

      updateLabel: (index, newLabel) => {
        const state = get();
        const annotations = state.getAnnotations();
        const newAnnotations = [...annotations];
        newAnnotations[index] = { ...newAnnotations[index], label: newLabel };
        state.setAnnotations(newAnnotations);
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            const annotations = state.history[newIndex];

            if (state.currentImageIndex === -1) return state;

            const newImages = [...state.images];
            newImages[state.currentImageIndex] = {
              ...newImages[state.currentImageIndex],
              annotations,
            };

            return {
              images: newImages,
              historyIndex: newIndex,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            const annotations = state.history[newIndex];

            if (state.currentImageIndex === -1) return state;

            const newImages = [...state.images];
            newImages[state.currentImageIndex] = {
              ...newImages[state.currentImageIndex],
              annotations,
            };

            return {
              images: newImages,
              historyIndex: newIndex,
            };
          }
          return state;
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
      },
    }
    )
);
