// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// // ✅ GET EARNINGS
// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // ✅ get user first
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const earnings = await prisma.earnings.findMany({
//     where: { userId: user.id },
//     orderBy: { id: "desc" },
//   });

//   const total = earnings.reduce((sum: number, e: any) => sum + e.amount, 0);

//   const bySource = earnings.reduce(
//     (acc: Record<string, number>, e: any) => {
//       const key = e.source || "Other";
//       acc[key] = (acc[key] || 0) + e.amount;
//       return acc;
//     },
//     {}
//   );

//   return NextResponse.json({ earnings, total, bySource });
// }

// // ✅ CREATE EARNING
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

//   const body: any = await request.json();

//   const earning = await prisma.earnings.create({
//     data: {
//       amount: parseFloat(body.amount),
//       source: body.source || "Freelance",

//       // ✅ FIX: use userId from DB
//       userId: user.id,
//     },
//   });

//   return NextResponse.json(earning);
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ✅ GET EARNINGS
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

    // ⚠️ IMPORTANT: model name must match schema (earning, not earnings)
    const earnings = await prisma.earnings.findMany({
      where: { userId: user.id },
      orderBy: { id: "desc" },
    });

    // ✅ total calculate
    const total = earnings.reduce(
      (sum: number, e: any) => sum + e.amount,
      0
    );

    // ✅ group by source
    const bySource = earnings.reduce(
      (acc: Record<string, number>, e: any) => {
        const key = e.source || "Other";
        acc[key] = (acc[key] || 0) + e.amount;
        return acc;
      },
      {}
    );

    return NextResponse.json({ earnings, total, bySource });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ✅ CREATE EARNING
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

    const body: any = await request.json();

    // ✅ validation
    if (!body.amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    const earning = await prisma.earnings.create({
      data: {
        amount: parseFloat(body.amount),
        source: body.source || "Freelance",
        userId: user.id,
      },
    });

    return NextResponse.json(earning);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}