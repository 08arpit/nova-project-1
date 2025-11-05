import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import Lookup from "@/data/Lookup";

export async function POST(req) {
    try {
        const {prompt} = await req.json();
        
        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        console.log("[GEN-AI-CODE] Prompt:", prompt);
        const result = await GenAiCode.sendMessage(prompt);
        const resp = result.response.text();
        console.log("[GEN-AI-CODE] Raw AI response:", resp);
        
        try {
            const parsedResponse = JSON.parse(extractJsonString(resp));
            return NextResponse.json(parsedResponse);
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError, resp);
            // Fallback: return a minimal runnable project so the client doesn't break
            const fallbackFiles = Lookup?.DEFAULT_FILE || {};
            const generatedFiles = Object.keys(fallbackFiles);
            const fallback = {
                projectTitle: "AI Output (Fallback)",
                explanation: "The AI returned a non-JSON response. Showing a runnable fallback template. Details included in README.md.",
                files: {
                    ...fallbackFiles,
                    '/README.md': { code: `AI response could not be parsed as JSON.\n\nRaw Response:\n\n${resp}` }
                },
                generatedFiles
            };
            return NextResponse.json(fallback);
        }
        
    } catch (error) {
        console.error("AI code generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate code", details: error.message },
            { status: 500 }
        );
    }
}

// Extract a valid JSON substring from an AI response that may include prose or code fences
function extractJsonString(text) {
    if (typeof text !== "string") return text;
    // If fenced code block exists, prefer it
    const fenceMatch = text.match(/```(?:json)?\n([\s\S]*?)```/i);
    if (fenceMatch && fenceMatch[1]) {
        return fenceMatch[1].trim();
    }
    // Otherwise, attempt to find the first balanced JSON object
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
        const candidate = text.slice(start, end + 1).trim();
        return candidate;
    }
    return text;
}