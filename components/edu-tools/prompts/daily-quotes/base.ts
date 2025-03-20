/**
 * 每日金句基础提示词结构
 * 此文件提供基本的提示词结构，具体内容将由您提供
 */

/**
 * 基础提示词模板
 * 用于生成每日金句的通用模板
 */
export const basePromptTemplate = ``;

/**
 * 替换模板中的变量
 * @param template 模板字符串
 * @param variables 要替换的变量对象
 * @returns 替换变量后的字符串
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string>
): string {
  let result = template;
  
  // 遍历变量对象，进行替换
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, value);
  }
  
  return result;
}
