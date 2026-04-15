// // import { NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/lib/auth";

// // export async function POST(req: Request) {
// //   const session = await getServerSession(authOptions);

// //   if (!session?.user?.email) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const { name } = await req.json();

// //   const user = await prisma.user.update({
// //     where: { email: session.user.email },
// //     data: { name },
// //   });

// //   return NextResponse.json(user);
// // }
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     // ✅ Auth check (email OR id dono support)
//     if (!session?.user?.email && !session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     // ✅ Safe parsing
//     const skillsArray =
//       typeof body.skills === "string"
//         ? body.skills.split(",").map((s: string) => s.trim())
//         : Array.isArray(body.skills)
//         ? body.skills
//         : [];

//     const servicesArray =
//       typeof body.services === "string"
//         ? body.services.split(",").map((s: string) => s.trim())
//         : Array.isArray(body.services)
//         ? body.services
//         : [];

//     const hourly =
//       body.hourlyRate && !isNaN(parseFloat(body.hourlyRate))
//         ? parseFloat(body.hourlyRate)
//         : null;

//     // ✅ Update user (email preferred, fallback id)
//     const user = await prisma.user.update({
//       where: session.user.email
//         ? { email: session.user.email }
//         : { id: session.user.id },

//       data: {
//         name: body.name || undefined,
//         email: body.email || undefined,
//         bio: body.bio || "",
//         city: body.city || "",
//         experience: body.experience || "",

//         skills: skillsArray,
//         services: servicesArray,

//         hourlyRate: hourly,

//         fiverr: body.fiverr || "",
//         upwork: body.upwork || "",
//         portfolio: body.portfolio || "",
//       },
//     });

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("PROFILE UPDATE ERROR:", error);

//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }











// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     // ❌ NO SESSION
//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();

//     // ✅ SAFE DATA
//     const data = {
//       bio: body.bio || "",
//       skills: Array.isArray(body.skills) ? body.skills : [],
//       services: Array.isArray(body.services) ? body.services : [],
//       city: body.city || "",
//       experience: body.experience || "",
//       hourlyRate: body.hourlyRate
//         ? Number(body.hourlyRate)
//         : null,
//       fiverr: body.fiverr || "",
//       upwork: body.upwork || "",
//       portfolio: body.portfolio || "",
//     };

//     // ✅ UPDATE USER
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: session.user.id,
//       },
//       data,
//     });

//     return NextResponse.json(updatedUser);
//   } catch (err) {
//     console.error("PROFILE ERROR:", err);

//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        bio: body.bio || "",
        skills: body.skills || [],
        services: body.services || [],
        city: body.city || "",
        experience: body.experience || "",
        hourlyRate: Number(body.hourlyRate) || 0,
        fiverr: body.fiverr || "",
        upwork: body.upwork || "",
        portfolio: body.portfolio || "",
      },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}