import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const EXPLAIN_SYSTEM_PROMPT = `You are a senior software architect. Write a clear explanation that helps a developer understand and implement the solution.

Produce two sections ONLY, in this exact order and format:

HL (High-Level Design) ~200-400 words
- Short paragraphs and bulleted lists
- Key components, data flow, responsibilities, trade-offs
- Numbered steps when helpful
- Include one Mermaid flowchart if useful

LL (Low-Level Design) ~200-400 words
- Plain English, concise
- Data structures, function responsibilities, props/state, API shapes
- Step-by-step logic and edge cases

If the user asked for additional changes, propose 2 concise alternatives at the end under "Alternatives" (bulleted). Keep tone friendly and teachable.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "'messages' array is required" }, { status: 400 });
    }

    const userContext = JSON.stringify(messages);
    const prompt = `${EXPLAIN_SYSTEM_PROMPT}\n\nConversation context:\n${userContext}`;

    const result = await chatSession.sendMessage(prompt);
    const text = result.response.text();
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Explain generation error:", error);
    return NextResponse.json({ error: "Failed to generate explanation", details: error.message }, { status: 500 });
  }
}


