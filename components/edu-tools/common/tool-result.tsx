"use client";

/**
 * 通用工具结果组件
 * 展示工具生成的内容
 */
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface ToolResultProps {
  result: string;
  title?: string;
}

/**
 * 工具结果组件
 */
export function ToolResult({ result, title = '生成结果' }: ToolResultProps) {
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  /**
   * 复制结果到剪贴板
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  /**
   * 格式化结果内容
   * 处理Markdown格式
   */
  const formatContent = (content: string) => {
    // 简单的Markdown处理
    // 这里可以后续添加更完整的Markdown渲染库
    const formattedContent = content
      // 处理标题
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // 处理粗体和斜体
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // 处理列表
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      // 处理换行
      .replace(/\n/g, '<br />');

    return formattedContent;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className={cn(
              "transition-all",
              copied ? "bg-green-100 text-green-800" : ""
            )}
          >
            {copied ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                已复制
              </>
            ) : (
              <>
                <CopyIcon className="mr-2 h-4 w-4" />
                复制
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={resultRef}
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formatContent(result) }}
        />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        注意：AI生成的内容可能并不完全准确，请根据实际情况进行判断和使用。
      </CardFooter>
    </Card>
  );
}
