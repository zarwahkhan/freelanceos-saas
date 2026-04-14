// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { name } = await req.json();

//   const user = await prisma.user.update({
//     where: { email: session.user.email },
//     data: { name },
//   });

//   return NextResponse.json(user);
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // ✅ Auth check (email OR id dono support)
    if (!session?.user?.email && !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // ✅ Safe parsing
    const skillsArray =
      typeof body.skills === "string"
        ? body.skills.split(",").map((s: string) => s.trim())
        : Array.isArray(body.skills)
        ? body.skills
        : [];

    const servicesArray =
      typeof body.services === "string"
        ? body.services.split(",").map((s: string) => s.trim())
        : Array.isArray(body.services)
        ? body.services
        : [];

    const hourly =
      body.hourlyRate && !isNaN(parseFloat(body.hourlyRate))
        ? parseFloat(body.hourlyRate)
        : null;

    // ✅ Update user (email preferred, fallback id)
    const user = await prisma.user.update({
      where: session.user.email
        ? { email: session.user.email }
        : { id: session.user.id },

      data: {
        name: body.name || undefined,
        email: body.email || undefined,
        bio: body.bio || "",
        city: body.city || "",
        experience: body.experience || "",

        skills: skillsArray,
        services: servicesArray,

        hourlyRate: hourly,

        fiverr: body.fiverr || "",
        upwork: body.upwork || "",
        portfolio: body.portfolio || "",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}