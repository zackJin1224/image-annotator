import React from "react";
import { Box } from "../types";

interface AnnotationListProps {
  annotations: Box[];
  onDelete: (index: number) => void;
}

function AnnotationList({ annotations, onDelete }: AnnotationListProps) {
  return (
    <div className="w-64 bg-gray-50 p-4 overflow-y-auto border-l border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Annotations({annotations.length})
      </h2>
      {annotations.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No annotations yet</p>
      ) : (
        <ul className="space-y-2">
          {/*Display annotations*/}
          {annotations.map((box, index) => (
            <li key={index}>
              <div className="bg-white p-3 rounded border border-gray-200">
                {/*Show Box number and delete button*/}
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm text-gray-700">
                    Box #{index + 1}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </div>
                {/*Show cooradinates info*/}
                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    Start : ({box.startX},{box.startY})
                  </p>
                  <p>
                    End : ({box.endX},{box.endY})
                  </p>

                  <p>
                    Size : {Math.abs(box.endX - box.startX)} *{" "}
                    {Math.abs(box.endY - box.startY)}{" "}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default AnnotationList;
