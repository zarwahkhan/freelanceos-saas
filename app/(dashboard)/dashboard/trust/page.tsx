"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

export default function TrustPage() {
  const [score, setScore] = useState(0);
  const [breakdown, setBreakdown] = useState<any>({
    projects: 0,
    clients: 0,
    earnings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchScore = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/trust");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load score");
        return;
      }

      setScore(data.score || 0);
      setBreakdown(data.breakdown || {});
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching trust score");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  // 🔥 TRUST LEVEL
  const getLevel = () => {
    if (score > 80) return "Elite";
    if (score > 60) return "Strong";
    if (score > 40) return "Growing";
    return "Starter";
  };

  return (
    <PageWrapper title="Trust Graph Dashboard">
      <div className="space-y-6">

        {/* 🔥 HERO CARD */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#020617] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Trust Score
            </h2>

            <p className="text-slate-400 text-sm">
              Your global freelancer credibility index
            </p>

            <p className="mt-2 text-violet-400 text-sm">
              Level: {getLevel()}
            </p>
          </div>

          {/* 🔥 SCORE CIRCLE */}
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>

            <div
              className="absolute inset-0 rounded-full border-4 border-violet-500"
              style={{
                clipPath: `inset(${100 - score}% 0 0 0)`,
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
              {score}
            </div>
          </div>
        </div>

        {/* 🔥 STATS BREAKDOWN */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-[#020617] border border-slate-800 rounded-xl p-4 hover:border-violet-500 transition">
            <p className="text-slate-400 text-xs">Projects Impact</p>
            <h3 className="text-xl font-bold text-white">
              {breakdown.projects || 0}
            </h3>
          </div>

          <div className="bg-[#020617] border border-slate-800 rounded-xl p-4 hover:border-blue-500 transition">
            <p className="text-slate-400 text-xs">Client Trust</p>
            <h3 className="text-xl font-bold text-white">
              {breakdown.clients || 0}
            </h3>
          </div>

          <div className="bg-[#020617] border border-slate-800 rounded-xl p-4 hover:border-green-500 transition">
            <p className="text-slate-400 text-xs">Revenue Strength</p>
            <h3 className="text-xl font-bold text-white">
              ${breakdown.earnings || 0}
            </h3>
          </div>

        </div>

        {/* 🔥 AI INSIGHTS */}
        <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">
            🤖 AI Trust Insights
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">
            <li>✔ More completed projects = higher trust</li>
            <li>✔ Consistent earnings boost credibility</li>
            <li>✔ More clients = stronger network</li>
          </ul>
        </div>

        {/* 🔥 ACTIONS */}
        <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h3 className="text-white font-semibold">
              Boost Your Trust Score 🚀
            </h3>
            <p className="text-slate-400 text-sm">
              Complete projects, add earnings & grow your network
            </p>
          </div>

          <button
            onClick={fetchScore}
            className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl text-white transition"
          >
            Refresh Score
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-slate-400 text-sm">Loading...</p>
        )}

      </div>
    </PageWrapper>
  );
}