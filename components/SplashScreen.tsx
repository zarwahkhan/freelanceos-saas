"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 sec

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f172a]">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          
          {/* LOGO */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            ⚡
          </div>

          {/* TEXT */}
          <div className="text-white text-lg font-bold">
            FreelanceOS
          </div>

          <div className="text-violet-400 text-sm">
            Intelligence Layer
          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}