"use client";

import React from "react";
import { z } from "zod";
import { BookOpen } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { ToolTemplate } from "../../tool-template";
import { ToolType, ToolConfigProps } from "../../tool-template/types";

/**
 * 设计选择题特定的表单字段验证模式
 */
const quizFormSchema = z.object({
  subject: z.enum(["ap_computer_science", "ap_psychology", "ap_precalculus"], {
    required_error: "请选择学科",
  }),
});

// 定义完整的表单类型，包含基本字段和特定字段
type QuizFormType = z.infer<typeof quizFormSchema> & {
  gradeLevel: string;
  count?: string;
  description: string;
};

/**
 * 设计选择题工具专有配置项
 */
function QuizConfig({ control }: ToolConfigProps<QuizFormType>) {
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
                <Label htmlFor="ap_precalculus">AP预微积分</Label>
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
 * 基于通用模板实现的特定多选题生成工具
 */
export function QuizTool() {
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
    
    // 这里应该调用实际的AI API生成内容
    // 现在我们只是返回一个模拟响应
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 生成不同学科的选择题示例内容
    let subjectName = "";
    switch (data.subject) {
      case "ap_computer_science":
        subjectName = "AP计算机";
        break;
      case "ap_psychology":
        subjectName = "AP心理学";
        break;
      case "ap_precalculus":
        subjectName = "AP预微积分";
        break;
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

  return (
    <ToolTemplate
      title="设计选择题"
      description="创建一个AP学科的选择题测验，基于任何主题、标准或描述！"
      toolType={ToolType.QUIZ}
      toolIcon={<BookOpen size={24} />}
      additionalFormSchema={quizFormSchema}
      toolConfigComponent={<QuizConfig control={undefined as any} />} // 控制器会在ToolTemplate中通过cloneElement注入
      generateContent={generateQuizContent}
      defaultValues={{
        subject: "ap_computer_science",
      }}
    />
  );
}
