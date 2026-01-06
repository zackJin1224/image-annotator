import React from 'react'

interface CanvasProps
{
  imageUrl: string | null;
}

function Canvas({imageUrl}: CanvasProps) {
  return (
    <div className="flex-1 bg-white p-6 flex items-center justify-center overflow-auto">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <p className="text-gray-400 text-lg">
          Canvas area - Upload an image to start
        </p>
      )}
    </div>
  );
}

export default Canvas;

