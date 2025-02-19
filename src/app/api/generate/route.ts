import { NextResponse } from "next/server";
import { requestAiGeneration } from "@/server/aiServer";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const responseText = await requestAiGeneration(prompt);
    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("API Error:", error); // Log full error
    return NextResponse.json(
      { error: "Failed to generate AI response", details: String(error) },
      { status: 500 }
    );
  }
}
