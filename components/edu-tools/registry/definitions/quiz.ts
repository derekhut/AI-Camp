/**
 * 选择题工具定义
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

/**
 * 选择题工具的定义
 */
export const quizTool: ToolDefinition = {
  id: 'quiz',
  title: '设计选择题',
  description: '创建一个AP学科的选择题测验，基于任何主题、标准或描述！',
  icon: 'FileQuestion',
  category: ToolCategory.ASSESSMENT,
  toolType: ToolType.QUIZ,
  
  form: {
    fields: [
      {
        id: 'subject',
        label: '学科',
        type: 'select',
        required: true,
        options: [
          { value: 'biology', label: '生物学' },
          { value: 'chemistry', label: '化学' },
          { value: 'physics', label: '物理学' },
          { value: 'mathematics', label: '数学' },
          { value: 'computer_science', label: '计算机科学' },
          { value: 'history', label: '历史' },
          { value: 'literature', label: '文学' },
          { value: 'economics', label: '经济学' },
        ],
        helpText: '选择题目所属的学科'
      },
      {
        id: 'topic',
        label: '主题',
        type: 'text',
        required: true,
        placeholder: '如：细胞分裂、牛顿第二定律、线性代数...',
        helpText: '具体的知识点或主题'
      },
      {
        id: 'difficulty',
        label: '难度',
        type: 'radio',
        required: true,
        options: [
          { value: 'easy', label: '简单' },
          { value: 'medium', label: '中等' },
          { value: 'hard', label: '困难' },
        ],
        helpText: '选择题目的难度级别'
      },
      {
        id: 'numQuestions',
        label: '题目数量',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1题' },
          { value: '3', label: '3题' },
          { value: '5', label: '5题' },
          { value: '10', label: '10题' },
        ],
        helpText: '需要生成的题目数量'
      }
    ],
    validationSchema: z.object({
      subject: z.string({
        required_error: '请选择学科'
      }),
      topic: z.string({
        required_error: '请输入主题'
      }).min(2, {
        message: '主题至少需要2个字符'
      }),
      difficulty: z.string({
        required_error: '请选择难度'
      }),
      numQuestions: z.string({
        required_error: '请选择题目数量'
      })
    }),
    defaultValues: {
      subject: '',
      topic: '',
      difficulty: 'medium',
      numQuestions: '3'
    }
  },
  
  prompt: {
    template: `
请按照以下要求生成多选题：

- 学科：{{subject}}
- 主题：{{topic}}
- 难度：{{difficulty}}
- 题目数量：{{numQuestions}}

要求：
1. 严格遵守AP考试的格式和标准
2. 每个问题必须有一个明确、唯一的正确答案
3. 干扰项必须合理，有迷惑性，但不能含糊不清
4. 题目应该测试理解力和应用能力，而不仅仅是记忆力
5. 保持难度一致性

输出格式：
- 题目编号（1, 2, 3...）
- 题干
- 答案选项（A, B, C, D, E）
- 标记正确答案
- 简短的解析（说明为什么这个选项是正确的）

对于难度级别：
- 简单：基础概念题，直接应用公式或定义
- 中等：需要多步骤思考，或结合多个概念
- 困难：需要深度理解和复杂分析的题目
`,
    mapParamsToPrompt: (formData) => {
      const subjectMap: Record<string, string> = {
        'biology': '生物学',
        'chemistry': '化学',
        'physics': '物理学',
        'mathematics': '数学',
        'computer_science': '计算机科学',
        'history': '历史',
        'literature': '文学',
        'economics': '经济学',
      };
      
      const difficultyMap: Record<string, string> = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难',
      };
      
      return {
        subject: subjectMap[formData.subject] || formData.subject,
        topic: formData.topic,
        difficulty: difficultyMap[formData.difficulty] || formData.difficulty,
        numQuestions: formData.numQuestions
      };
    }
  },
  
  customHandlers: {
    processResult: (result: string) => {
      // 可以进一步处理结果，例如将文本转换为结构化的题目对象
      // 这里简单返回原始结果
      return result;
    }
  },
  
  routing: {
    path: '/tools/quiz',
    metadata: {
      title: '设计选择题 | 教育工具集',
      description: '创建一个AP学科的选择题测验，基于任何主题、标准或描述'
    }
  }
};
