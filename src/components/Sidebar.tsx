import React from "react";
import { ImageData } from "../types";

interface SidebarProps {
  images: ImageData[];
  currentImageIndex: number;
  onAddImage: (url: string, fileName: string) => void;
  onSelectImage: (index: number) => void;
  onDeleteImage: (index: number) => void;
}

function Sidebar({
  images,
  currentImageIndex,
  onAddImage,
  onSelectImage,
  onDeleteImage,
}: SidebarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onAddImage( reader.result as string, file.name );
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="w-64 glass-effect border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h2 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
          Images
          <span className="text-sm font-normal text-gray-500">
            ({images.length})
          </span>
        </h2>
      </div>

      <div className="p-4">
        <label className="modern-button w-full flex items-center justify-center gap-2 cursor-pointer">
          <span>📤</span>
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {images.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No images uploaded yet</p>
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={image.id}
              className={`modern-card p-3 cursor-pointer transition-all relative group ${
                index === currentImageIndex
                  ? "ring-2 ring-purple-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteImage(index);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                title="Delete image"
              >
                X
              </button>

              <div onClick={() => onSelectImage(index)}>
                <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.fileName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600 truncate font-medium">
                  {image.fileName}
                </p>
                <p className="text-xs text-gray-400">
                  {image.annotations.length} annotations
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default React.memo(Sidebar);
