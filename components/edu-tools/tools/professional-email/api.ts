/**
 * 专业邮件工具 API 服务
 */

import { generatePrompt } from "../../prompts/professional-email";

/**
 * 专业邮件生成参数接口
 */
export interface GenerateEmailParams {
  emailRequest: string;  // 邮件需求
}

/**
 * 生成专业邮件内容
 * @param params 生成参数
 * @returns 生成的邮件内容
 */
export async function generateEmailContentWithAPI(params: GenerateEmailParams): Promise<string> {
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
    console.error("生成专业邮件内容时出错:", error);
    throw error;
  }
}
