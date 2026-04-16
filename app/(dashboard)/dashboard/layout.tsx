"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ SPLASH SCREEN
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          
          {/* ✅ UPDATED LOGO (SIDEBAR MATCH) */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 flex items-center justify-center animate-scale shadow-lg shadow-violet-500/20">
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
              />
            </svg>

          </div>

          {/* TITLE */}
          <h1 className="text-white text-2xl font-bold tracking-wide animate-slideUp">
            FreelanceOS
          </h1>

          {/* SUBTITLE */}
          <p className="text-violet-400 text-sm animate-slideUp delay-200">
            Intelligence Layer
          </p>

        </div>

        {/* ANIMATIONS */}
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }

          .animate-scale {
            animation: scale 1.2s ease-in-out infinite alternate;
          }

          .animate-slideUp {
            animation: slideUp 0.8s ease forwards;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes scale {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  // ✅ MAIN DASHBOARD
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-900 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}