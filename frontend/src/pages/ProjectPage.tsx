import React from "react";

function ProjectsPage() {
  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            📁 Project Management
          </h1>
          <p className="text-gray-600">
            Organize and manage your annotation projects
          </p>
        </div>

        
        <div className="modern-card p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first project to organize your annotations
          </p>
          <button className="modern-button">➕ Create New Project</button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="modern-card p-6">
            <div className="text-3xl mb-3">🗂️</div>
            <h4 className="font-bold text-gray-800 mb-2">Organize</h4>
            <p className="text-sm text-gray-600">
              Group related images and annotations into projects
            </p>
          </div>

          <div className="modern-card p-6">
            <div className="text-3xl mb-3">👥</div>
            <h4 className="font-bold text-gray-800 mb-2">Collaborate</h4>
            <p className="text-sm text-gray-600">
              Share projects with team members (Coming soon)
            </p>
          </div>

          <div className="modern-card p-6">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="font-bold text-gray-800 mb-2">Track Progress</h4>
            <p className="text-sm text-gray-600">
              Monitor annotation completion status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
