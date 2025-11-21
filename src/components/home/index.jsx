import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import pathList from "./pathList.js";

const Index = () => {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pathList;
    return pathList.filter(
      (p) =>
        (p.label && p.label.toLowerCase().includes(q)) ||
        (p.path && p.path.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-xl border border-slate-200 flex overflow-hidden">
        <aside className="w-64 bg-slate-50 border-r border-slate-200 p-5 flex flex-col gap-5">
          <div className="text-xl font-semibold text-slate-700">Mini Projects</div>

          {/* Search */}
          <label className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-400 transition-all"
            />
            <span className="absolute right-3 top-2.5 text-slate-400 text-sm select-none">⌕</span>
          </label>

          {/* View toggle */}
          <div className="flex items-center gap-2">
            {["list", "grid"].map((mode) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === mode
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <div className="mt-auto text-xs text-slate-500 border-t border-slate-200 pt-3">
            Tip: click a card to open the project.
          </div>
        </aside>
        <main className="flex-1 p-6 flex flex-col overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span> project
              {filtered.length !== 1 && "s"}
            </div>
            <div className="text-sm text-slate-400">© {new Date().getFullYear()} — Avanish</div>
          </div>

          <div className="flex-1 min-h-0">
            {view === "list" ? (
              <div className="flex flex-col gap-3 overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scrollbar-track-transparent">
                {filtered.map((item, i) => (
                  <NavLink
                    to={item.path}
                    key={i}
                    className={({ isActive }) =>
                      `group  rounded-lg border p-4 flex items-center gap-4 transition-colors duration-150 mb-1 ${
                        isActive
                          ? "bg-slate-900 text-white border-slate-800"
                          : "bg-white hover:bg-slate-50 border-slate-200"
                      }`
                    }
                  >
                    <div className="w-12 h-12 rounded-md flex items-center justify-center bg-slate-100 text-slate-700 font-semibold text-sm select-none uppercase">
                      {item.label?.charAt(0) || "P"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-medium truncate">{item.label}</div>
                      <div className="text-sm text-slate-400 truncate">{item.path}</div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-400">Project</span>
                      <span className="mt-1 text-xs text-slate-500">{item.tag || "-"}</span>
                    </div>
                  </NavLink>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center text-slate-400 mt-8">
                    No projects match your search.
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scrollbar-track-transparent">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((item, i) => (
                    <NavLink
                      to={item.path}
                      key={i}
                      className={({ isActive }) =>
                        ` rounded-lg border p-4 h-full flex flex-col justify-between transition-all ${
                          isActive
                            ? "bg-slate-900 text-white border-slate-800"
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        }`
                      }
                    >
                      <div>
                        <div className="text-sm text-slate-400">
                          {item.category || "Utility"}
                        </div>
                        <div className="text-lg font-semibold mt-2 truncate">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-1 truncate">
                          {item.path}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          {item.language || "React"}
                        </div>
                        <div className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 select-none">
                          Open
                        </div>
                      </div>
                    </NavLink>
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-full text-center text-slate-400 mt-8">
                      No projects match your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
