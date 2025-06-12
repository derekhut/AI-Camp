import {
  LanguageModelV1,
  extractReasoningMiddleware,
  generateText,
  wrapLanguageModel,
} from "ai";
import { respData, respErr } from "@/lib/resp";

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { deepseek } from "@ai-sdk/deepseek";
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { prompt, provider, model } = await req.json();
    if (!prompt || !provider || !model) {
      return respErr("invalid params");
    }

    let textModel: LanguageModelV1;

    switch (provider) {
      case "openai":
        textModel = openai(model);
        break;
      case "deepseek":
        // 使用 createOpenAICompatible 创建 DeepSeek 客户端
        const deepseekClient = createOpenAICompatible({
          name: "deepseek",
          apiKey: process.env.DEEPSEEK_API_KEY || "",
          baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
        });
        textModel = deepseekClient(model);
        break;
      case "openrouter":
        const openrouter = createOpenRouter({
          apiKey: process.env.OPENROUTER_API_KEY,
        });
        textModel = openrouter(model);

        if (model === "deepseek/deepseek-r1") {
          const enhancedModel = wrapLanguageModel({
            model: textModel,
            middleware: extractReasoningMiddleware({
              tagName: "think",
            }),
          });
          textModel = enhancedModel;
        }
        break;
      case "openrouter-gemma":
        // 使用 OpenAI 客户端直接访问 OpenRouter 的 Gemma
        try {
          const directOpenAI = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY || "",
            defaultHeaders: {
              "HTTP-Referer": process.env.SITE_URL || "https://ai-camp.vercel.app", 
              "X-Title": "AI Camp",
            },
          });
          
          const result = await directOpenAI.chat.completions.create({
            model: model, // 例如 "google/gemma-3n-e4b-it:free"
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
          });
          
          // 返回结果，不使用 generateText
          return respData({
            text: result.choices[0].message.content || "",
            reasoning: null,
          });
        } catch (error) {
          console.error("OpenRouter-Gemma direct API error:", error);
          return respErr(`OpenRouter-Gemma API failed: ${(error as Error).message}`);
        }
        break;
      case "siliconflow":
        const siliconflow = createOpenAICompatible({
          name: "siliconflow",
          apiKey: process.env.SILICONFLOW_API_KEY,
          baseURL: process.env.SILICONFLOW_BASE_URL,
        });
        textModel = siliconflow(model);

        if (model === "deepseek-ai/DeepSeek-R1") {
          const enhancedModel = wrapLanguageModel({
            model: textModel,
            middleware: extractReasoningMiddleware({
              tagName: "reasoning_content",
            }),
          });
          textModel = enhancedModel;
        }

        break;
      default:
        return respErr("invalid provider");
    }

    const { reasoning, text, warnings } = await generateText({
      model: textModel,
      prompt: prompt,
    });

    if (warnings && warnings.length > 0) {
      console.log("gen text warnings:", provider, warnings);
      return respErr("gen text failed");
    }

    return respData({
      text: text,
      reasoning: reasoning,
    });
  } catch (err) {
    console.log("gen text failed:", err);
    return respErr("gen text failed");
  }
}
