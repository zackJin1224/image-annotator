import React from "react";
import { Box } from "../types";

interface AnnotationListProps {
  annotations: Box[];
  onDelete: (index: number) => void;
  onUpdateLabel: (index: number, newLabel: string) => void;
  onExport: () => void; 
  hasAnnotations: boolean;
}

function AnnotationList({
  annotations,
  onDelete,
  onUpdateLabel,
  onExport, 
  hasAnnotations,
}: AnnotationListProps) {
  return (
    <aside className="w-64 glass-effect border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h2 className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2">
          Annotations
          <span className="text-sm font-normal text-gray-500">
            ({annotations.length})
          </span>
        </h2>
      </div>

      <div className="p-4">
        <button
          onClick={onExport}
          disabled={!hasAnnotations}
          className="modern-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <span>📥</span>
          <span>Export JSON</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {annotations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No annotations yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Draw on the canvas to add
            </p>
          </div>
        ) : (
          annotations.map((box, index) => (
            <div key={index} className="modern-card p-4 space-y-3 fade-in">
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📍</span>
                    <span className="font-semibold text-gray-700">
                      Box #{index + 1}
                    </span>
                  </div>

                  
                  <input
                    type="text"
                    value={box.label}
                    onChange={(e) => onUpdateLabel(index, e.target.value)}
                    placeholder="Add label..."
                    className="modern-input w-full text-sm"
                  />
                </div>

                
                <button
                  onClick={() => onDelete(index)}
                  className="ml-3 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete annotation"
                >
                  ❌
                </button>
              </div>

              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Position:</span>
                  <div className="font-mono text-gray-700 mt-1">
                    X: {Math.min(box.startX, box.endX).toFixed(0)}
                    <br />
                    Y: {Math.min(box.startY, box.endY).toFixed(0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Size:</span>
                  <div className="font-mono text-gray-700 mt-1">
                    W: {Math.abs(box.endX - box.startX).toFixed(0)}
                    <br />
                    H: {Math.abs(box.endY - box.startY).toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default React.memo(AnnotationList);
