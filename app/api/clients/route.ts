// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// // ✅ GET CLIENTS
// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const clients = await prisma.client.findMany({
//     where: { userId: user.id },

//     // ✅ FIX: removed invalid include
//     // include: { projects: true },

//     // ✅ FIX: use id instead
//     orderBy: { id: "desc" },
//   });

//   return NextResponse.json(clients);
// }

// // ✅ CREATE CLIENT
// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const body = await request.json();

//   const client = await prisma.client.create({
//     data: {
//       name: body.name,
//       email: body.email,
//       company: body.company,
//       country: body.country,
//       description: body.description,
//       notes: body.notes,
//       userId: user.id,
//     },
//   });

//   return NextResponse.json(client);
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ GET CLIENTS
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // ✅ auth check
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ user fetch
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ get clients
    const clients = await prisma.client.findMany({
      where: { userId: user.id },

      // ⚠️ optional relation (agar schema me ho tabhi use karo)
      // include: { projects: true },

      orderBy: { id: "desc" },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ✅ CREATE CLIENT
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // ✅ auth check
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ user fetch
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // ✅ validation (basic)
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // ✅ create client
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        country: body.country || null,
        description: body.description || null,
        notes: body.notes || null,
        userId: user.id,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}