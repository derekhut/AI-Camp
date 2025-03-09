"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ToolType, ToolResultProps } from "./types";

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
    // 这里可以根据不同的工具类型添加不同的格式化逻辑
    switch (toolType) {
      case ToolType.QUIZ:
        // 多选题测验可能需要特殊格式
        return (
          <div className="whitespace-pre-wrap">
            {content}
          </div>
        );
      default:
        // 默认格式
        return (
          <div className="whitespace-pre-wrap">
            {content}
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
