"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

export default function TrustPage() {
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await fetch("/api/trust");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load score");
          return;
        }

        setScore(data.score || 0);
      } catch (err) {
        console.error("Error fetching trust score:", err);
        setError("Error fetching trust score");
      }
    };

    fetchScore();
  }, []);

  return (
    <PageWrapper title="Trust Profile">
      {/* Score Card */}
      <div className="bg-slate-800 p-5 rounded border border-slate-700 mb-4">
        <div className="text-lg font-semibold mb-2">
          Your Trust Score:
          <span className="text-green-500 ml-2">{score}</span>
        </div>

        <p className="text-slate-400 text-sm">
          This score is calculated based on your completed projects, clients,
          and earnings.
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}
    </PageWrapper>
  );
}