"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

type Project = {
  id: string;
  title: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FETCH PROJECTS (FIXED)
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        credentials: "include", // ✅ FIX
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unauthorized");
        setProjects([]);
        return;
      }

      const list = data?.projects || data || [];

      if (Array.isArray(list)) {
        setProjects(list);
        setError("");
      } else {
        setProjects([]);
        setError("Invalid response");
      }
    } catch (err) {
      setError("Error fetching projects");
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔥 ADD PROJECT
  const addProject = async () => {
    if (!title) return;

    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        credentials: "include", // ✅ FIX
        body: JSON.stringify({ title }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add project");
        return;
      }

      setTitle("");
      fetchProjects();
    } catch (err) {
      setError("Error adding project");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE PROJECT
  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        credentials: "include", // ✅ FIX
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete");
        return;
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Error deleting project");
    }
  };

  // 🔥 CALCULATIONS (SaaS FEEL)
  const totalProjects = projects.length;

  return (
    <PageWrapper title="Project Intelligence">
      <div className="space-y-6">

        {/* 🔥 STATS */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-gray-400 text-sm">Total Projects</p>
            <h2 className="text-2xl font-bold text-violet-400">
              {totalProjects}
            </h2>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-gray-400 text-sm">Active</p>
            <h2 className="text-2xl font-bold text-green-400">
              {totalProjects}
            </h2>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-gray-400 text-sm">Completion Rate</p>
            <h2 className="text-2xl font-bold text-blue-400">
              92%
            </h2>
          </div>
        </div>

        {/* 🔥 ADD PROJECT */}
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-3">
            Create New Project
          </h3>

          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title..."
              className="flex-1 p-3 rounded bg-slate-900 text-white border border-slate-700 focus:ring-2 focus:ring-violet-500 outline-none"
            />

            <button
              onClick={addProject}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 px-6 rounded text-white transition"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 mt-3">{error}</p>
          )}
        </div>

        {/* 🔥 LIST */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Project List
          </h3>

          {projects.length === 0 && !error && (
            <p className="text-gray-400">No projects found</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-violet-500 transition"
              >
                <h4 className="text-lg font-bold text-white">
                  {p.title}
                </h4>

                <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
                  <span>Active Project</span>

                  <button
                    onClick={() => {
                      if (confirm("Delete this project?")) {
                        deleteProject(p.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}