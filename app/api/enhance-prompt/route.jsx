import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const ENHANCE_PROMPT = `You are a prompt engineering expert. Your task is to enhance a user's prompt to make it more detailed, specific, and effective for generating high-quality code.

**Guidelines:**
- Keep the user's original intent and core request
- Add specific technical details (e.g., framework, styling approach, features)
- Make it clearer about UI/UX expectations if applicable
- Include requirements for structure, organization, and best practices
- Keep it concise but comprehensive (aim for 2-4 sentences if the original is short, 1-2 paragraphs if longer)
- Maintain a friendly, professional tone
- Do NOT add code examples or commentary
- Return ONLY the enhanced prompt, nothing else

**Original prompt:**`;

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "'prompt' is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const fullPrompt = `${ENHANCE_PROMPT}\n\n${prompt}`;
    const result = await chatSession.sendMessage(fullPrompt);
    const enhanced = result.response.text().trim();
    
    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Prompt enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt", details: error.message },
      { status: 500 }
    );
  }
}

