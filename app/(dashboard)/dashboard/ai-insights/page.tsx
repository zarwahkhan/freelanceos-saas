
"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";

export default function ClientIntentPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const callAI = async (body: any) => {
    setLoading(true);
    setResult("Analyzing client intent...");

    try {
      const res = await fetch("/api/ai/client-intent", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Something went wrong");
        return;
      }

      setResult(data.result || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("AI error:", err);
      setResult("Error calling AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Client Intent Engine ">
      {/* Input */}
      <textarea
        className="w-full p-3 rounded mb-4 bg-slate-900 text-white border border-slate-700"
        rows={4}
        placeholder="Enter client details, messages, or emails..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Generate Button */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => callAI({ clientData: input })}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          disabled={loading}
        >
          Detect Intent
        </button>
      </div>

      {/* Result */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700 whitespace-pre-wrap text-white min-h-[150px]">
        {loading ? "Processing..." : result || "Client intent will appear here..."}
      </div>

      {/* Explanation / SaaS
      <div className="mt-4 text-gray-300 text-sm">
        <p>💡 Problem: Clients are unclear, hide budget, or not serious.</p>
        <p>🚀 Solution: AI detects seriousness, potential budget, and negotiation range.</p>
        <p>💸 Monetization: Monthly SaaS subscription ($20–$50), team/agency version available.</p>
      </div> */}
    </PageWrapper>
  );
}