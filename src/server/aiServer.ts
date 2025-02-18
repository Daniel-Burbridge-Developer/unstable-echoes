import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

export const requestAiResponse = async (content: string) => {
  const client = new OpenAI({
    baseURL: "https://router.huggingface.co/fireworks-ai",
    apiKey: process.env.HUGGINGFACE_WRITE_TOKEN,
  });

  let out = "";

  const stream = await client.chat.completions.create({
    model: "deepseek-ai/DeepSeek-R1",
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    max_tokens: 500,
    stream: true,
  });

  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      const newContent = chunk.choices[0].delta.content;
      out += newContent;
      console.log(newContent);
    }

    return out;
  }
};
