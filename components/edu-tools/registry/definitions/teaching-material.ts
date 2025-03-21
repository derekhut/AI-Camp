/**
 * 教学课件工具定义
 * 根据知识点生成结构清晰、逻辑严谨的教学课件
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

export const teachingMaterialTool: ToolDefinition = {
  id: 'teaching-material',
  title: '教学课件',
  description: '根据知识点生成结构清晰、逻辑严谨的教学课件',
  icon: 'FileText',
  category: ToolCategory.SMART_CLASSROOM,
  toolType: ToolType.TEXT_GENERATION,
  
  form: {
    fields: [
      {
        id: 'topic',
        label: '知识点',
        type: 'text',
        required: true,
        placeholder: '请输入需要制作课件的核心知识点',
        helpText: '输入一个具体的知识点，系统将为您生成完整的教学课件'
      }
    ],
    validationSchema: z.object({
      topic: z.string({
        required_error: '请输入知识点'
      }).min(1, {
        message: '知识点不能为空'
      })
    }),
    defaultValues: {
      topic: ''
    }
  },
  
  prompt: {
    template: `你是一位资深的教育资源开发专家，拥有丰富的教学设计和教育技术应用经验。你的任务是根据用户提供的知识点，帮助他们生成结构清晰、逻辑严谨、并且具有互动性和吸引力的教学课件。

## 教学课件生成指南：
1. 明确课件目标
- 知识点定位：确定知识点的核心内容（概念、定理、公式、应用等）
- 教学目标：明确学生学习后应掌握的知识、技能和应用场景
- 适用对象：区分适用于小学、初中、高中还是大学，或特定专业需求

2. 设计课件结构
课件通常由以下部分组成：
(1) 标题页
- 课程名称
- 课题（知识点名称）
- 适用年级/学习者

(2) 引入部分（激发兴趣）
- 提出一个与知识点相关的问题或情境，引发思考
- 现实应用案例，展示知识点的重要性

(3) 知识讲解（核心内容）
- 定义/概念：清晰表述知识点的定义
- 原理/推导：如果涉及数学或科学原理，可适当推导
- 示例：提供多个例子（简单到复杂）

(4) 互动练习（加强理解）
- 选择题、填空题、判断题、计算题等
- 让学生尝试自己推导或应用知识

(5) 应用拓展（提高运用能力）
- 该知识点在现实生活或其他学科的应用
- 相关的高级知识或衍生概念

(6) 总结（强化记忆）
- 归纳本课的重点
- 列出核心公式、定理或思维方法

(7) 课后练习/思考问题（巩固学习）
- 设计适量的课后练习
- 提供开放性问题，鼓励深度思考

请根据以下知识点生成一个完整的教学课件：

知识点：{{topic}}

请以文本形式回答，包含以下部分：
1. 原知识点
2. 教学课件（包含上述七个部分）
3. 课件设计技巧`,
    examples: [
      '一元一次方程',
      '光合作用',
      '牛顿第二定律',
      '古诗鉴赏'
    ],
    mapParamsToPrompt: (formData) => ({
      topic: formData.topic
    })
  },
  
  routing: {
    path: '/tools/teaching-material',
    metadata: {
      title: '教学课件 | AI Camp',
      description: '根据知识点生成结构清晰、逻辑严谨的教学课件'
    }
  }
};
