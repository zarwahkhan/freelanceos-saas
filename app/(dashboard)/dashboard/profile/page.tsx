"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user: any = session?.user;

  // 🔥 TRUST SCORE CALC (CORE FEATURE)
  const trustScore = Math.min(
    100,
    (
      (user?.skills?.length || 0) * 10 +
      (user?.projectsCount || 0) * 5 +
      (user?.clientsCount || 0) * 5 +
      (user?.earnings || 0) / 100 +
      (user?.bio ? 10 : 0) +
      (user?.portfolio ? 10 : 0)
    )
  );

  return (
    <PageWrapper title="Identity Graph">
      <div className="space-y-6">

        {/* 🔥 HERO (IDENTITY CARD) */}
        <div className="bg-gradient-to-r from-[#111827] to-[#020617] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-xl font-bold text-white">
              {user?.name?.charAt(0) || "U"}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.name}
              </h2>

              <p className="text-slate-400 text-sm">
                {user?.email}
              </p>

              {/* 🔥 UNIVERSAL ID */}
              <p className="text-xs text-green-400 mt-1">
                ID: #{user?.id?.slice(0, 8) || "UNIFIED-001"}
              </p>

              {/* STATUS */}
              <p
                className={`text-xs mt-1 ${
                  user?.available ? "text-green-400" : "text-red-400"
                }`}
              >
                {user?.available ? "● Active" : "● Inactive"}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/profile/edit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 rounded-xl text-white text-sm font-medium hover:scale-105 transition"
          >
            ✏️ Edit Identity
          </Link>
        </div>

        {/* 🔥 TRUST SCORE (MAIN FEATURE) */}
        <div className="bg-[#020617] border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-400 mb-2">
            Global Trust Score
          </p>

          <div className="w-full bg-slate-800 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${trustScore}%` }}
            />
          </div>

          <p className="text-green-400 text-lg mt-2 font-bold">
            {trustScore}/100
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Based on skills, earnings, projects, and activity
          </p>
        </div>

        {/* 🔥 PLATFORM INTEGRATION */}
        <div className="bg-[#020617] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm text-slate-400 mb-4">
            Connected Platforms
          </h3>

          <div className="flex gap-3 flex-wrap">

            {user?.fiverr && (
              <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs">
                Fiverr Connected
              </span>
            )}

            {user?.upwork && (
              <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                Upwork Connected
              </span>
            )}

            {user?.portfolio && (
              <span className="bg-violet-600/20 text-violet-400 px-3 py-1 rounded-full text-xs">
                Portfolio Linked
              </span>
            )}

            {!user?.fiverr && !user?.upwork && !user?.portfolio && (
              <p className="text-slate-500 text-sm">
                No platforms connected
              </p>
            )}
          </div>
        </div>

        {/* 🔥 TRUST METRICS */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: "Projects", value: user?.projectsCount || 0 },
            { label: "Clients", value: user?.clientsCount || 0 },
            { label: "Earnings", value: `$${user?.earnings || 0}` },
            { label: "Rate", value: `$${user?.hourlyRate || 0}/hr` },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#020617] border border-slate-800 rounded-xl p-4 hover:border-violet-500 transition"
            >
              <p className="text-slate-400 text-xs">{item.label}</p>
              <h3 className="text-white text-lg font-bold">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* 🔥 SKILLS GRAPH */}
        <div className="bg-[#020617] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm text-slate-400 mb-3">
            Skills Graph
          </h3>

          <div className="flex flex-wrap gap-2">
            {user?.skills?.length ? (
              user.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-violet-600/20 text-violet-400 px-3 py-1 rounded-full text-xs border border-violet-500/30"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-500">No skills</p>
            )}
          </div>
        </div>

        {/* 🔥 ABOUT */}
        <div className="bg-[#020617] border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm text-slate-400 mb-2">About</h3>
          <p className="text-white">
            {user?.bio || "No bio added"}
          </p>
        </div>

      </div>
    </PageWrapper>
  );
}