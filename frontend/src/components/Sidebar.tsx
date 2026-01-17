import React, { useState } from "react";
import { ImageData } from "../types";

interface SidebarProps {
  images: ImageData[];
  currentImageIndex: number;
  onAddImage: (file: File) => Promise<void>;
  onSelectImage: (index: number) => void;
  onDeleteImage: (index: number) => Promise<void>;
}

interface DeleteModalProps {
  isOpen: boolean;
  fileName: string;
  annotationCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  fileName,
  annotationCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm
            </h3>
            <div className="text-sm text-gray-600 mb-4">
              <p className="mb-2">
                Are you sure you want to delete{" "}
                <span className="font-medium">"{fileName}"</span> ?
              </p>
              <p className="mb-4">
                This operation will simultaneously remove all annotation boxes
                from this image. Total of {annotationCount}
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      This action cannot be undone. Once deleted, it cannot be
                      recovered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors order-1 sm:order-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Sidebar({
  images,
  currentImageIndex,
  onAddImage,
  onSelectImage,
  onDeleteImage,
}: SidebarProps) {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    index: number | null;
    fileName: string;
    annotationCount: number;
  }>({
    isOpen: false,
    index: null,
    fileName: "",
    annotationCount: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onAddImage(file);
    e.target.value = "";
  };
  const handleDeleteClick = (
    index: number,
    fileName: string,
    annotationCount: number
  ) => {
    setDeleteModal({
      isOpen: true,
      index,
      fileName,
      annotationCount,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.index !== null) {
      onDeleteImage(deleteModal.index);
    }
    setDeleteModal({
      isOpen: false,
      index: null,
      fileName: "",
      annotationCount: 0,
    });
  };

  const cancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      index: null,
      fileName: "",
      annotationCount: 0,
    });
  };

  return (
    <>
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
                    handleDeleteClick(
                      index,
                      image.fileName,
                      image.annotations.length
                    );
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

      <DeleteModal
        isOpen={deleteModal.isOpen}
        fileName={deleteModal.fileName}
        annotationCount={deleteModal.annotationCount}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default React.memo(Sidebar);
