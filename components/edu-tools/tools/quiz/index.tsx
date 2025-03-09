"use client";

import React from "react";
import { z } from "zod";
import { BookOpen } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ToolTemplate } from "../../tool-template";
import { ToolType, ToolConfigProps } from "../../tool-template/types";

/**
 * 学科ID类型定义
 */
export type SubjectId = "ap_computer_science" | "ap_psychology" | "ap_precalculus" | "ap_csp";

/**
 * 设计选择题工具组件的属性接口
 */
export interface QuizToolProps {
  // 预设的学科ID，如果提供则隐藏学科选择
  subjectId?: SubjectId;
  // 自定义标题
  customTitle?: string;
  // 自定义描述
  customDescription?: string;
  // 控制字段可见性
  visibleFields?: {
    subject?: boolean; // 是否显示学科选择
    gradeLevel?: boolean; // 是否显示年级选择
    count?: boolean; // 是否显示题目数量
    description?: boolean; // 是否显示描述输入
  };
  // 自定义提示词模板
  promptTemplate?: string;
}

/**
 * 各学科的名称映射
 */
const subjectNameMap: Record<SubjectId, string> = {
  ap_computer_science: "AP计算机",
  ap_psychology: "AP心理学",
  ap_precalculus: "AP微积分",
  ap_csp: "AP计算机科学原理"
};

/**
 * 设计选择题特定的表单字段验证模式
 */
const quizFormSchema = z.object({
  subject: z.enum(["ap_computer_science", "ap_psychology", "ap_precalculus", "ap_csp"], {
    required_error: "请选择学科",
  }),
});

/**
 * 定义完整的表单类型，包含基本字段和特定字段
 */
type QuizFormType = z.infer<typeof quizFormSchema> & {
  gradeLevel: string;
  count?: string;
  description: string;
};

/**
 * 设计选择题工具专有配置项
 */
function QuizConfig({ control, props }: ToolConfigProps<QuizFormType> & { props?: QuizToolProps }) {
  // 如果设置了特定学科，或者设置隐藏学科选择，则不显示学科选择组件
  if (props?.subjectId || props?.visibleFields?.subject === false) {
    return null;
  }
  
  return (
    <FormField
      control={control}
      name="subject"
      render={({ field }) => (
        <FormItem>
          <FormLabel>学科 <span className="text-destructive">*</span></FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ap_computer_science" id="ap_computer_science" />
                <Label htmlFor="ap_computer_science">AP计算机</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ap_psychology" id="ap_psychology" />
                <Label htmlFor="ap_psychology">AP心理学</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ap_precalculus" id="ap_precalculus" />
                <Label htmlFor="ap_precalculus">AP微积分</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ap_csp" id="ap_csp" />
                <Label htmlFor="ap_csp">AP计算机科学原理</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * 多选题工具组件
 * 
 * 基于通用模板实现的特定多选题生成工具，支持自定义配置
 * 
 * @param props - 组件属性
 */
export function QuizTool(props: QuizToolProps = {}) {
  // 默认字段可见性设置
  const defaultVisibleFields = {
    subject: true,
    gradeLevel: true,
    count: true,
    description: true,
  };
  
  // 合并自定义和默认字段可见性设置
  const visibleFields = {
    ...defaultVisibleFields,
    ...props.visibleFields,
  };
  
  // 如果设置了特定学科，则覆盖可见性设置
  if (props.subjectId) {
    visibleFields.subject = false;
  }
  
  /**
   * 生成多选题测验内容
   * 
   * @param data - 表单数据
   * @returns 生成的测验内容
   */
  const generateQuizContent = async (data: QuizFormType) => {
    // 确保有默认的count值
    const countStr = data.count || "5";
    const countNum = parseInt(countStr, 10);
    console.log("生成选择题，数据:", data);
    
    // 确定实际使用的学科
    const actualSubject = props.subjectId || data.subject;
    
    // 获取学科名称
    const subjectName = subjectNameMap[actualSubject as SubjectId];
    
    // 这里应该调用实际的AI API生成内容
    // 现在我们只是返回一个模拟响应
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 如果提供了自定义提示词模板，则使用它来生成内容
    // 这里暂时只是模拟，实际实现将在下一步完成
    if (props.promptTemplate) {
      console.log("使用自定义提示词模板:", props.promptTemplate);
      // 后续会实现调用API的逻辑
    }
    
    let content = `${subjectName} - ${data.gradeLevel}级别 - ${data.description}\n\n`;
    content += `共${countStr}题\n\n`;
    
    // 生成选择题示例
    for (let i = 1; i <= countNum; i++) {
      content += `${i}. 这是第${i}个选择题的问题...\n`;
      content += `   A. 选项A\n`;
      content += `   B. 选项B\n`;
      content += `   C. 选项C\n`;
      content += `   D. 选项D\n\n`;
    }
    
    content += `\n答案：\n`;
    for (let i = 1; i <= countNum; i++) {
      content += `${i}. ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}\n`;
    }
    
    return content;
  };

  // 确定默认值
  const defaultValues: Partial<QuizFormType> = {
    subject: props.subjectId || "ap_computer_science",
  };

  // 使用一个简单的方法处理可见性
  // 这里我们使用ToolTemplate的默认实现，但仅在自定义配置组件中处理学科选择
  // 让ToolTemplate继续处理其余字段
  return (
    <ToolTemplate
      title={props.customTitle || "设计选择题"}
      description={props.customDescription || "创建一个AP学科的选择题测验，基于任何主题、标准或描述！"}
      toolType={ToolType.QUIZ}
      toolIcon={<BookOpen size={24} />}
      additionalFormSchema={quizFormSchema}
      toolConfigComponent={<QuizConfig control={undefined as any} props={props} />}
      generateContent={(data: any) => generateQuizContent(data as QuizFormType)}
      defaultValues={defaultValues}
    />
  );
}
