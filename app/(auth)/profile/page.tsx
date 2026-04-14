"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    await fetch("/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, email: session?.user?.email }),
    });
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-xl text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 p-2 rounded" />
      <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded" />
      <button onClick={handleUpdate} className="w-full p-2 bg-violet-500 rounded font-bold">Update Profile</button>
    </div>
  );
}
