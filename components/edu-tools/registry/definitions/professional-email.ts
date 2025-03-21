/**
 * 专业邮件工具定义
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

/**
 * 专业邮件工具的定义
 */
export const professionalEmailTool: ToolDefinition = {
  id: 'professional-email',
  title: '撰写专业邮件',
  description: '根据需求生成专业、得体的商务和学术邮件',
  icon: 'Mail',
  category: ToolCategory.CONTENT_CREATION,
  toolType: ToolType.EMAIL,
  
  form: {
    fields: [
      {
        id: 'emailRequest',
        label: '邮件需求',
        type: 'textarea',
        required: true,
        placeholder: '请描述您需要的邮件类型、目的和内容...',
        helpText: '详细说明邮件的目的、收件人、主要内容等'
      }
    ],
    validationSchema: z.object({
      emailRequest: z.string({
        required_error: '请输入邮件需求'
      }).min(10, {
        message: '邮件需求至少需要10个字符'
      })
    }),
    defaultValues: {
      emailRequest: ''
    }
  },
  
  prompt: {
    template: `
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
`,
    examples: [
      '撰写一封作业提交邮件，收件人为王老师，邮件主题为"数据建模作业提交"...',
      '撰写一封课程问题咨询邮件，收件人为"张教授"，邮件主题为"机器学习问题咨询"...'
    ],
    mapParamsToPrompt: (formData) => ({
      emailRequest: formData.emailRequest
    })
  },
  
  routing: {
    path: '/tools/professional-email',
    metadata: {
      title: '撰写专业邮件 | 教育工具集',
      description: '根据需求生成专业、得体的商务和学术邮件'
    }
  }
};
