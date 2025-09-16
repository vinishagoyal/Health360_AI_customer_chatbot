"use client";

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterRequest {
  model: "deepseek/deepseek-chat-v3.1:free";
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterClient {
  private apiKey: string;
  private baseUrl = "https://openrouter.ai/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: OpenRouterMessage[], options?: {
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    try {
      const request: OpenRouterRequest = {
        model: "deepseek/deepseek-chat-v3.1:free",
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1000,
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://health360-demo.vercel.app",
          "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Health360 Supplements",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
      }

      const data: OpenRouterResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response from OpenRouter API");
      }

      const choice = data.choices[0];
      if (!choice || !choice.message || !choice.message.content) {
        throw new Error("Invalid response format from OpenRouter API");
      }

      return choice.message.content.trim();
    } catch (error) {
      console.error("OpenRouter API error:", error);
      throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Method to check API connectivity
  async testConnection(): Promise<boolean> {
    try {
      const testMessages: OpenRouterMessage[] = [
        { role: "user", content: "Hello" }
      ];

      await this.chat(testMessages, { maxTokens: 10 });
      return true;
    } catch (error) {
      console.error("OpenRouter connection test failed:", error);
      return false;
    }
  }
}

// Singleton instance
let openRouterClient: OpenRouterClient | null = null;

export function getOpenRouterClient(): OpenRouterClient {
  if (!openRouterClient) {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OpenRouter API key not configured. Please set NEXT_PUBLIC_OPENROUTER_API_KEY environment variable.");
    }
    openRouterClient = new OpenRouterClient(apiKey);
  }
  return openRouterClient;
}

export type { OpenRouterMessage, OpenRouterRequest, OpenRouterResponse };
