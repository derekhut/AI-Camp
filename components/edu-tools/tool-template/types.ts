// 定义教育工具类型和相关接口

import { z } from "zod";
import { Control } from "react-hook-form";

/**
 * 工具类型枚举
 * 用于标识不同类型的教育工具
 */
export enum ToolType {
  QUIZ = "quiz",           // 多选题测验
  ESSAY = "essay",         // 扩写题
  REWRITE = "rewrite",     // 改写题
  FILL_BLANK = "fill_blank", // 填空题
  // 可以根据需要添加更多工具类型
}

/**
 * 基础工具属性接口
 * 所有工具共享的基本属性
 */
export interface BaseToolProps {
  title: string;           // 工具标题
  description: string;     // 工具描述
  toolType: ToolType;      // 工具类型
  toolIcon?: React.ReactNode; // 工具图标
}

/**
 * 基础表单字段接口
 * 所有工具共享的基本表单字段
 */
export interface BaseFormFields {
  gradeLevel: string;      // 年级等级
  count: string;           // 题目数量
  description: string;     // 描述/主题/标准
}

/**
 * 工具配置组件属性接口
 * 用于工具特定配置组件
 */
export interface ToolConfigProps<T extends Record<string, any> = Record<string, any>> {
  control: Control<T>;     // 表单控制器
}

/**
 * 工具结果组件属性接口
 * 用于显示生成结果
 */
export interface ToolResultProps {
  content: string;         // 生成的内容
  toolType: ToolType;      // 工具类型
  onReset: () => void;     // 重置函数
  isStreaming?: boolean;   // 是否正在流式输出内容
  streamUpdate?: (newContent: string) => void; // 更新流式内容的回调函数
}
