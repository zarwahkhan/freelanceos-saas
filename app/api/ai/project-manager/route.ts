import { NextResponse } from "next/server";
import OpenAI from "openai";

// fallback (jab AI fail ho)
const fallback = (input: string) => `
🤖 AI Project Manager Plan

📌 Project Input:
${input}

🧠 Task Breakdown:
- Define main deliverables
- Split into small tasks
- Assign priorities

⏳ Timeline:
- Day 1–2: Planning
- Day 3–5: Development
- Day 6: Review
- Day 7: Delivery

⚠️ Risks:
- Scope creep
- Client delays
- Underestimation

📈 Suggestions:
- Daily progress tracking
- Clear milestones
- Communicate with client regularly

💡 Goal:
Act like your own AI project manager
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = body.projectDetails || body.input || "";

    if (!input) {
      return NextResponse.json(
        { error: "No project details provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ result: fallback(input) });
    }

    const openai = new OpenAI({ apiKey });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI Project Manager that helps freelancers manage projects, deadlines, risks, and clients.",
          },
          {
            role: "user",
            content: `
Project details:
${input}

Create a structured AI Project Manager output:

Include:
- Task breakdown
- Timeline
- Priorities
- Risks
- Delay prediction
- Suggestions
- Client communication tips

Make it practical and clear.
            `,
          },
        ],
      });

      const result =
        response.choices?.[0]?.message?.content;

      return NextResponse.json({
        result: result || fallback(input),
      });
    } catch (err) {
      console.error("AI failed → fallback used");

      return NextResponse.json({
        result: fallback(input),
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}