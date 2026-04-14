"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Zap,
  LayoutDashboard,
  FolderKanban,
  Users,
  DollarSign,
  Brain,
  Rocket,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { getInitials } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/dashboard/ai-insights", label: "AI Insights", icon: Brain },
  { href: "/dashboard/trust", label: "Trust Profile", icon: Shield },
  { href: "/dashboard/exit-builder", label: "Exit Builder", icon: Rocket },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // ✅ Add router
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 flex-shrink-0 bg-[#1a1d2e] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">FreelanceOS</div>
            <div className="text-xs text-violet-400 leading-tight">Intelligence Layer</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-violet-400" : ""}`} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 text-violet-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800 relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name?.[0] || "U"}
          </div>

          <div className="flex-1">
            <div className="text-sm text-white">{session?.user?.name}</div>
            <div className="text-xs text-slate-400">{session?.user?.email}</div>
          </div>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute bottom-16 left-4 right-4 bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-2 space-y-1">
            {/* ✅ Updated button */}
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded"
            >
              My Profile
            </button>

           <button
  onClick={() => router.push("/dashboard/change-password")}
  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded"
>
  Change Password
</button>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-800 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}