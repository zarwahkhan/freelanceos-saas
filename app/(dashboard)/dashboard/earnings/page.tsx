"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

type Earning = {
  id: string;
  amount: number;
  source: string;
};

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ AI STATE
  const [aiResult, setAiResult] = useState("");

  const TARGET = 10000;

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/earnings");
      const data = await res.json();
      setEarnings(data?.earnings || []);
    } catch (err) {
      console.error(err);
      setEarnings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  const addEarning = async () => {
    if (!amount || !source) return;

    await fetch("/api/earnings", {
      method: "POST",
      body: JSON.stringify({ amount, source }),
      headers: { "Content-Type": "application/json" },
    });

    setAmount("");
    setSource("");
    fetchEarnings();
  };

  // 🔥 CALCULATIONS
  const total = earnings.reduce((sum, e) => sum + Number(e.amount), 0);
  const progress = Math.min((total / TARGET) * 100, 100);

  // ✅ AI FUNCTION
  const getAIAdvice = async () => {
    try {
      setAiResult("Analyzing...");

      const res = await fetch("/api/ai/exit-advisor", {
        method: "POST",
        body: JSON.stringify({
          total,
          target: TARGET,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setAiResult(data.error || "AI failed");
        return;
      }

      setAiResult(data.result);
    } catch (err) {
      console.error(err);
      setAiResult("AI error");
    }
  };

  return (
    <PageWrapper title="Escape Dashboard 💰">
      {/* 🔥 GOAL TRACKER */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          🚀 Exit Goal Tracker
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          Goal: ${TARGET} → Build your SaaS freedom fund
        </p>

        <div className="w-full bg-slate-700 rounded h-3">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm mt-2 text-green-400">
          ${total} / ${TARGET} ({progress.toFixed(0)}%)
        </p>
      </div>

      {/* ✅ AI BUTTON */}
      <button
        onClick={getAIAdvice}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white mb-4"
      >
        🤖 Get AI Exit Advice
      </button>

      {/* ✅ AI RESULT */}
      {aiResult && (
        <div className="bg-slate-900 p-4 rounded border border-slate-700 whitespace-pre-wrap text-sm text-white mb-6">
          {aiResult}
        </div>
      )}

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Total Earned</p>
          <h2 className="text-2xl font-bold text-green-400">
            ${total}
          </h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Income Sources</p>
          <h2 className="text-2xl font-bold">
            {earnings.length}
          </h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Status</p>
          <h2 className="text-2xl font-bold text-blue-400">
            {progress > 50 ? "On Track 🚀" : "Starting ⚡"}
          </h2>
        </div>
      </div>

      {/* 🔥 ADD INCOME */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Add Freelance Income
        </h3>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount ($)"
            className="flex-1 p-3 rounded bg-slate-900 text-white border border-slate-700"
          />

          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (Fiverr, Client...)"
            className="flex-1 p-3 rounded bg-slate-900 text-white border border-slate-700"
          />

          <button
            onClick={addEarning}
            className="bg-green-600 px-6 py-3 rounded text-white"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔥 HISTORY */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Income History
        </h3>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && earnings.length === 0 && (
          <p className="text-gray-400">No earnings yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {earnings.map((e) => (
            <div
              key={e.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-green-500"
            >
              <h4 className="text-xl font-bold text-green-400">
                ${e.amount}
              </h4>

              <p className="text-gray-400 text-sm">
                {e.source}
              </p>

              <p className="text-xs mt-2 text-gray-500">
                Freelance Income
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}