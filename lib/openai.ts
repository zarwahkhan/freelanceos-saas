import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeProject(projectDescription: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert project manager for freelancers. Break down the project into tasks, estimate timelines, and provide priority recommendations. Return JSON with this structure:
{
  "tasks": [{"title": string, "description": string, "estimatedHours": number, "priority": "LOW"|"MEDIUM"|"HIGH"|"URGENT", "dueDate": "ISO string"}],
  "timeline": string,
  "totalEstimatedHours": number,
  "recommendations": string[],
  "risks": string[]
}`,
      },
      {
        role: "user",
        content: `Analyze this freelance project and break it down: ${projectDescription}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function analyzeClient(clientDescription: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert in client assessment for freelancers. Analyze the client description and return a JSON assessment:
{
  "seriousnessScore": number (0-100),
  "budgetEstimateMin": number,
  "budgetEstimateMax": number,
  "riskLevel": "LOW"|"MEDIUM"|"HIGH",
  "redFlags": string[],
  "greenFlags": string[],
  "recommendation": string,
  "suggestions": string[]
}`,
      },
      {
        role: "user",
        content: `Analyze this client/project description: ${clientDescription}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function analyzePricing(
  skills: string[],
  currentRate: number,
  earningsHistory: { amount: number; date: string; platform?: string }[]
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a freelance revenue optimization expert. Analyze the freelancer's data and provide actionable pricing advice. Return JSON:
{
  "currentRateAssessment": string,
  "recommendedRate": number,
  "priceIncreasePercentage": number,
  "lowValueSignals": string[],
  "highIncomeOpportunities": string[],
  "nichesToTarget": string[],
  "actionableSteps": string[]
}`,
      },
      {
        role: "user",
        content: `Analyze my freelance data: Skills: ${skills.join(", ")}. Current rate: $${currentRate}/hr. Recent earnings: ${JSON.stringify(earningsHistory)}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function generateBusinessIdeas(
  skills: string[],
  experience: string
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a startup advisor helping freelancers transition to founders. Generate business ideas and roadmaps. Return JSON:
{
  "ideas": [
    {
      "title": string,
      "description": string,
      "category": "SAAS"|"AGENCY"|"PRODUCTIZED_SERVICE"|"COURSE"|"OTHER",
      "effort": "LOW"|"MEDIUM"|"HIGH",
      "potential": "LOW"|"MEDIUM"|"HIGH",
      "steps": [{"step": number, "title": string, "description": string, "timeframe": string}]
    }
  ]
}`,
      },
      {
        role: "user",
        content: `Generate business transition ideas for a freelancer with: Skills: ${skills.join(", ")}. Experience: ${experience}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export default openai;
