/**
 * 专业邮件提示词管理
 * 
 * 这个文件作为专业邮件提示词模块的主入口点
 * 提供统一的接口供邮件工具组件使用
 */

import { basePromptTemplate, replaceTemplateVariables } from "./base";

/**
 * 生成专业邮件提示词
 * @param params 生成提示词所需的参数
 * @returns 完整的提示词
 */
export function generatePrompt(params: {
  emailRequest: string;  // 邮件需求
}): string {
  // 使用基本模板替换变量
  const variables = {
    emailRequest: params.emailRequest
  };
  
  return replaceTemplateVariables(basePromptTemplate, variables);
}