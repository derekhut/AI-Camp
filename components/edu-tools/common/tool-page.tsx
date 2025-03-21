"use client";

/**
 * 通用工具页面组件
 * 根据工具ID动态加载和渲染相应的工具
 */
import React from 'react';
import { DynamicForm } from './dynamic-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';
import { useTool } from '../registry/hooks';
// 工具结果组件
const ToolResult: React.FC<{ result: any; title?: string }> = ({ result, title = '生成结果' }) => {
  // 确保 result 是字符串
  const formatResult = (rawResult: any): string => {
    if (rawResult === null || rawResult === undefined) {
      return '未获得结果';
    }
    
    // 如果是对象，尝试转成JSON字符串
    if (typeof rawResult === 'object') {
      try {
        return JSON.stringify(rawResult, null, 2);
      } catch (e) {
        return String(rawResult);
      }
    }
    
    // 其他类型转成字符串
    return String(rawResult);
  };
  
  // 获取格式化的结果字符串
  const formattedResult = formatResult(result);
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>
          {formattedResult}
        </ReactMarkdown>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        注意：AI生成的内容可能并不完全准确，请根据实际情况进行判断和使用。
      </CardFooter>
    </Card>
  );
};

interface ToolPageProps {
  toolId: string;
}

/**
 * 通用工具页面组件
 */
export function ToolPage({ toolId }: ToolPageProps) {
  // 使用 useTool 钩子获取工具、状态和方法
  const { tool, result, formData, isLoading, error, generate, reset } = useTool(toolId);

  // 如果工具不存在，显示错误信息
  if (!tool) {
    return (
      <Alert variant="destructive">
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>
          未找到ID为 "{toolId}" 的工具。请检查工具ID是否正确。
        </AlertDescription>
      </Alert>
    );
  }

  /**
   * 处理表单提交
   */
  const handleSubmit = async (data: any) => {
    // 使用钩子中的生成函数
    await generate(data);
  };

  /**
   * 渲染结果内容
   */
  const renderResult = () => {
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTitle>生成失败</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!result) return null;

    // 如果工具有自定义的结果渲染函数，使用它
    if (tool.customHandlers?.renderCustomResult && formData) {
      return tool.customHandlers.renderCustomResult(result, formData);
    }

    // 否则使用默认的结果组件
    return <ToolResult result={result} />;
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RocketIcon className="mr-2 h-6 w-6" />
            {tool.title}
          </CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicForm
            fields={tool.form.fields}
            validationSchema={tool.form.validationSchema}
            defaultValues={tool.form.defaultValues}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {renderResult()}
    </div>
  );
}
