import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Header from "./components/Header";
import AnnotationPage from "./pages/AnnotationPage";
import ProjectsPage from "./pages/ProjectPage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import { useAnnotationStore } from "./store/useAnnotationStore";

function App() {
  const getCurrentImage = useAnnotationStore((state) => state.getCurrentImage);
  const getAnnotations = useAnnotationStore((state) => state.getAnnotations);
  const exportJSON = useAnnotationStore((state) => state.exportJSON);

  const currentImage = getCurrentImage();
  const annotations = getAnnotations();

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col">
        <Header
          onExport={exportJSON}
          hasImage={currentImage !== null}
          hasAnnotations={annotations.length > 0}
        />

        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center space-x-12 py-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 font-medium"
                }
              >
                Annotator
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 font-medium transition-colors"
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 font-medium transition-colors"
                }
              >
                Data
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 font-medium transition-colors"
                }
              >
                Settings
              </NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AnnotationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
