/**
 * 句子扩写工具定义
 * 根据指定字数扩展原始句子，保持原意并增加修饰和细节
 */
import * as z from 'zod';
import { ToolCategory, ToolDefinition, ToolType } from '../types';

export const sentenceExpansionTool: ToolDefinition = {
  id: 'sentence-expansion',
  title: '句子扩写',
  description: '根据指定字数扩展原始句子，保持原意并增加修饰和细节',
  icon: 'Type',
  category: ToolCategory.CONTENT_CREATION,
  toolType: ToolType.TEXT_GENERATION,
  
  form: {
    fields: [
      {
        id: 'sentence',
        label: '原始句子',
        type: 'text',
        required: true,
        placeholder: '请输入需要扩写的原始句子',
        helpText: '输入一个简短的句子，系统将按照指定字数进行扩写'
      },
      {
        id: 'targetLength',
        label: '目标字数',
        type: 'text',
        required: true,
        placeholder: '请输入扩写后的目标字数',
        helpText: '输入一个大于原始句子字数的数字'
      }
    ],
    validationSchema: z.object({
      sentence: z.string({
        required_error: '请输入原始句子'
      }).min(1, {
        message: '原始句子不能为空'
      }),
      targetLength: z.number({
        required_error: '请输入目标字数'
      }).min(1, {
        message: '目标字数必须大于0'
      })
    }),
    defaultValues: {
      sentence: '',
      targetLength: 50
    }
  },
  
  prompt: {
    template: `你是一位拥有10年以上教学经验的资深中文写作指导老师，专门通过结构化规则为句子扩写生成教育内容。

## 核心规则

### 1. 保持原意
- **关键要求**:
  - 保留原句的核心信息、逻辑和主题
  - 仅通过添加细节或修辞手法来丰富内容
- **禁止行为**:
  - 改变原句的事实或主题
  - 添加无关信息

### 2. 字数控制
- **严格遵守**:
  - 输出长度必须精确匹配用户指定的目标字数 {{targetLength}}
  - 标点符号不计入字数
- **容差**: 允许±1字

### 3. 扩展技巧
- **修饰增强**:
  - 添加形容词/副词（例如"温柔的春风"，"静静地"）
- **细节丰富**:
  - 补充时间、地点、动作或心理描写（例如"抚摸大地"，"沙沙声"）
- **修辞手法**:
  - 使用比喻、拟人、排比（例如"星星像钻石一样闪烁"）
- **感官细节**:
  - 融入视觉、听觉或触觉元素

### 4. 输出格式
\`\`\`
原句: {{sentence}} (X字)
扩写后: (完整句子，精确字数)
使用技巧:
1. 使用的修饰词和细节
2. 使用的修辞手法类型
3. 感官或情境扩展
\`\`\`

请根据以上规则，将用户提供的原始句子扩写到指定字数。`,
    examples: [
      '春天来了',
      '学生在认真学习',
      '山上有一棵树',
      '她微笑着'
    ],
    mapParamsToPrompt: (formData) => ({
      sentence: formData.sentence,
      targetLength: formData.targetLength
    })
  },
  
  routing: {
    path: '/tools/sentence-expansion',
    metadata: {
      title: '句子扩写 | AI Camp',
      description: '根据指定字数扩展原始句子，保持原意并增加修饰和细节'
    }
  }
};
