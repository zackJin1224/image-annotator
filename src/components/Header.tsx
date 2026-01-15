/**
onChange: React.ChangeEvent<HTMLInputElement>
onClick: React.MouseEvent<HTMLButtonElement>
onSubmit: React.FormEvent<HTMLFormElement>
 */
import React from "react";

interface HeaderProps {
  onExport: () => void;
  hasImage: boolean;
  hasAnnotations: boolean;
}

function Header({ onExport, hasImage, hasAnnotations }: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="relative flex items-center justify-center">
        <h1 className="text-2xl font-bold">Image Annotator</h1>

        <div className="absolute right-0 flex gap-4">
          <button
            onClick={onExport}
            disabled={!hasImage || !hasAnnotations}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Export JSON
          </button>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
