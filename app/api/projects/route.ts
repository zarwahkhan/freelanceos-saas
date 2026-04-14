import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch {
    return null;
  }
}

// ✅ GET
export async function GET() {
  const session = await getSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const projects = await prisma.project.findMany({
    where: { userId: user?.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(projects);
}

// ✅ POST
export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const body = await request.json();

  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description || "",
      status: body.status || "active",
      userId: user!.id,
    },
  });

  return NextResponse.json(project);
}