/**
 * 教育工具注册系统的类型定义
 */
import { ReactNode } from 'react';
import * as z from 'zod';

/**
 * 工具类型枚举
 * 保留现有类型，可根据需要扩展
 */
export enum ToolType {
  QUIZ = "quiz",
  EMAIL = "email",
  DAILY_QUOTE = "daily_quote",
  TEXT_GENERATION = "text_generation",
}

/**
 * 工具分类枚举
 */
export enum ToolCategory {
  CONTENT_CREATION = "content_creation",
  ASSESSMENT = "assessment",
  PLANNING = "planning",
}

/**
 * 表单字段基本接口
 */
export interface BaseFormField {
  id: string;
  label: string;
  required: boolean;
  helpText?: string;
}

/**
 * 文本输入字段
 */
export interface TextFormField extends BaseFormField {
  type: 'text';
  placeholder?: string;
}

/**
 * 多行文本输入字段
 */
export interface TextareaFormField extends BaseFormField {
  type: 'textarea';
  placeholder?: string;
  rows?: number;
}

/**
 * 下拉选择字段
 */
export interface SelectFormField extends BaseFormField {
  type: 'select';
  options: string[] | { value: string; label: string }[];
  placeholder?: string;
}

/**
 * 单选字段
 */
export interface RadioFormField extends BaseFormField {
  type: 'radio';
  options: string[] | { value: string; label: string }[];
}

/**
 * 所有表单字段类型的联合
 */
export type FormField = 
  | TextFormField 
  | TextareaFormField 
  | SelectFormField 
  | RadioFormField;

/**
 * 工具定义接口
 * 用于统一定义工具的所有方面
 */
export interface ToolDefinition<TParams = any> {
  // 基本信息
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ToolCategory;
  toolType: ToolType;
  
  // 表单配置
  form: {
    fields: FormField[];
    validationSchema: z.ZodObject<any>;
    defaultValues: Record<string, any>;
  };
  
  // 提示词配置
  prompt: {
    template: string;
    examples?: string[];
    // 将表单数据转换为提示词参数
    mapParamsToPrompt: (formData: any) => TParams;
  };
  
  // 自定义处理（可选）
  customHandlers?: {
    processResult?: (result: string) => any;
    preProcess?: (formData: any) => any;
    renderCustomResult?: (result: string, formData: any) => ReactNode;
  };
  
  // 路由配置
  routing: {
    path: string;
    metadata: {
      title: string;
      description: string;
    }
  };
}
