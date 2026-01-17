import React from "react";

function StatsPage() {
  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            📊 Statistics & Analytics
          </h1>
          <p className="text-gray-600">
            Track your annotation progress and AI performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🖼️</span>
              <span className="text-3xl font-bold text-purple-600">0</span>
            </div>
            <h4 className="font-semibold text-gray-700">Total Images</h4>
            <p className="text-xs text-gray-500 mt-1">Images uploaded</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🏷️</span>
              <span className="text-3xl font-bold text-blue-600">0</span>
            </div>
            <h4 className="font-semibold text-gray-700">Annotations</h4>
            <p className="text-xs text-gray-500 mt-1">Boxes created</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🤖</span>
              <span className="text-3xl font-bold text-green-600">0%</span>
            </div>
            <h4 className="font-semibold text-gray-700">AI Accuracy</h4>
            <p className="text-xs text-gray-500 mt-1">Coming soon</p>
          </div>

          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">⏱️</span>
              <span className="text-3xl font-bold text-orange-600">0m</span>
            </div>
            <h4 className="font-semibold text-gray-700">Time Saved</h4>
            <p className="text-xs text-gray-500 mt-1">By AI assistance</p>
          </div>
        </div>

        <div className="modern-card p-8 text-center">
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Analytics Dashboard
          </h3>
          <p className="text-gray-500 mb-6">
            Detailed charts and insights will appear here once you start
            annotating
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">Annotation Activity</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">Label Distribution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
