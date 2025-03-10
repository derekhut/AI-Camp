/**
 * Quiz API 服务
 *
 * 负责处理与 API 的通信，生成选择题内容
 */

import { SubjectId } from "./index";
import { generatePrompt } from "./prompts";

/**
 * /api/demo/gen-text 接口的请求格式
 */
interface GenTextRequest {
  prompt: string;
  provider: string; // AI 提供商，例如 "siliconflow"
  model: string; // 模型名称
}

/**
 * /api/demo/gen-text 接口的响应格式
 */
interface GenTextResponse {
  code: number;
  message: string;
  data?: {
    text: string;
    reasoning?: string;
  };
}

/**
 * 生成选择题参数接口
 */
export interface GenerateQuizParams {
  subjectId: SubjectId;
  subjectName: string;
  gradeLevel: string;
  count: string;
  description: string;
  customPromptTemplate?: string;
}

/**
 * 调用现有的 /api/demo/gen-text 接口生成选择题内容
 *
 * @param params 生成选择题所需的参数
 * @returns 生成的选择题内容
 */
export async function generateQuizContentWithAPI(
  params: GenerateQuizParams
): Promise<string> {
  try {
    console.log("调用 API 生成选择题，参数:", params);

    // 1. 生成完整的提示词
    let prompt: string;

    // 如果提供了自定义提示词模板，则使用它
    if (params.customPromptTemplate) {
      prompt = params.customPromptTemplate;
    } else {
      // 否则使用我们的标准提示词生成逻辑
      prompt = generatePrompt({
        subjectId: params.subjectId,
        subjectName: params.subjectName,
        gradeLevel: params.gradeLevel,
        count: params.count,
        description: params.description,
      });
    }

    // 2. 准备 API 请求
    const requestBody: GenTextRequest = {
      prompt,
      provider: "deepseek", // 使用 DeepSeek 作为提供商
      model: "deepseek-chat", // 使用 DeepSeek-chat 模型（DeepSeek-V3）
    };

    // 3. 发送 API 请求到现有的 gen-text 端点
    const response = await fetch("/api/demo/gen-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // 4. 处理响应
    if (!response.ok) {
      throw new Error(
        `API 请求失败: ${response.status} ${response.statusText}`
      );
    }

    const data: GenTextResponse = await response.json();

    // 检查响应是否成功
    if (data.code !== 0 || !data.data) {
      throw new Error(`API 返回错误: ${data.message}`);
    }

    return data.data.text;
  } catch (error) {
    console.error("生成选择题内容时出错:", error);

    // 如果 API 调用失败，返回错误消息
    return `生成选择题内容时出错: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
}
