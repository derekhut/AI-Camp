/**
 * 专业邮件基础提示词模板
 * 用于生成专业、得体的商务和学术邮件
 */

/**
 * 基础提示词模板
 * 接收单一参数"邮件需求"，然后生成符合要求的邮件
 */

/**
 * 示例1：提交作业
 * 撰写一封作业提交邮件，收件人为王老师，邮件主题为"数据建模作业提交"。邮件正文应首先对王老师表示问候，
 * 并简要说明邮件的目的为"提交数据建模课程的编程作业"。接着，详细描述邮件的内容，包括"作业名称：七步建模法"。
 * 然后，列出邮件需要包含的附件，例如"作业代码.zip"和"测试报告.pdf"。最后，表达期待张教授的反馈，
 * 并提供"邮箱：student@university.com"以便进一步沟通。邮件结束语为"此致敬礼"，发件人署名为"任睿敏"。
 * 
 * 示例2：提问邮件
 * 撰写一封课程问题咨询邮件，收件人为"张教授"，邮件主题为"机器学习问题咨询"。邮件正文应首先对张教授表示问候，
 * 并简要说明邮件的目的为"咨询关于梯度下降算法的理解问题"。接着，详细描述邮件的内容，
 * 包括"在实现梯度下降算法时遇到收敛速度过慢的问题，已尝试调整学习率但效果不佳"。
 * 然后，列出邮件需要包含的附件，例如"代码截图.png"和"实验结果.xlsx"。最后，表达期待张教授的回复，
 * 并提供"邮箱：student@university.com"以便进一步沟通。邮件结束语为"此致敬礼"，发件人署名为"张文远"。
 */
export const basePromptTemplate = `
你是一位专业的邮件撰写专家，精通商务沟通和学术交流。
请根据以下需求，撰写一封专业、得体的邮件：

{{emailRequest}}

要求：
1. 使用专业、得体的语言
2. 结构清晰，逻辑连贯
3. 语气适合收件人和目的
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
