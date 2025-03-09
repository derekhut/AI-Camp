"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ToolConfig } from "./tool-config";
import { ToolResult } from "./tool-result";
import { BaseToolProps, ToolType } from "./types";

/**
 * 基础表单验证模式
 * 所有工具共享的基本表单字段验证
 */
const baseFormSchema = z.object({
  gradeLevel: z.string({
    required_error: "请选择年级",
  }),
  count: z.string().optional(),
  description: z.string().min(5, {
    message: "描述至少需要5个字符",
  }),
});

/**
 * 教育工具模板组件
 *
 * 这是所有教育工具的核心模板，提供统一的UI和行为
 * 
 * @template T - 工具特定表单字段的验证模式类型
 */
export function ToolTemplate<T extends z.ZodObject<any>>({
  title,
  description,
  toolType,
  toolIcon,
  additionalFormSchema,
  toolConfigComponent,
  generateContent,
  gradeLevels = ["幼儿园", "小学1-2年级", "小学3-4年级", "小学5-6年级", "初中", "高中"],
  countOptions = ["5", "10", "15", "20", "25", "30"],
  defaultValues = {},
}: {
  title: string;               // 工具标题
  description: string;         // 工具描述
  toolType: ToolType;          // 工具类型
  toolIcon?: React.ReactNode;  // 工具图标
  additionalFormSchema?: T;    // 额外的表单验证模式，必须是ZodObject类型
  toolConfigComponent?: React.ReactNode; // 工具特定配置组件
  generateContent: (data: z.infer<typeof baseFormSchema> & z.infer<T>) => Promise<string>; // 内容生成函数
  gradeLevels?: string[];      // 年级级别选项
  countOptions?: string[];     // 数量选项
  defaultValues?: Partial<z.infer<typeof baseFormSchema> & z.infer<T>>; // 默认值
}) {
  // 合并基础表单验证模式和工具特定的验证模式
  const formSchema = additionalFormSchema
    ? baseFormSchema.merge(additionalFormSchema)
    : baseFormSchema;

  // 定义表单类型
  type FormType = z.infer<typeof formSchema>;
  
  // 创建表单
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gradeLevel: "",
      count: countOptions[0],
      description: "",
      ...(defaultValues as Partial<FormType>),
    } as FormType,
  });

  // 状态管理
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "result">("form");

  /**
   * 处理表单提交
   * 调用内容生成函数并更新状态
   */
  async function onSubmit(data: FormType) {
    try {
      setIsGenerating(true);
      // 调用传入的内容生成函数
      // 使用类型断言确保类型兼容性
      const generatedContent = await generateContent(data as any);
      setResult(generatedContent);
      // 切换到结果标签页
      setActiveTab("result");
    } catch (error) {
      console.error("生成内容时出错:", error);
      // 这里可以添加错误处理，如显示错误通知等
    } finally {
      setIsGenerating(false);
    }
  }

  /**
   * 重置生成结果并返回表单
   */
  const handleReset = () => {
    setActiveTab("form");
    // 可以选择是否保留上次生成结果
    // setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="w-full shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            {toolIcon && <div className="text-primary">{toolIcon}</div>}
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "form" | "result")}>
          <TabsList className="grid w-full grid-cols-2 mb-4 px-6">
            <TabsTrigger value="form">输入</TabsTrigger>
            <TabsTrigger value="result" disabled={!result}>结果</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* 通用配置部分 */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="gradeLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>年级等级 <span className="text-destructive">*</span></FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择年级等级" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gradeLevels.map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="count"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>题目数量</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择题目数量" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countOptions.map((count) => (
                                <SelectItem key={count} value={count}>
                                  {count}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 工具特定配置部分 */}
                  {toolConfigComponent && (
                    <>
                      <Separator className="my-4" />
                      <ToolConfig toolType={toolType}>
                        {/* 将表单控制器传递给配置组件 */}
                        {React.cloneElement(toolConfigComponent as React.ReactElement, { control: form.control })}
                      </ToolConfig>
                    </>
                  )}

                  {/* 描述/输入部分 */}
                  <Separator className="my-4" />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>主题、标准、文本或描述 <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="在此输入标准、主题或描述..."
                            className="min-h-[150px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          请输入具体的主题、标准、文本或描述，以便生成高质量的内容。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isGenerating}
                  >
                    {isGenerating ? "生成中..." : "生成内容"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="result">
            {result && (
              <ToolResult 
                content={result} 
                toolType={toolType} 
                onReset={handleReset} 
              />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
