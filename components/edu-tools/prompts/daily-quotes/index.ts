/**
 * 每日金句提示词管理
 * 
 * 这个文件作为每日金句提示词模块的主入口点
 * 提供统一的接口供金句工具组件使用
 */

import { basePromptTemplate, replaceTemplateVariables } from "./base";

/**
 * 生成每日金句提示词
 * @param params 生成提示词所需的参数
 * @returns 完整的提示词
 */
export function generatePrompt(params: {
  category: string;      // 金句类别
  gradeLevel: string;    // 适用年龄/教育阶段
  count: string;         // 金句数量
  description: string;   // 主题或关键词
}): string {
  // 使用基本模板替换变量
  const variables = {
    category: params.category,
    gradeLevel: params.gradeLevel,
    count: params.count,
    description: params.description,
  };
  
  return replaceTemplateVariables(basePromptTemplate, variables);
}
