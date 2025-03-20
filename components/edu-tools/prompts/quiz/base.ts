/**
 * 基础提示词模板
 * 用于生成 AP 学科选择题的通用模板
 */

/**
 * 基础提示词模板
 * 所有学科的提示词都将基于这个模板，并添加特定学科的指令
 */
export const basePromptTemplate = `
你是一位经验丰富的 AP 考试老师和出题专家。
现在，请你为以下学科创建高质量的选择题：{{subjectName}}

要求：
1. 根据以下描述生成选择题：{{description}}
2. 难度级别：{{gradeLevel}}
3. 共生成 {{count}} 道选择题
4. 每个题目必须有4个选项 (A, B, C, D)
5. 所有题目必须遵循 AP 考试的标准和规范
6. 在题目末尾提供所有题目的答案和简要解析

请确保题目：
- 清晰明确，没有歧义
- 难度适中，符合指定级别
- 覆盖该学科的关键知识点
- 遵循 AP 考试的出题风格和标准
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
