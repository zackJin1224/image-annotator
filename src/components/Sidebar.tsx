import React from "react";
import { ImageData } from "../types";

interface SidebarProps {
  images: ImageData[];
  currentImageIndex: number;
  onAddImage: (url: string, fileName: string) => void;
  onSelectImage: (index: number) => void;
}

function Sidebar({
  images,
  currentImageIndex,
  onAddImage,
  onSelectImage,
}: SidebarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onAddImage(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Images
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="sidebar-upload"
        className="hidden"
      />
      <label
        htmlFor="sidebar-upload"
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded cursor-pointer mb-4"
      >
        + Upload Image
      </label>

      <div className="space-y-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => onSelectImage(index)}
            className={`
              p - 2 rounded cursor-pointer border-2
            ${
              index === currentImageIndex
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }
            `}
          >
            <img
              src={image.url}
              alt={image.fileName}
              className="w-full h-32 object-cover rounded mb-2"
            />

            <p className="text-sm truncate text-center" title={image.fileName}>
              {image.fileName}
            </p>

            <p className="text-xs text-gray-500 text-center">
              {image.annotations.length} annotations
            </p>
          </div>
        ))}

        {images.length === 0 && (
          <p className="text-gray-500 text-center mt-8">
            No images uploaded yet
          </p>
        )}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
