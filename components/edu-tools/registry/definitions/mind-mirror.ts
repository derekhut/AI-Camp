/**
 * 心灵镜像工具定义
 * 分析用户心理状态并作出相应回复
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

export const mindMirrorTool: ToolDefinition = {
  id: 'mind-mirror',
  title: '心灵镜像',
  description: '分析用户心理状态，根据情绪提供适当的回应',
  icon: 'Heart',
  category: ToolCategory.CONTENT_CREATION,
  toolType: ToolType.TEXT_GENERATION,
  
  form: {
    fields: [
      {
        id: 'userInput',
        label: '你现在在想什么？',
        type: 'textarea',
        required: true,
        placeholder: '请分享你的想法、感受或困扰...',
        helpText: '可以自由表达，系统会分析你的心理状态并给予回应'
      }
    ],
    validationSchema: z.object({
      userInput: z.string({
        required_error: '请输入你的想法'
      }).min(1, {
        message: '内容不能为空'
      })
    }),
    defaultValues: {
      userInput: ''
    }
  },
  
  prompt: {
    template: `你是一位专业的心理分析师，能够通过文字表达分析用户的心理状态，并提供适当的回应。请遵循以下步骤：

步骤：
1. 分析用户表达方式
   - 识别语气（正式/随意/热情/冷漠/急切/犹豫）。
   - 解析标点符号（如"!!"可能表示激动或愤怒，"..."可能表示犹豫或悲伤）。
   - 识别关键情绪词汇（如"累""无奈"可能表示压力，"开心""兴奋"可能表示正向情绪）。
   - 解析emoji表达的情绪（如😊代表开心，😢代表悲伤）。

2. 结合上下文和历史数据
   - 参考用户的过往对话，理解他们的长期情绪趋势。
   - 判断当前发言是否与之前的情绪状态有关（如用户一直在谈论压力，则"今天又加班了"可能意味着持续性疲劳）。

3. 归类心理状态（选择最符合的一种或多种）：
   - 焦虑/压力大
   - 孤独/需要陪伴
   - 愤怒/不满
   - 悲伤/沮丧
   - 开心/兴奋（无需安慰，但可适当回应情绪）

4. 生成自然的回应（基于心理状态选择合适的方式）：
   - 焦虑/压力大 → 先共情（"听起来你最近很不容易"），再提供实用建议（"或许可以试着安排点放松的时间？"）。
   - 孤独/需要陪伴 → 提供陪伴感（"我在这里，愿意听你聊聊"）。
   - 愤怒/不满 → 先承认情绪（"你的感受是完全合理的"），再引导表达（"想和我说说发生了什么吗？"）。
   - 悲伤/沮丧 → 先表达理解（"我知道你现在很难过"），再提供温暖的支持（"如果你愿意，我们可以聊聊"）。
   - 开心/兴奋 → 以同样积极的情绪回应（"听起来太棒了！要不要分享更多细节？"）。

5. 语言风格
   - 保持温和自然，避免机械化或过度情感化的表达。
   - 适当使用emoji，但不过度，以增强共鸣。
   - 避免直接假设用户的状况，仅基于他们的表达进行推测。

请为以下用户输入生成一个最适合的回应，根据分析的心理状态选择合适的回应类型（安慰、鼓励、建议等）。不要输出分析过程，直接给出回应。

用户输入：{{userInput}}`,
    examples: [
      '今天又加班了😢回家好晚，晚饭都没来得及吃',
      '工资也不高，老板总是骂我，回家也没人陪我，真不知道能坚持多久',
      '今天考试考得很好，终于看到努力的回报了！😊',
      '最近总是睡不好，感觉很累...'
    ],
    mapParamsToPrompt: (formData) => ({
      userInput: formData.userInput
    })
  },
  
  routing: {
    path: '/tools/mind-mirror',
    metadata: {
      title: '心灵镜像 | AI Camp',
      description: '分析用户心理状态，根据情绪提供适当的回应'
    }
  }
};
