import React from "react";

function SettingsPage() {
  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            ⚙️ Settings
          </h1>
          <p className="text-gray-600">Customize your annotation experience</p>
        </div>

        <div className="space-y-6">
  
          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              🎨 Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Default Box Color</p>
                  <p className="text-sm text-gray-500">
                    Choose default annotation color
                  </p>
                </div>
                <input
                  type="color"
                  value="#667eea"
                  className="w-12 h-12 rounded cursor-pointer"
                  disabled
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Box Thickness</p>
                  <p className="text-sm text-gray-500">
                    Annotation border width
                  </p>
                </div>
                <select className="modern-input w-32" disabled>
                  <option>2px</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              🏷️ Labels
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-3">
                  Predefined Labels
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Person
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Car
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Object
                  </span>
                  <button
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
                    disabled
                  >
                    + Add Label
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              ⌨️ Keyboard Shortcuts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Undo</span>
                <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                  Ctrl + Z
                </code>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Redo</span>
                <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                  Ctrl + Shift + Z
                </code>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Delete Box</span>
                <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                  Delete / Backspace
                </code>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Cancel Drawing</span>
                <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                  Esc
                </code>
              </div>
            </div>
          </div>

          <div className="modern-card p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              🤖 AI Assistance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">
                    Enable AI Suggestions
                  </p>
                  <p className="text-sm text-gray-500">
                    Get automatic annotation suggestions
                  </p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    disabled
                  />
                  <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all"></span>
                </label>
              </div>
              <p className="text-sm text-gray-500 bg-purple-50 p-3 rounded">
                💡 AI features coming soon in Week 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
