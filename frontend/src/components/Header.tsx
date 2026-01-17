import React from "react";

interface HeaderProps {
  onExport: () => void;
  hasImage: boolean;
  hasAnnotations: boolean;
}

function Header({ onExport, hasImage, hasAnnotations }: HeaderProps) {
  return (
    <header className="glass-effect border-b border-white/30 shadow-lg">
      <div className="relative flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Image Annotator
          </h1>
        </div>

        <div className="absolute right-6 flex gap-4">
          <button
            onClick={onExport}
            disabled={!hasImage || !hasAnnotations}
            className="modern-button disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-2"
          >
            <span>📥</span>
            Export JSON
          </button>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
