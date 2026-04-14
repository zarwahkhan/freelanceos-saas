// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { generateBusinessIdeas } from "@/lib/openai";
// import { prisma } from "@/lib/prisma";

// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // ✅ get user from DB using email
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const body: any = await request.json();

//   const experience = body.experience || "3+ years as a freelancer";

//   try {
//     const analysis = await generateBusinessIdeas(
//       (user as any)?.skills || [],
//       experience
//     );

//     await prisma.aIAnalysis.create({
//       data: {
//         type: "BUSINESS_IDEA",
//         result: JSON.stringify(analysis),

//         // ✅ FIX: use DB user id
//         userId: user.id,
//       },
//     });

//     return NextResponse.json(analysis);
//   } catch {
//     const mock = {
//       ideas: [
//         {
//           title: "Developer Tools SaaS",
//           description:
//             "Build a niche SaaS tool solving a specific pain point you face as a freelancer",
//           category: "SAAS",
//           effort: "HIGH",
//           potential: "HIGH",
//           steps: [
//             {
//               step: 1,
//               title: "Validate Idea",
//               description: "Talk to 20 potential customers, build a landing page",
//               timeframe: "2 weeks",
//             },
//             {
//               step: 2,
//               title: "Build MVP",
//               description: "Create core features only, launch fast",
//               timeframe: "1-2 months",
//             },
//             {
//               step: 3,
//               title: "Get First 10 Customers",
//               description: "Personal outreach, freelance communities",
//               timeframe: "1 month",
//             },
//             {
//               step: 4,
//               title: "Iterate & Grow",
//               description:
//                 "Based on feedback, add features and scale marketing",
//               timeframe: "3-6 months",
//             },
//           ],
//         },
//         {
//           title: "Productized Service Agency",
//           description:
//             "Package your most in-demand service into a fixed-price, repeatable offering",
//           category: "PRODUCTIZED_SERVICE",
//           effort: "MEDIUM",
//           potential: "MEDIUM",
//           steps: [
//             {
//               step: 1,
//               title: "Define Service Package",
//               description:
//                 "Identify your best skill, create a clear deliverable",
//               timeframe: "1 week",
//             },
//             {
//               step: 2,
//               title: "Set Fixed Pricing",
//               description: "Price based on value, not hours",
//               timeframe: "1 week",
//             },
//             {
//               step: 3,
//               title: "Build Sales Page",
//               description: "Clear offer, testimonials, FAQ",
//               timeframe: "1 week",
//             },
//             {
//               step: 4,
//               title: "Hire & Scale",
//               description: "Delegate delivery, focus on sales",
//               timeframe: "3-6 months",
//             },
//           ],
//         },
//       ],
//     };

//     return NextResponse.json(mock);
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // ✅ Get session first
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Fetch user from DB with relations
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      projects: true,
      clients: true,
      earnings: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ Calculate score
  const score =
    (user.projects?.length || 0) * 10 +
    (user.clients?.length || 0) * 5 +
    (user.earnings?.length || 0) * 2;

  // ✅ Return JSON
  return NextResponse.json({ score });
}