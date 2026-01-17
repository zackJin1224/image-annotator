import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AnnotationPage from "./pages/AnnotationPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col app-background">
        <header className="glass-effect border-b border-gray-200">
          <div className="relative flex items-center px-6 py-4">
            <div className="absolute left-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  Auto-save enabled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mx-auto">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image Annotator
              </h1>
            </div>
          </div>
        </header>

        <ErrorBoundary>
          <AnnotationPage />
        </ErrorBoundary>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
              padding: "12px 16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
              style: {
                border: "1px solid #d1fae5",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
              style: {
                border: "1px solid #fee2e2",
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

