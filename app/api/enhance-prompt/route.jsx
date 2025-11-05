import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const ENHANCE_PROMPT = `You are a prompt engineering expert. Your task is to enhance a user's prompt to make it more detailed, specific, and effective for generating high-quality React code that runs in a Sandpack browser environment.

**CRITICAL CONSTRAINTS (MUST follow - these are hard requirements):**
- Code runs in browser-only Sandpack environment (NO Node.js, NO build tools, NO bundlers)
- ONLY these npm packages are available: lucide-react (for icons), date-fns, react-chartjs-2, chart.js, firebase, @google/generative-ai, react-router-dom, uuid4, tailwind-merge, tailwindcss-animate
- Tailwind CSS is loaded via CDN (use className, no build needed)
- Use functional React components with hooks (useState, useEffect, etc.)
- Use localStorage for data persistence (no backend/API)
- JavaScript/JSX only (NO TypeScript)
- Do NOT suggest: Next.js, Vite, Create React App, or any build tool
- Do NOT suggest libraries NOT in the allowed list above
- Do NOT suggest: axios, fetch API calls, or external APIs (use localStorage or mock data)
- Keep it simple and browser-compatible

**Enhancement Guidelines:**
- Keep the user's original intent and core request
- Add specific technical details using ONLY the allowed dependencies listed above
- Make UI/UX expectations clear - use Tailwind CSS classes for styling
- Mention that Tailwind CSS is available via CDN (no configuration needed)
- Suggest using lucide-react for icons (it's already available)
- If data persistence needed, mention localStorage
- Suggest using react-router-dom for navigation if multi-page app
- Keep it concise but comprehensive (2-4 sentences for short prompts, 1-2 paragraphs for longer ones)
- Maintain a friendly, professional tone
- Do NOT add code examples or commentary
- Do NOT suggest libraries outside the allowed dependencies list
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

