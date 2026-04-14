// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const skills: string[] = body.skills || [];

//     if (!skills.length) {
//       return NextResponse.json(
//         { error: "No skills provided" },
//         { status: 400 }
//       );
//     }

//     const result = skills
//       .map((skill) => {
//         return `
// 🚀 ${skill.toUpperCase()} → Freelancer Exit Plan

// 😡 Problem:
// - You depend on clients for income
// - No passive income
// - Time = money trap

// 🎯 Step 1: Choose a Niche
// Turn your skill into a specific niche:
// - ${skill} → "Real Estate Websites"
// - ${skill} → "Ecommerce Stores"

// 🎯 Step 2: Identify a Problem
// Look at your past clients:
// - What do they repeatedly ask for?
// - What tasks are repetitive?

// 👉 That is your SaaS opportunity

// 🎯 Step 3: Build a Micro SaaS
// Don’t build a big product — start small:
// - A simple tool
// - A generator
// - A dashboard

// 🛠 Suggested Tech Stack:
// - Next.js
// - Stripe (for payments)
// - Vercel (for hosting)

// 🎯 Step 4: Build an Audience
// Start posting content:
// - Twitter / LinkedIn
// - Share your journey ("build in public")

// 🎯 Step 5: Get First Users
// - Convert your existing clients
// - Offer free trials
// - Collect feedback

// 🎯 Step 6: Productize Your Service
// - "I build websites for you" ❌
// - "Pay monthly for my tool" ✅

// 💰 Step 7: Build Passive Income
// - Charge $10/month
// - 100 users = $1000/month

// 🔥 Final Goal:
// - Stop freelancing
// - Run your own SaaS
// - Earn recurring income
//         `;
//       })
//       .join("\n\n============================\n\n");

//     return NextResponse.json({ result });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import OpenAI from "openai";

// ✅ Fallback plan (when AI fails or no quota)
const fallbackPlan = (skills: string[]) => {
  return skills
    .map(
      (skill) => `
🚀 ${skill.toUpperCase()} → Freelancer Exit Plan

😡 Problem:
- You depend on clients for income
- No passive income
- Time = money trap

🎯 Niche Idea:
- ${skill} for Ecommerce / Real Estate

💡 SaaS Idea:
- Build a small tool for repeated client tasks

🛠 Build Stack:
- Next.js
- Stripe (payments)
- Vercel (hosting)

📈 Get Users:
- Convert existing clients
- Share content on Twitter / LinkedIn

💰 Monetization:
- $10/month subscription
- 100 users = $1000/month

🔥 Final Goal:
- Escape freelancing
- Build recurring SaaS income
`
    )
    .join("\n\n========================\n\n");
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const skills: string[] = body.skills || [];

    // ❌ No skills
    if (!skills.length) {
      return NextResponse.json(
        { error: "No skills provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ✅ If no API key → fallback directly
    if (!apiKey) {
      return NextResponse.json({
        result: fallbackPlan(skills),
      });
    }

    const openai = new OpenAI({ apiKey });

    try {
      // 🔥 AI generation
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert SaaS founder helping freelancers build products and escape freelancing.",
          },
          {
            role: "user",
            content: `
Create a detailed Freelancer Exit Plan.

User skills: ${skills.join(", ")}

Include:
- Problem
- Niche
- SaaS idea
- Build steps
- Getting users
- Monetization
- Final goal

Make it practical and structured.
            `,
          },
        ],
      });

      const result =
        response.choices?.[0]?.message?.content;

      return NextResponse.json({
        result: result || fallbackPlan(skills),
      });
    } catch (err) {
      console.error("❌ AI failed, using fallback:", err);

      // 🔁 If AI fails (quota, error, etc.)
      return NextResponse.json({
        result: fallbackPlan(skills),
      });
    }
  } catch (error) {
    console.error("🔥 Server Error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}