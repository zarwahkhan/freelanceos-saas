
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
import { FolderKanban, Users, DollarSign, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<{ projects: number; clients: number; earnings: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const statsCards = [
    { title: "Projects", icon: FolderKanban, value: stats?.projects || 0 },
    { title: "Clients", icon: Users, value: stats?.clients || 0 },
    { title: "Earnings", icon: DollarSign, value: `$${stats?.earnings || 0}` },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* <Sidebar /> */}

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6  text-white">
          Welcome, {session?.user?.name || "Freelancer"}
        </h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between hover:scale-105 transform transition duration-300 cursor-pointer bg-violet-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <card.icon className="w-6 h-6 flex-shrink-0" />
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        
        {/* ✅ AI PREVIEW CARD (PRO LOOK) */}
           <div className="bg-slate-900 text-white p-5 rounded-2xl shadow mt-8 border border-violet-600 hover:shadow-lg transition">
           <div className="flex items-center gap-3 mb-2">
           <Brain className="w-5 h-5 text-violet-500" />
           <h2 className="font-bold text-lg text-violet-400">AI Suggestion</h2>
           </div>

            <p className="text-sm text-gray-400 mb-3">
                   Use AI Insights to analyze clients, projects and pricing.
                </p>

             <button
             onClick={() => router.push("/dashboard/ai-insights")}
             className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition">
             View Insights
            </button>
           </div>
      </main>
    </div>
  );
}