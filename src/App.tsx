import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AnnotationPage from "./pages/AnnotationPage";
import ProjectsPage from "./pages/ProjectPage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col app-background">
        <header className="glass-effect border-b border-gray-200">
          <div className="relative flex items-center justify-center px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🎨</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image Annotator
              </h1>
            </div>
          </div>

          <nav className="border-t border-white/10">
            <div className="flex justify-center gap-8 px-6 py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1 transition-all"
                    : "text-gray-600 hover:text-purple-600 font-medium transition-colors"
                }
              >
                📋 Annotator
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1 transition-all"
                    : "text-gray-600 hover:text-purple-600 font-medium transition-colors"
                }
              >
                📁 Projects
              </NavLink>
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1 transition-all"
                    : "text-gray-600 hover:text-purple-600 font-medium transition-colors"
                }
              >
                📊 Data
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-1 transition-all"
                    : "text-gray-600 hover:text-purple-600 font-medium transition-colors"
                }
              >
                ⚙️ Settings
              </NavLink>
            </div>
          </nav>
        </header>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<AnnotationPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
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
