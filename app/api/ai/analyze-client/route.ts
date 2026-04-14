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

//     // ✅ get user from DB
//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const body = await request.json();
//     const clientInfo = body.clientInfo || body.description;

//     // ✅ validation
//     if (!clientInfo) {
//       return NextResponse.json(
//         { error: "Client description required" },
//         { status: 400 }
//       );
//     }

//     // ✅ OpenAI call for client analysis
//     const aiResponse = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "system",
//           content: "You are a freelance risk analyst who evaluates clients for safety and reliability.",
//         },
//         {
//           role: "user",
//           content: `Analyze this client:
// ${clientInfo}

// Tell:
// - Is client good or bad?
// - Red flags
// - Should I work with them?`,
//         },
//       ],
//     });

//     const result = aiResponse.choices[0].message.content;

//     // ✅ save analysis in DB
//     await prisma.aIAnalysis.create({
//       data: {
//         type: "CLIENT_ANALYSIS",
//         input: clientInfo,
//         result: result || "",
//         userId: user.id,
//       },
//     });

//     return NextResponse.json({ result });
//   } catch (error) {
//     console.error("AI Analysis Error:", error);

//     // ✅ fallback response in case OpenAI fails
//     const fallback = {
//       seriousnessScore: 65,
//       budgetEstimateMin: 500,
//       budgetEstimateMax: 2000,
//       riskLevel: "MEDIUM",
//       redFlags: ["Vague project description", "No budget mentioned"],
//       greenFlags: ["Clear deadline", "Responsive communication"],
//       recommendation:
//         "Proceed with caution. Request detailed specifications before accepting.",
//       suggestions: [
//         "Ask for a detailed requirements document",
//         "Request a 50% upfront payment",
//         "Set clear revision limits",
//         "Schedule weekly check-ins",
//       ],
//     };

//     return NextResponse.json(fallback);
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const clientData: string = body.clientData;

  if (!clientData) {
    return NextResponse.json({ error: "No client data provided" }, { status: 400 });
  }

  // --- SaaS AI Logic (fake for now, can integrate OpenAI later) ---
  const result = `
🚨 Client Analysis Result:
- Serious: ${Math.random() > 0.5 ? "Yes ✅" : "No ❌"}
- Estimated Budget: $${Math.floor(Math.random() * 5000 + 500)}
- Negotiation Flexibility: ${Math.floor(Math.random() * 30 + 10)}%
- Suggested Approach: ${Math.random() > 0.5 ? "Negotiate confidently" : "Confirm seriousness first"}
`;

  return NextResponse.json({ result });
}