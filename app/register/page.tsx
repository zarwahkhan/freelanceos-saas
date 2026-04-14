// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Zap, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Registration failed");
//       setLoading(false);
//     } else {
//       router.push("/login?registered=true");
//     }
//   };

//   const features = [
//     "AI Project Manager",
//     "Trust Score Engine",
//     "Revenue Optimization",
//     "Client Intelligence",
//     "Exit Builder System",
//   ];

//   return (
//     <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
//       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Left: Features */}
//         <div className="hidden md:block">
//           <div className="flex items-center gap-2 mb-6">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
//               <Zap className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-white">FreelanceOS</span>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-3">
//             The Intelligence Layer<br />for Freelancers
//           </h2>
//           <p className="text-slate-400 mb-8">
//             Join thousands of freelancers who use AI to grow smarter, earn more, and build lasting businesses.
//           </p>
//           <div className="space-y-3">
//             {features.map((f) => (
//               <div key={f} className="flex items-center gap-3">
//                 <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
//                 <span className="text-slate-300">{f}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right: Form */}
//         <div>
//           <div className="text-center mb-6 md:hidden">
//             <div className="inline-flex items-center gap-2 mb-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">FreelanceOS</span>
//             </div>
//           </div>

//           <div className="bg-[#1a1d2e] border border-slate-700/50 rounded-2xl p-8">
//             <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
//             <p className="text-slate-400 text-sm mb-6">Start your intelligent freelance journey</p>

//             {error && (
//               <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3 mb-5 text-sm">
//                 <AlertCircle className="w-4 h-4 flex-shrink-0" />
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
//                     placeholder="Alex Johnson"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
//                     placeholder="you@example.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     minLength={6}
//                     className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
//                     placeholder="Min. 6 characters"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
//               >
//                 {loading ? "Creating account..." : (
//                   <>Create Account <ArrowRight className="w-4 h-4" /></>
//                 )}
//               </button>
//             </form>

//             <p className="text-center text-slate-400 text-sm mt-5">
//               Already have an account?{" "}
//               <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import bcrypt from "bcryptjs";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: hashedPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const features = [
    "AI Project Manager",
    "Trust Score Engine",
    "Revenue Optimization",
    "Client Intelligence",
    "Exit Builder System",
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Features */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FreelanceOS</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            The Intelligence Layer<br />for Freelancers
          </h2>
          <p className="text-slate-400 mb-8">
            Join thousands of freelancers who use AI to grow smarter, earn more, and build lasting businesses.
          </p>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <span className="text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <div className="text-center mb-6 md:hidden">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FreelanceOS</span>
            </div>
          </div>

          <div className="bg-[#1a1d2e] border border-slate-700/50 rounded-2xl p-8">
            <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-slate-400 text-sm mb-6">Start your intelligent freelance journey</p>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3 mb-5 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Alex Johnson"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-[#0f1117] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Min. 6 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              >
                {loading ? "Creating account..." : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}