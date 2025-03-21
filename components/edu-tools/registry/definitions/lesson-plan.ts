/**
 * 课程计划工具定义
 * 用于生成结构化的课程计划
 */
import { z } from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

/**
 * 表单验证模式
 */
const lessonPlanSchema = z.object({
  subject: z.string().min(1, '请输入学科'),
  grade: z.string().min(1, '请选择年级'),
  topic: z.string().min(1, '请输入主题'),
  duration: z.string().min(1, '请选择课程时长'),
  objectives: z.string().min(10, '请输入具体的学习目标，至少10个字符'),
  difficultyLevel: z.string().min(1, '请选择难度级别'),
  specialRequirements: z.string().optional(),
});

/**
 * 课程计划工具定义
 */
export const lessonPlanTool: ToolDefinition = {
  id: 'lesson-plan',
  title: '课程计划生成器',
  description: '快速生成结构化的课程计划，包含教学目标、活动和评估方法',
  category: ToolCategory.PLANNING,
  toolType: ToolType.TEXT_GENERATION,
  icon: 'clipboard-list', // 计划类图标
  
  // 表单配置
  form: {
    fields: [
      {
        id: 'subject',
        label: '学科',
        type: 'text',
        placeholder: '例如：数学、语文、英语、科学等',
        required: true,
      },
      {
        id: 'grade',
        label: '年级',
        type: 'select',
        options: [
          { value: '小学低年级', label: '小学低年级(1-3年级)' },
          { value: '小学高年级', label: '小学高年级(4-6年级)' },
          { value: '初中', label: '初中' },
          { value: '高中', label: '高中' },
        ],
        required: true,
      },
      {
        id: 'topic',
        label: '教学主题',
        type: 'text',
        placeholder: '例如：分数加减法、古诗词鉴赏、牛顿第一定律等',
        required: true,
      },
      {
        id: 'duration',
        label: '课程时长',
        type: 'select',
        options: [
          { value: '30分钟', label: '30分钟' },
          { value: '45分钟', label: '45分钟' },
          { value: '60分钟', label: '60分钟' },
          { value: '90分钟', label: '90分钟' },
          { value: '多课时', label: '多课时' },
        ],
        required: true,
      },
      {
        id: 'objectives',
        label: '学习目标',
        type: 'textarea',
        placeholder: '描述您希望学生在本课程中达成的学习目标',
        required: true,
      },
      {
        id: 'difficultyLevel',
        label: '难度级别',
        type: 'radio',
        options: [
          { value: '初级', label: '初级 - 适合入门学习' },
          { value: '中级', label: '中级 - 需要一定基础' },
          { value: '高级', label: '高级 - 需要扎实基础' },
        ],
        required: true,
      },
      {
        id: 'specialRequirements',
        label: '特殊要求或备注',
        type: 'textarea',
        placeholder: '如有任何特殊要求或需要考虑的因素，请在此说明',
        required: false,
      },
    ],
    validationSchema: lessonPlanSchema,
    defaultValues: {
      subject: '',
      grade: '',
      topic: '',
      duration: '45分钟',
      objectives: '',
      difficultyLevel: '中级',
      specialRequirements: '',
    },
  },
  
  // 提示词配置
  prompt: {
    template: `请为{{grade}}的{{subject}}课程设计一个主题为"{{topic}}"、时长为{{duration}}的详细课程计划。

学习目标：
{{objectives}}

难度级别：{{difficultyLevel}}

{{#if specialRequirements}}
特殊要求：{{specialRequirements}}
{{/if}}

请提供以下内容：
1. 课程概述（包括核心概念和先决知识）
2. 具体的教学目标（可衡量的学习成果）
3. 详细的教学流程（按时间划分的各环节活动）
4. 所需的教学资源和材料
5. 学生活动设计（包括个人和小组活动）
6. 评估方法和标准
7. 可能的问题及应对策略
8. 课后延伸活动建议

请确保课程计划符合{{grade}}学生的认知水平，并包含足够的互动和参与环节。`,
    // 将表单数据转换为提示词参数
    mapParamsToPrompt: (formData: any) => formData,
  },
  
  // 路由信息
  routing: {
    path: '/tools/lesson-plan',
    metadata: {
      title: '课程计划生成器',
      description: '根据您的需求，快速生成结构化的课程计划，包含教学目标、详细流程、活动和评估方法'
    }
  }
};
