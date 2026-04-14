import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ GET IDEAS
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ get user first
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const ideas = await prisma.idea.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(ideas);
}

// ✅ CREATE IDEA
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();

  const idea = await prisma.idea.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category || "SAAS",
      skills: body.skills || [],
      effort: body.effort,
      potential: body.potential,
      steps: body.steps,

      // ✅ FIX: use userId
      userId: user.id,
    },
  });

  return NextResponse.json(idea);
}

// ✅ UPDATE IDEA
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();

  const idea = await prisma.idea.updateMany({
    where: {
      id: body.id,
      userId: user.id,
    },
    data: {
      status: body.status,
      progress: body.progress,
    },
  });

  return NextResponse.json(idea);
}