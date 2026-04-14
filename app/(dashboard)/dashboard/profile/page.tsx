// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import PageWrapper from "@/components/PageWrapper";

// export default function ProfilePage() {
//   const { data: session } = useSession();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState(""); // optional gender
//   const [profilePic, setProfilePic] = useState(""); // optional profile pic URL
//   const [loading, setLoading] = useState(false);

//   // Load session data into state
//   useEffect(() => {
//     if (session?.user) {
//       setName(session.user.name || "");
//       setEmail(session.user.email || "");
//       setDob(session.user.dob || "");
//       setPhone(session.user.phone || "");
//       setGender(session.user.gender || "");
//       setProfilePic(session.user.profilePic || "");
//     }
//   }, [session]);

//   // Update profile
//   const updateProfile = async () => {
//     setLoading(true);

//     const res = await fetch("/api/profile", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, dob, phone, gender, profilePic }),
//     });

//     setLoading(false);

//     if (res.ok) {
//       alert("Profile updated successfully");
//     } else {
//       const data = await res.json();
//       alert(data.error || "Failed to update profile");
//     }
//   };

//   return (
//     <PageWrapper title="My Profile">
//       <div className="bg-slate-800 p-5 rounded border border-slate-700 space-y-4">

//         {/* Name */}
//         <div>
//           <label className="text-sm text-slate-400">Name</label>
//           <input
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="text-sm text-slate-400">Email</label>
//           <input
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Date of Birth */}
//         <div>
//           <label className="text-sm text-slate-400">Date of Birth</label>
//           <input
//             type="date"
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//           />
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="text-sm text-slate-400">Phone Number</label>
//           <input
//             type="tel"
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>

//         {/* Gender (optional) */}
//         <div>
//           <label className="text-sm text-slate-400">Gender (optional)</label>
//           <select
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Profile Picture (optional) */}
//         <div>
//           <label className="text-sm text-slate-400">Profile Picture URL (optional)</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded bg-slate-900 text-white border-slate-700"
//             value={profilePic}
//             onChange={(e) => setProfilePic(e.target.value)}
//             placeholder="https://example.com/photo.jpg"
//           />
//         </div>

//         {/* Update Button */}
//         <button
//           onClick={updateProfile}
//           className="bg-violet-500 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Update Profile"}
//         </button>

//         {/* Logout */}
//         <button
//           onClick={() => signOut({ callbackUrl: "/login" })}
//           className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4"
//         >
//           Logout
//         </button>
//       </div>
//     </PageWrapper>
//   );
// }























// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useState, useEffect } from "react";
// import PageWrapper from "@/components/PageWrapper";

// export default function ProfilePage() {
//   const { data: session } = useSession();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     skills: "",
//     experience: "",
//     hourlyRate: "",
//     fiverr: "",
//     upwork: "",
//     portfolio: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user) {
//       setForm((prev) => ({
//         ...prev,
//         name: session.user.name || "",
//         email: session.user.email || "",
//       }));
//     }
//   }, [session]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const updateProfile = async () => {
//     setLoading(true);

//     const res = await fetch("/api/profile", {
//       method: "POST",
//       body: JSON.stringify(form),
//       headers: { "Content-Type": "application/json" },
//     });

//     setLoading(false);
//     alert("Profile Updated");
//   };

//   return (
//     <PageWrapper title="My Professional Profile">

//       <div className="grid md:grid-cols-2 gap-4">

//         {/* LEFT SIDE FORM */}
//         <div className="bg-slate-800 p-5 rounded border border-slate-700 space-y-3">

//           <input name="name" value={form.name} onChange={handleChange}
//             placeholder="Name"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="email" value={form.email} onChange={handleChange}
//             placeholder="Email"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <textarea name="bio" value={form.bio} onChange={handleChange}
//             placeholder="Write a strong bio..."
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="skills" value={form.skills} onChange={handleChange}
//             placeholder="Skills (React, Next.js...)"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="experience" value={form.experience} onChange={handleChange}
//             placeholder="Experience (e.g 2 years)"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="hourlyRate" value={form.hourlyRate} onChange={handleChange}
//             placeholder="Hourly Rate ($)"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="fiverr" value={form.fiverr} onChange={handleChange}
//             placeholder="Fiverr Profile Link"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="upwork" value={form.upwork} onChange={handleChange}
//             placeholder="Upwork Profile Link"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <input name="portfolio" value={form.portfolio} onChange={handleChange}
//             placeholder="Portfolio Link"
//             className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded" />

//           <button onClick={updateProfile}
//             className="bg-violet-500 text-white px-4 py-2 rounded">
//             {loading ? "Saving..." : "Save Profile"}
//           </button>

//           <button
//             onClick={() => signOut({ callbackUrl: "/login" })}
//             className="bg-red-500 text-white px-4 py-2 rounded w-full"
//           >
//             Logout
//           </button>
//         </div>

//         {/* RIGHT SIDE PREVIEW 🔥 */}
//         <div className="bg-slate-800 p-5 rounded border border-slate-700 space-y-3">

//           <h2 className="text-xl font-bold">{form.name}</h2>

//           <p className="text-slate-400">{form.bio || "Your bio will appear here..."}</p>

//           <div>
//             <strong>Skills:</strong> {form.skills}
//           </div>

//           <div>
//             <strong>Experience:</strong> {form.experience}
//           </div>

//           <div>
//             <strong>Rate:</strong> ${form.hourlyRate}/hr
//           </div>

//           <div className="space-y-1 text-sm">
//             {form.fiverr && <a href={form.fiverr} target="_blank" className="text-green-400">Fiverr Profile</a>}
//             {form.upwork && <a href={form.upwork} target="_blank" className="text-blue-400">Upwork Profile</a>}
//             {form.portfolio && <a href={form.portfolio} target="_blank" className="text-violet-400">Portfolio</a>}
//           </div>

//         </div>
//       </div>

//     </PageWrapper>
//   );
// }











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