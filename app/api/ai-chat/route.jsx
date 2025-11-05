import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "'prompt' is required and must be a string" },
                { status: 400 }
            );
        }

        const result = await chatSession.sendMessage(prompt);
        const AIResp = result.response.text();
        return NextResponse.json({ result: AIResp });
    } catch (error) {
        console.error("AI chat error:", error);
        const message = error?.message || "Internal Server Error";
        return NextResponse.json(
            { error: "Failed to get AI response", details: message },
            { status: 500 }
        );
    }
}