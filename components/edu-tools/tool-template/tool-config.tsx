"use client";

import React from "react";
import { ToolType, ToolConfigProps } from "./types";

/**
 * 工具配置容器组件
 * 
 * 这个组件作为特定工具配置选项的容器和抽象层
 * 可以根据工具类型添加特定样式或行为
 * 
 * @param toolType - 工具类型
 * @param children - 子组件（特定工具的配置UI）
 */
export function ToolConfig({
  toolType,
  children,
}: {
  toolType: ToolType;
  children: React.ReactNode;
}) {
  // 根据工具类型选择不同的样式或行为
  let configClassName = "tool-config space-y-4";
  
  // 可以根据工具类型添加特定的样式类
  switch (toolType) {
    case ToolType.QUIZ:
      configClassName += " quiz-config";
      break;
    case ToolType.ESSAY:
      configClassName += " essay-config";
      break;
    // 可以添加更多工具类型的特定样式
    default:
      break;
  }

  return (
    <div className={configClassName}>
      <h3 className="text-sm font-medium text-gray-700 mb-1">工具特定设置</h3>
      {children}
    </div>
  );
}
