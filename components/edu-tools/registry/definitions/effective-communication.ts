/**
 * 有效沟通工具定义
 * 根据指定沟通场景提供有效的沟通策略
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

export const effectiveCommunicationTool: ToolDefinition = {
  id: 'effective-communication',
  title: '有效沟通',
  description: '根据沟通场景提供专业的沟通策略和技巧',
  icon: 'MessageSquare',
  category: ToolCategory.CREATIVITY_LAB,
  toolType: ToolType.TEXT_GENERATION,
  
  form: {
    fields: [
      {
        id: 'scenario',
        label: '沟通场景',
        type: 'text',
        required: true,
        placeholder: '请输入具体的沟通场景',
        helpText: '例如：学术演讲、小组讨论、冲突解决、团队会议等'
      }
    ],
    validationSchema: z.object({
      scenario: z.string({
        required_error: '请输入沟通场景'
      }).min(1, {
        message: '沟通场景不能为空'
      })
    }),
    defaultValues: {
      scenario: ''
    }
  },
  
  prompt: {
    template: `你是一位资深的沟通技巧培训师，拥有多年的企业和个人沟通咨询经验。你的任务是根据用户提供的具体沟通场景，提供一份有效的沟通策略。这份策略应该包含以下部分：

1. 场景分析：简要分析给定的沟通场景，包括可能遇到的挑战和机遇。

2. 目标建议：根据场景特点，提出适合该场景的沟通目标建议。

3. 策略建议：给出至少三条具体的沟通建议，这些策略应该有助于克服场景中的挑战并实现沟通目标。

4. 语言技巧：提供一些有助于提升沟通效果的语言技巧，如积极倾听、同理心表达等。

5. 注意事项：列出在沟通过程中需要注意的地方，以避免产生不必要的误解或冲突。

请根据以下沟通场景提供专业的沟通策略：

沟通场景：{{scenario}}`,
    examples: [
      '团队内部的项目进度会议',
      '学术演讲',
      '与客户的谈判',
      '冲突解决',
      '跨部门协作'
    ],
    mapParamsToPrompt: (formData) => ({
      scenario: formData.scenario
    })
  },
  
  routing: {
    path: '/tools/effective-communication',
    metadata: {
      title: '有效沟通 | AI Camp',
      description: '根据沟通场景提供专业的沟通策略和技巧'
    }
  }
};
