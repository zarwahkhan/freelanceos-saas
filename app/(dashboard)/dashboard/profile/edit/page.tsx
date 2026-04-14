"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import PageWrapper from "@/components/PageWrapper";

export default function EditProfile() {
  const { data: session } = useSession();
  const user: any = session?.user;

  const [form, setForm] = useState({
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    services: user?.services?.join(", ") || "",
    city: user?.city || "",
    experience: user?.experience || "",
    hourlyRate: user?.hourlyRate || "",
    fiverr: user?.fiverr || "",
    upwork: user?.upwork || "",
    portfolio: user?.portfolio || "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
          services: form.services.split(",").map((s) => s.trim()),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Failed to update");
        return;
      }

      setMsg("Profile Updated ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper title="Edit Identity Graph">
      <div className="space-y-6">

        {/* 🔥 HEADER */}
        <div className="bg-gradient-to-r from-[#111827] to-[#020617] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white">
            Identity Graph Editor
          </h2>
          <p className="text-slate-400 text-sm">
            Build your global freelancer identity & trust score
          </p>
        </div>

        {/* 🔥 FORM */}
        <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6 space-y-6">

          {/* BIO */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Bio (Trust Signal)
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
              placeholder="Explain your expertise..."
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Skills Graph
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, Node, AI, SaaS"
              className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          {/* SERVICES */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Services Offered
            </label>
            <input
              name="services"
              value={form.services}
              onChange={handleChange}
              placeholder="Web Apps, Automation, APIs"
              className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          {/* 🔥 PLATFORM LINKS (CORE FEATURE) */}
          <div className="grid md:grid-cols-3 gap-4">

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Fiverr Profile
              </label>
              <input
                name="fiverr"
                value={form.fiverr}
                onChange={handleChange}
                placeholder="https://fiverr.com/username"
                className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Upwork Profile
              </label>
              <input
                name="upwork"
                value={form.upwork}
                onChange={handleChange}
                placeholder="https://upwork.com/..."
                className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Portfolio Website
              </label>
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Location
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Experience Level
              </label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Beginner / Intermediate / Expert"
                className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

          </div>

          {/* RATE */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Hourly Rate ($)
            </label>
            <input
              name="hourlyRate"
              value={form.hourlyRate}
              onChange={handleChange}
              type="number"
              className="w-full bg-[#0f111a] border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          {/* SAVE */}
          <div className="flex justify-between items-center">
            {msg && (
              <p className="text-sm text-green-400">{msg}</p>
            )}

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2 rounded-xl text-white font-medium hover:scale-105 transition"
            >
              {loading ? "Saving..." : "💾 Save Identity"}
            </button>
          </div>

        </div>

      </div>
    </PageWrapper>
  );
}