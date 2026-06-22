import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

function extractContent(response) {
  if (!response) return "";

  if (typeof response.text === "string") {
    return response.text.trim();
  }

  if (Array.isArray(response.text)) {
    return response.text
      .map((item) => {
        if (typeof item === "string") return item;
        if (item?.text) return item.text;
        return "";
      })
      .join("")
      .trim();
  }

  if (typeof response.content === "string") {
    return response.content.trim();
  }

  if (Array.isArray(response.content)) {
    return response.content
      .map((item) => {
        if (typeof item === "string") return item;
        if (item?.text) return item.text;
        return "";
      })
      .join("")
      .trim();
  }

  return "";
}

export async function generateResponse(messages) {
  const latestUserMessage = Array.isArray(messages)
    ? [...messages].reverse().find((msg) => msg?.role === "user")?.content
    : String(messages || "");

  if (!process.env.GEMINI_API_KEY) {
    return `I can help with that. ${String(latestUserMessage || "").slice(0, 180)}`;
  }

  const formattedMessages = Array.isArray(messages)
    ? messages
      .filter((msg) => msg && msg.role && typeof msg.content === "string")
      .map((msg) => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        if (msg.role === "ai") return new AIMessage(msg.content);
        return null;
      })
      .filter(Boolean)
    : [new HumanMessage(String(messages || ""))];

  if (!formattedMessages.length) {
    return "";
  }

  const response = await geminiModel.invoke([
    new SystemMessage(`
Answer like Perplexity Lite.
Rules:
- Be exact and concise
- Prefer 3 to 6 short sentences
- Do not add filler
- If uncertain, say what is uncertain
- No markdown tables unless asked
    `),
    ...formattedMessages,
  ]);
  return extractContent(response);
}

export async function generateChatTitle(message) {
  try {
    if (!message?.trim()) {
      return "New Conversation";
    }

    const response = await mistralModel.invoke([
      new SystemMessage(`
You are an expert chat title generator.

Generate a concise title for a conversation.

Rules:
- Maximum 10 words
- Minimum 2 words
- Clear and descriptive
- No emojis
- No quotation marks
- No punctuation
- Return ONLY the title
- Do not explain your answer

Examples:

User: How do I build a RAG chatbot?
Title: Building a RAG Chatbot

User: Create a visitor management system
Title: Visitor Management System

User: Help me learn FastAPI
Title: FastAPI Learning Guide
      `),

      new HumanMessage(message),
    ]);

    const title = extractContent(response);

    return title || "New Conversation";
  } catch (error) {
    console.error("Title generation error:", error);
    return "New Conversation";
  }
}
