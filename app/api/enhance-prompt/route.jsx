import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const ENHANCE_PROMPT = `You are a prompt engineering expert. Your task is to intelligently enhance a user's prompt by identifying and filling logical gaps, making requirements explicit, and ensuring the AI understands exactly what to build.

**CRITICAL CONSTRAINTS (MUST follow - these are hard requirements):**
- Code runs in browser-only Sandpack environment (NO Node.js, NO build tools, NO bundlers)
- ONLY these npm packages are available: lucide-react (for icons), date-fns, react-chartjs-2, chart.js, firebase, @google/generative-ai, react-router-dom, uuid4, tailwind-merge, tailwindcss-animate
- Tailwind CSS is loaded via CDN (use className, no build needed)
- Use functional React components with hooks (useState, useEffect, etc.)
- Use localStorage for data persistence (no backend/API)
- JavaScript/JSX only (NO TypeScript)
- Do NOT suggest libraries outside the allowed list above
- Do NOT suggest: axios, fetch API calls, or external APIs (use localStorage or mock data)

**INTELLIGENT ENHANCEMENT STRATEGY:**

1. **Identify Missing Features:**
   - What CRUD operations are needed? (Create, Read, Update, Delete)
   - What user interactions are missing? (click, hover, form submissions, etc.)
   - What data states are needed? (loading, empty, error, success)
   - What validation is required? (form validation, input checks)

2. **Fill Logical Gaps:**
   - What happens when data is empty? (empty states)
   - How are errors handled? (error messages, try-catch)
   - What user feedback is needed? (toasts, confirmations, loading states)
   - What edge cases exist? (empty inputs, invalid data, network failures)

3. **Clarify User Flows:**
   - What's the main user journey? (step-by-step flow)
   - What navigation is needed? (single-page or multi-page using react-router-dom)
   - What actions can users take? (be explicit about all interactions)

4. **Make Technical Requirements Explicit:**
   - Use Tailwind CSS for styling (available via CDN, no config needed)
   - Use lucide-react for icons (already available)
   - Use localStorage for data persistence (specify what data to save)
   - Use functional React components with hooks
   - Specify component structure (how many components, what they do)

5. **Enhance UI/UX Clarity:**
   - What should the layout look like? (grid, flex, sections)
   - What visual states are needed? (hover, active, disabled, focus)
   - What responsive behavior? (mobile, tablet, desktop)
   - What animations/transitions? (smooth, subtle)

**OUTPUT FORMAT:**
- Start with the core request (keep original intent)
- Add missing features and logical gaps explicitly
- Clarify user flows and interactions
- Specify technical implementation details
- Make UI/UX requirements clear
- Keep it comprehensive but readable (1-3 paragraphs)
- Use clear, direct language
- Do NOT add code examples or markdown formatting
- Do NOT suggest libraries outside the allowed dependencies
- Return ONLY the enhanced prompt text, nothing else

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

