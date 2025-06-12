/**
 * 教育工具统一API服务
 * 处理所有工具的API调用和提示词处理
 */
import { getToolById } from './tool-registry';

/**
 * API调用错误类
 */
export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * 替换提示词模板中的变量
 * @param template 提示词模板
 * @param params 替换参数
 * @returns 处理后的提示词
 */
export function replaceTemplateVariables(template: string, params: Record<string, any>): string {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    const trimmedKey = key.trim();
    return params[trimmedKey] !== undefined ? params[trimmedKey] : `{{${trimmedKey}}}`;
  });
}

/**
 * 生成工具的完整提示词
 * @param toolId 工具ID
 * @param formData 表单数据
 * @returns 生成的提示词
 */
export async function generatePrompt(toolId: string, formData: any): Promise<string> {
  const tool = getToolById(toolId);
  if (!tool) {
    throw new Error(`工具 "${toolId}" 未找到`);
  }
  
  // 预处理表单数据
  const processedData = tool.customHandlers?.preProcess
    ? tool.customHandlers.preProcess(formData)
    : formData;
  
  // 转换为提示词参数
  const promptParams = tool.prompt.mapParamsToPrompt(processedData);
  
  // 生成提示词
  return replaceTemplateVariables(tool.prompt.template, promptParams);
}

/**
 * 定义API请求类型
 */
interface GenTextRequest {
  prompt: string;
  provider: string; // 提供商，如 "deepseek"
  model: string;   // 模型，如 "deepseek-chat"
}

/**
 * 定义API响应类型
 */
interface GenTextResponse {
  code: number;     // 响应代码，0表示成功
  message: string;  // 响应消息
  data?: {
    text: string;    // 生成的文本结果
    reasoning?: string; // 可能包含的推理过程
  };
}

/**
 * 调用生成API获取结果
 * @param prompt 提示词
 * @param provider 提供商，默认为"deepseek"
 * @param model 模型名称，默认为"deepseek-chat"
 * @returns API返回的结果
 */
export async function callGenerationAPI(
  prompt: string, 
  provider: string = "openrouter-gemma", 
  model: string = "google/gemma-3n-e4b-it:free"
): Promise<string> {
  try {
    // 准备API请求体
    const requestBody: GenTextRequest = {
      prompt,
      provider, // 可以是 "deepseek"、"openai"、"openrouter" 或 "openrouter-gemma"
      model,    // 对应的模型名称
    };

    // 发送请求到现有的gen-text端点
    const response = await fetch('/api/demo/gen-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new APIError(`API调用失败: ${response.statusText}`, response.status);
    }
    
    // 解析响应
    const data: GenTextResponse = await response.json();
    
    // 检查响应是否成功
    if (data.code !== 0 || !data.data) {
      throw new APIError(`API返回错误: ${data.message}`);
    }
    
    // 特别注意：只返回 text 字段，这样可以正确处理 markdown 格式
    return data.data.text; // 返回生成的文本
  } catch (error) {
    console.error('API调用出错:', error);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`API调用出错: ${(error as Error).message}`);
  }
}

/**
 * 使用指定工具生成内容
 * @param toolId 工具ID
 * @param formData 表单数据
 * @returns 生成的内容
 */
export async function generateToolContent(toolId: string, formData: any): Promise<string> {
  const tool = getToolById(toolId);
  if (!tool) {
    throw new Error(`工具 "${toolId}" 未找到`);
  }
  
  // 生成提示词
  const prompt = await generatePrompt(toolId, formData);
  
  // 调用API
  const result = await callGenerationAPI(prompt);
  
  // 后处理结果
  return tool.customHandlers?.processResult
    ? tool.customHandlers.processResult(result)
    : result;
}
