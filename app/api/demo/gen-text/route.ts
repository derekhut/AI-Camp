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
