"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [myAiResponse, setMyAiResponse] = useState("");

  const requestAiGenerationClient = async (prompt: string) => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const data = await res.json();
      setMyAiResponse(data.response);
    } catch (error) {
      console.error("Client Fetch Error:", error);
      setMyAiResponse("Error generating response.");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-slate-800 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button
          onClick={() =>
            requestAiGenerationClient(
              "tell me a short story, greet the world my creation"
            )
          }
        >
          Request AI Response
        </Button>
        <h1>{myAiResponse}</h1>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
