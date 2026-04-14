// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export async function POST(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id: projectId } = await params;
//   const body: any = await request.json(); // ✅ typed as any

//   const project = await prisma.project.findFirst({
//     where: { id: projectId, userId: session.user.id },
//   });
//   if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

//   const task = await prisma.task.create({
//     data: {
//       title: body.title,
//       description: body.description,
//       priority: body.priority || "MEDIUM",
//       dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
//       estimatedHours: body.estimatedHours ? parseFloat(body.estimatedHours) : undefined,
//       projectId,
//     },
//   });

//   return NextResponse.json(task);
// }

// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { id: projectId } = await params;
//   const body: any = await request.json(); // ✅ typed as any

//   const project = await prisma.project.findFirst({
//     where: { id: projectId, userId: session.user.id },
//   });
//   if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

//   const task = await prisma.task.update({
//     where: { id: body.taskId },
//     data: { status: body.status },
//   });

//   return NextResponse.json(task);
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ CREATE TASK
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: projectId } = await params;
    const body: any = await request.json();

    // ✅ user find
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ project ownership check
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: user.id },
    });

    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    // ✅ create task
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || "",
        priority: body.priority || "MEDIUM",
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        estimatedHours: body.estimatedHours
          ? parseFloat(body.estimatedHours)
          : null,
        projectId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ✅ UPDATE TASK STATUS
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: projectId } = await params;
    const body: any = await request.json();

    // ✅ user find
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ project ownership check
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: user.id },
    });

    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    // ✅ update task
    const task = await prisma.task.update({
      where: { id: body.taskId },
      data: {
        // status: body.status,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}