"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";

const skillsList = [
  "Web Developer",
  "Next.js Developer",
  "React Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "WordPress Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "SEO Expert",
  "Content Writer",
  "Video Editor",
];

export default function ExitBuilderPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSkills, setShowSkills] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const generatePlan = async () => {
    if (selectedSkills.length === 0) return;

    setLoading(true);
    setResult("Generating plan...");

    try {
      const res = await fetch("/api/ai/ideas", {
        method: "POST",
        credentials: "include", // ✅ FIX
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: selectedSkills }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Failed");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setResult("Error generating plan");
    } finally {
      setLoading(false);
    }
  };

  const downloadPlan = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "exit-plan.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <PageWrapper title="Exit Builder">

      {/* SKILLS CARD */}
      <div
        onClick={() => setShowSkills(true)}
        className="bg-slate-800 border border-slate-700 rounded p-4 cursor-pointer hover:bg-slate-700"
      >
        <p className="text-white font-semibold">Skills</p>
        <p className="text-slate-400 text-sm">
          {selectedSkills.length > 0
            ? selectedSkills.join(", ")
            : "Click to select skills"}
        </p>
      </div>

      {/* MODAL */}
      {showSkills && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-slate-800 p-4 rounded w-[350px]">

            <div className="flex justify-between mb-3">
              <h3 className="text-white">Select Skills</h3>
              <button onClick={() => setShowSkills(false)}>✕</button>
            </div>

            <div className="max-h-[250px] overflow-y-auto">
              {skillsList.map((skill) => {
                const selected = selectedSkills.includes(skill);
                return (
                  <div key={skill} className="flex justify-between p-2">
                    <span className="text-white">{skill}</span>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        selected ? removeSkill(skill) : addSkill(skill)
                      }
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowSkills(false)}
              className="mt-3 w-full bg-violet-500 py-2 text-white rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CHIPS */}
      <div className="flex gap-2 flex-wrap mt-3">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            onClick={() => removeSkill(skill)}
            className="bg-violet-500 px-3 py-1 rounded text-white cursor-pointer"
          >
            {skill} ✕
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={generatePlan}
        className="mt-4 bg-violet-500 px-4 py-2 text-white rounded"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {/* RESULT */}
      <div className="mt-4 bg-slate-800 p-4 text-white rounded min-h-[150px] whitespace-pre-wrap">
        {result || "Your plan will appear here"}
      </div>

      {/* DOWNLOAD */}
      {result && (
        <button
          onClick={downloadPlan}
          className="mt-3 bg-green-500 px-4 py-2 text-white rounded"
        >
          Download Plan
        </button>
      )}
    </PageWrapper>
  );
}