/**
 * 工具配置定义
 * 集中管理所有教育工具的配置
 */

import { ToolType } from "../tool-template/types";
import React from "react";
import * as z from "zod";

/**
 * 工具可见字段配置
 */
export interface VisibleFields {
  gradeLevel?: boolean;
  count?: boolean;
  description?: boolean;
  [key: string]: boolean | undefined;
}

/**
 * 工具配置接口
 */
export interface ToolConfig {
  id: string;                  // 工具唯一标识
  title: string;               // 工具标题
  description: string;         // 工具描述
  toolType: ToolType;          // 工具类型
  icon: string;                // 图标名称
  visibleFields: VisibleFields; // 可见字段配置
  gradeLevels?: string[];      // 年级选项
  countOptions?: string[];     // 数量选项
  defaultValues?: Record<string, any>; // 默认值
  additionalFormSchema?: z.ZodObject<any>; // 额外表单验证模式
}

/**
 * 默认年级选项
 */
const DEFAULT_GRADE_LEVELS = ["幼儿园", "小学1-2年级", "小学3-4年级", "小学5-6年级", "初中", "高中", "大学"];

/**
 * 默认数量选项
 */
const DEFAULT_COUNT_OPTIONS = ["5", "10", "15", "20", "25", "30"];

/**
 * 所有工具的配置对象
 */
export const toolConfigs: Record<string, ToolConfig> = {
  // 选择题工具
  quiz: {
    id: "quiz",
    title: "设计选择题",
    description: "创建一个AP学科的选择题测验，基于任何主题、标准或描述！",
    toolType: ToolType.QUIZ,
    icon: "BookOpen",
    visibleFields: {
      gradeLevel: true,
      count: true,
      description: true,
      subject: true,
    },
    gradeLevels: DEFAULT_GRADE_LEVELS,
    countOptions: DEFAULT_COUNT_OPTIONS,
    defaultValues: {
      count: "5",
    },
    additionalFormSchema: z.object({
      subject: z.string({
        required_error: "请选择学科",
      }),
    }),
  },

  // 专业邮件工具
  professionalEmail: {
    id: "professional-email",
    title: "撰写专业邮件",
    description: "根据需求生成专业、得体的商务和学术邮件",
    toolType: ToolType.EMAIL,
    icon: "Mail",
    visibleFields: {
      emailRequest: true,
    },
    defaultValues: {},
    additionalFormSchema: z.object({
      emailRequest: z.string({
        required_error: "请输入邮件需求",
      }).min(10, {
        message: "邮件需求至少需要10个字符",
      }),
    }),
  },

  // 每日金句工具
  dailyQuote: {
    id: "daily-quote",
    title: "每日金句",
    description: "生成富有哲理和启发性的金句，适合分享和激励",
    toolType: ToolType.DAILY_QUOTE,
    icon: "Quote",
    visibleFields: {
      gradeLevel: true,
      count: true,
      description: true,
      category: true,
    },
    gradeLevels: DEFAULT_GRADE_LEVELS,
    countOptions: ["1", "3", "5", "10"],
    defaultValues: {
      count: "1",
    },
    additionalFormSchema: z.object({
      category: z.string({
        required_error: "请选择金句类别",
      }),
    }),
  },

  // 可以添加更多工具配置...
};
