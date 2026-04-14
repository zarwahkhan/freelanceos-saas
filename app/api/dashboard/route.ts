// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const userId = session.user.id;
//   const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

//   const [projects, clients, earnings, recentEarnings, tasks, trustScore] =
//     await Promise.all([
//       prisma.project.findMany({
//         where: { userId },
//         select: { status: true, budget: true, createdAt: true },
//       }),
//       prisma.client.findMany({
//         where: { userId },
//         select: { riskLevel: true },
//       }),
//       prisma.earnings.aggregate({
//         where: { userId },
//         _sum: { amount: true },
//       }),
//       prisma.earnings.findMany({
//         where: { userId, date: { gte: thirtyDaysAgo } },
//         orderBy: { date: "desc" },
//       }),
//       prisma.task.findMany({
//         where: {
//           project: { userId },
//           status: { not: "DONE" },
//           dueDate: { lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
//         },
//         include: { project: { select: { title: true } } },
//         take: 5,
//       }),
//       prisma.trustScore.findUnique({ where: { userId } }),
//     ]);

//   const activeProjects = projects.filter((p: any) => p.status === "ACTIVE").length;
//   const completedProjects = projects.filter((p: any) => p.status === "COMPLETED").length;
//   const totalEarnings = earnings._sum.amount || 0;
//   const recentTotal = recentEarnings.reduce((sum: number, e: any) => sum + e.amount, 0);

//   // Build monthly chart data for last 6 months
//   const monthlyData: Record<string, number> = {};
//   for (let i = 5; i >= 0; i--) {
//     const d = new Date();
//     d.setMonth(d.getMonth() - i);
//     const key = d.toLocaleString("default", { month: "short" });
//     monthlyData[key] = 0;
//   }

//   recentEarnings.forEach((e: any) => {
//     const key = new Date(e.date).toLocaleString("default", { month: "short" });
//     if (monthlyData[key] !== undefined) monthlyData[key] += e.amount;
//   });

//   return NextResponse.json({
//     stats: {
//       activeProjects,
//       completedProjects,
//       totalClients: clients.length,
//       totalEarnings,
//       recentEarnings: recentTotal,
//     },
//     monthlyData: Object.entries(monthlyData).map(([month, amount]) => ({ month, amount })),
//     upcomingTasks: tasks,
//     trustScore,
//   });
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const projects = await prisma.project.count({
    where: { userId: user.id },
  });

  const clients = await prisma.client.count({
    where: { userId: user.id },
  });

  const earnings = await prisma.earnings.aggregate({
    where: { userId: user.id },
    _sum: { amount: true },
  });

  return NextResponse.json({
    projects,
    clients,
    earnings: earnings._sum.amount || 0,
  });
}