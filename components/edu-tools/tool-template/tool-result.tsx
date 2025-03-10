"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ToolType, ToolResultProps } from "./types";
import ReactMarkdown from "react-markdown";

// 导入样式
import "@/components/markdown/markdown.css";

/**
 * 工具结果组件
 * 
 * 负责展示生成的内容，并提供复制和导出功能
 * 
 * @param content - 生成的内容
 * @param toolType - 工具类型
 * @param onReset - 重置回到编辑状态的回调函数
 */
export function ToolResult({
  content,
  toolType,
  onReset,
}: ToolResultProps) {
  // 复制状态
  const [copied, setCopied] = useState(false);
  // 处理后的Markdown内容
  const [processedContent, setProcessedContent] = useState(content);
  
  // 当内容变化时处理内容
  useEffect(() => {
    // 处理可能存在的```markdown前缀
    let cleanContent = content;
    if (cleanContent.trim().startsWith("```markdown")) {
      cleanContent = cleanContent.replace(/^\s*```markdown\s*\n/, "");
      cleanContent = cleanContent.replace(/\n\s*```\s*$/, "");
    }
    setProcessedContent(cleanContent);
  }, [content]);

  /**
   * 复制内容到剪贴板
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      // 2秒后重置复制状态
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  /**
   * 导出内容为文本文件
   */
  const exportAsText = () => {
    // 创建一个Blob对象
    const blob = new Blob([content], { type: "text/plain" });
    // 创建一个临时URL
    const url = URL.createObjectURL(blob);
    // 创建一个隐藏的下载链接
    const a = document.createElement("a");
    a.href = url;
    // 设置文件名，使用工具类型和当前日期
    a.download = `${toolType}-${new Date().toISOString().split("T")[0]}.txt`;
    // 添加到文档中
    document.body.appendChild(a);
    // 触发点击事件
    a.click();
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * 根据工具类型格式化显示内容
   */
  const formattedContent = () => {
    // Markdown渲染组件
    const MarkdownRenderer = () => (
      <ReactMarkdown
        className="markdown"
        components={{
          // 自定义标题样式
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-2 mb-1" {...props} />,
          
          // 自定义代码块样式
          code: ({node, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <pre className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 px-1 rounded" {...props}>
                {children}
              </code>
            );
          },
          
          // 自定义列表样式
          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2" {...props} />,
          
          // 自定义表格样式
          table: ({node, ...props}) => <table className="border-collapse border border-gray-300 my-4 w-full" {...props} />,
          th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />,
          td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    );
    
    switch (toolType) {
      case ToolType.QUIZ:
        return (
          <div className="markdown-wrapper">
            <MarkdownRenderer />
          </div>
        );
      default:
        return (
          <div className="markdown-wrapper">
            <MarkdownRenderer />
          </div>
        );
    }
  };

  return (
    <CardContent className="p-6">
      {/* 显示生成的内容 */}
      <div className="bg-muted p-6 rounded-lg mb-6 max-h-[60vh] overflow-y-auto">
        {formattedContent()}
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={onReset}
        >
          返回编辑
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={copyToClipboard}
          >
            {copied ? "已复制！" : "复制内容"}
          </Button>
          <Button
            variant="secondary"
            onClick={exportAsText}
          >
            导出为文本
          </Button>
        </div>
      </div>
    </CardContent>
  );
}
