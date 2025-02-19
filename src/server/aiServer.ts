import { GoogleGenerativeAI } from "@google/generative-ai";

export async function requestAiGeneration(prompt: string): Promise<string> {
  if (!process.env.GOOGLE_AI_STUDIO_KEY) {
    console.error("Missing GOOGLE_AI_STUDIO_KEY");
    throw new Error("Missing GOOGLE_AI_STUDIO_KEY in environment variables.");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite-preview-02-05",
    });

    const result = await model.generateContent(prompt);
    return await result.response.text();
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate AI response.");
  }
}
