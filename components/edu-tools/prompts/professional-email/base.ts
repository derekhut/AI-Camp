/**
 * 专业邮件基础提示词模板
 * 用于生成专业、得体的商务和学术邮件
 */

/**
 * 基础提示词模板
 * 所有邮件类型的提示词都将基于这个模板，并添加特定目的的指令
 */
export const basePromptTemplate = `
你是一位专业的邮件撰写专家，精通商务沟通和学术交流。
现在，请你根据以下信息撰写一封专业、得体的邮件：

收件人类型：{{recipient}}
邮件目的：{{purpose}}
适用场景：{{gradeLevel}}
主要内容：{{description}}

要求：
1. 使用专业、得体的语言
2. 结构清晰，逻辑连贯
3. 语气适合指定的收件人和目的
4. 包含适当的开头称呼和结尾署名
5. 清楚表达主要内容和目的

请确保邮件：
- 专业且有礼貌
- 简洁明了，不啰嗦
- 符合商务或学术邮件的标准格式
- 没有语法或拼写错误
`;

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
