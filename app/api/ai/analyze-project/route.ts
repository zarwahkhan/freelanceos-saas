// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function POST(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     // ✅ auth check
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ get user
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const body = await request.json();

//     // ✅ support both inputs
//     const description =
//       body.description || body.projectDetails;

//     const projectId = body.projectId;

//     if (!description) {
//       return NextResponse.json(
//         { error: "Project description required" },
//         { status: 400 }
//       );
//     }

//     // ✅ OpenAI call
//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "system",
//           content: "You are a freelance business advisor",
//         },
//         {
//           role: "user",
//           content: `Analyze this project and:
// 1. Break it into tasks
// 2. Estimate hours
// 3. Suggest timeline
// 4. Identify risks
// 5. Give recommendation if it's worth doing

// Project:
// ${description}`,
//         },
//       ],
//     });

//     const result = response.choices[0].message.content;

//     // ✅ save in DB
//     await prisma.aIAnalysis.create({
//       data: {
//         type: "PROJECT_BREAKDOWN",
//         input: description,
//         result: result || "",
//         userId: user.id,

//         // ✅ optional metadata
//         metadata: projectId ? { projectId } : undefined,
//       },
//     });

//     return NextResponse.json({ result });
//   } catch (error) {
//     console.error(error);

//     // ✅ fallback (AI fail ho jaye to)
//     const mock = {
//       tasks: [
//         {
//           title: "Project Setup & Architecture",
//           description: "Set up environment",
//           estimatedHours: 4,
//           priority: "HIGH",
//           dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
//         },
//         {
//           title: "Core Development",
//           description: "Build main features",
//           estimatedHours: 20,
//           priority: "URGENT",
//           dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
//         },
//         {
//           title: "Testing",
//           description: "QA and bug fixing",
//           estimatedHours: 6,
//           priority: "HIGH",
//           dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
//         },
//       ],
//       timeline: "2 weeks",
//       totalEstimatedHours: 30,
//       risks: ["Scope creep", "Client delays"],
//       recommendation: "Proceed but define scope clearly",
//     };

//     return NextResponse.json(mock);
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // ✅ auth check
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ get user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // ✅ support both inputs
    const projectDetails = body.projectDetails || body.description;
    const projectId = body.projectId;

    if (!projectDetails) {
      return NextResponse.json(
        { error: "Project description required" },
        { status: 400 }
      );
    }

    // ✅ OpenAI call for project analysis
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a freelance business advisor who evaluates projects for feasibility and risk.",
        },
        {
          role: "user",
          content: `Analyze this project and:
1. Break it into tasks
2. Estimate hours
3. Suggest timeline
4. Identify risks
5. Give recommendation if it's worth doing

Project:
${projectDetails}`,
        },
      ],
    });

    const result = aiResponse.choices[0].message.content;

    // ✅ save analysis in DB
    await prisma.aIAnalysis.create({
      data: {
        type: "PROJECT_BREAKDOWN",
        input: projectDetails,
        result: result || "",
        userId: user.id,
        metadata: projectId ? { projectId } : undefined,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Project Analysis Error:", error);

    // ✅ fallback response if OpenAI fails
    const fallback = {
      tasks: [
        {
          title: "Project Setup & Architecture",
          description: "Set up environment",
          estimatedHours: 4,
          priority: "HIGH",
          dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
        },
        {
          title: "Core Development",
          description: "Build main features",
          estimatedHours: 20,
          priority: "URGENT",
          dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
        },
        {
          title: "Testing",
          description: "QA and bug fixing",
          estimatedHours: 6,
          priority: "HIGH",
          dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
        },
      ],
      timeline: "2 weeks",
      totalEstimatedHours: 30,
      risks: ["Scope creep", "Client delays"],
      recommendation: "Proceed but define scope clearly",
    };

    return NextResponse.json(fallback);
  }
}