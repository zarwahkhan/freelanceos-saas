
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

    // ✅ get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    const project = body.project || "General freelance project";
    const experience = body.experience || "3+ years";

    // ✅ get recent earnings history
    const earnings = await prisma.earnings.findMany({
      where: { userId: user.id },
      orderBy: { id: "desc" },
      take: 20,
    });

    const earningsHistory = earnings.map((e: any) => ({
      amount: e.amount,
      date: e.createdAt
        ? e.createdAt.toISOString()
        : new Date().toISOString(),
    }));

    // ✅ OpenAI call for pricing suggestion
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a pricing expert for freelancers",
        },
        {
          role: "user",
          content: `Suggest pricing strategy for this freelancer:

Name: ${user.name || "Freelancer"}
Experience: ${experience}

Project: ${project}

Recent Earnings:
${JSON.stringify(earningsHistory)}

Provide:
- Recommended hourly rate
- Project price estimate
- Pricing strategy
- Improvement suggestions`,
        },
      ],
    });

    const result = aiResponse.choices[0].message.content;

    // ✅ save analysis in DB
    await prisma.aIAnalysis.create({
      data: {
        type: "PRICING_SUGGESTION",
        input: JSON.stringify({ project, experience }),
        result: result || "",
        userId: user.id,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Pricing Analysis Error:", error);

    // ✅ fallback if OpenAI fails
    const fallback = {
      recommendedRate: 60,
      projectEstimate: "800 - 1500 USD",
      strategy: "Value-based pricing",
      tips: [
        "Avoid underpricing",
        "Charge based on outcome",
        "Target high-paying clients",
      ],
    };

    return NextResponse.json(fallback);
  }
}