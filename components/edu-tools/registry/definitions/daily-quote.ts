/**
 * 每日金句工具定义
 * 根据指定目的生成指定数量的鼓舞人心的金句
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

export const dailyQuoteTool: ToolDefinition = {
  id: 'daily-quote',
  title: '每日金句',
  description: '根据指定目的生成鼓舞人心、发人深省的金句',
  icon: 'Quote',
  category: ToolCategory.CONTENT_CREATION,
  toolType: ToolType.DAILY_QUOTE,
  
  form: {
    fields: [
      {
        id: 'purpose',
        label: '目的',
        type: 'text',
        required: true,
        placeholder: '请输入金句的使用场景或想要达到的效果',
        helpText: '例如：激励学生学习、鼓励团队合作、提升自信心等'
      },
      {
        id: 'count',
        label: '数量',
        type: 'text',
        required: true,
        placeholder: '请输入需要生成的金句数量',
        helpText: '输入一个1-10之间的数字'
      }
    ],
    validationSchema: z.object({
      purpose: z.string({
        required_error: '请输入金句目的'
      }).min(1, {
        message: '金句目的不能为空'
      }),
      count: z.string({
        required_error: '请输入金句数量'
      }).min(1, {
        message: '金句数量不能为空'
      }).refine((val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 1 && num <= 10;
      }, {
        message: '金句数量必须是1-10之间的数字'
      })
    }),
    defaultValues: {
      purpose: '',
      count: '3'
    }
  },
  
  prompt: {
    template: `你是一位在经典文学和写作领域拥有30年经验的知名专家，擅长创作鼓舞人心的金句，并深入研究历史上伟大思想家、作家和领袖的作品。你能够结合多种文学手法，拥有丰富的哲学思想、文学杰作和历史背景知识，这些都孕育了一些最深刻、最鼓舞人心的名言。

你的任务是根据用户指定的【目的】，生成【数量】条高质量、发人深省的金句，这些金句应蕴含永恒的智慧，反思人类处境，或对生活、成功和知识追求提供独特视角。这些句子必须具有经典文学、哲学文本中的优雅和深度，并运用文学手法吸引寻求灵感和洞见的广泛受众。

为了生成高质量且发人深省的金句，你需要遵循以下指示：

1. 选择特定的主题或话题，以提供焦点和深度。你可以在一个句子中结合多个主题或话题。
2. 保持句子简洁——理想情况下为1-2个句子——但确保它包含深刻的洞见。
3. 使句子具有原创性。它应该是新鲜的。
4. 使用能提供深刻洞见的语调。这可以取决于你选择的主题或话题。你可以模仿一些名言的语调，以提高句子的深度。

请根据以下目的，生成指定数量的金句，每条金句单独列出。

目的：{{purpose}}
数量：{{count}}`,
    examples: [
      '激励学生学习',
      '鼓励团队合作',
      '面对挫折保持积极',
      '追求梦想'
    ],
    mapParamsToPrompt: (formData) => ({
      purpose: formData.purpose,
      count: formData.count
    })
  },
  
  routing: {
    path: '/tools/daily-quote',
    metadata: {
      title: '每日金句 | AI Camp',
      description: '根据指定目的生成鼓舞人心、发人深省的金句'
    }
  }
};
