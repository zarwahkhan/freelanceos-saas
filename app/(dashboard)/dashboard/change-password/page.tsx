"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);

    await fetch("/api/change-password", {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    alert("Password Updated");
    setPassword("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Change Password
      </h1>

      <div className="bg-[#1a1d2e] p-6 rounded-xl border border-slate-800 max-w-md">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 mb-4"
        />

        <button
          onClick={handleChange}
          className="w-full bg-violet-500 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}