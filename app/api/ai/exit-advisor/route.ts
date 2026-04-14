import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { total, target } = await req.json();

    if (!total || !target) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const remaining = target - total;

    const days = Math.ceil(remaining / 100); // assume $100/day avg

    const result = `
🚀 AI Exit Advisor

💰 Current Earnings:
$${total}

🎯 Target:
$${target}

📉 Remaining:
$${remaining}

⏳ Estimated Time:
~${days} days (based on $100/day)

🧠 Strategy:
- Focus on high-ticket clients
- Increase pricing (don't stay cheap)
- Reduce low-paying gigs
- Save aggressively for SaaS runway

🔥 Next Move:
Start validating your SaaS idea NOW
Don't wait for perfect timing
`;

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI failed" },
      { status: 500 }
    );
  }
}