/**
 * 每日金句工具 API 服务
 */

import { generatePrompt } from "../../prompts/daily-quotes";

/**
 * 金句生成参数接口
 */
export interface GenerateQuoteParams {
  category: string;      // 金句类别
  gradeLevel: string;    // 适用年龄/教育阶段
  count: string;         // 金句数量
  description: string;   // 主题或关键词
}

/**
 * 生成金句内容
 * @param params 生成参数
 * @returns 生成的金句内容
 */
export async function generateQuoteContentWithAPI(params: GenerateQuoteParams): Promise<string> {
  try {
    // 生成提示词
    const prompt = generatePrompt(params);
    
    // 构建 API 请求
    const response = await fetch('/api/demo/gen-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        provider: "siliconflow", // 或其他提供商
        model: "sf-gemma2", // 或其他模型
      }),
    });

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    // 解析响应数据
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(`API返回错误: ${data.message}`);
    }

    // 返回生成的内容
    return data.data?.text || "生成内容失败";
  } catch (error) {
    console.error("生成每日金句内容时出错:", error);
    throw error;
  }
}
