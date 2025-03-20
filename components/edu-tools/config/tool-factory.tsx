"use client";

/**
 * 工具组件工厂
 * 根据工具配置创建工具组件
 */

import React from "react";
import { ToolTemplate } from "../tool-template";
import { ToolConfig } from "./tool-configs";
import { generateQuizContentWithAPI } from "../tools/quiz/api";
import dynamic from "next/dynamic";

// 动态导入图标组件
const iconComponents: Record<string, React.ComponentType<any>> = {
  BookOpen: dynamic(() => import("lucide-react").then((mod) => mod.BookOpen)),
  Mail: dynamic(() => import("lucide-react").then((mod) => mod.Mail)),
  Quote: dynamic(() => import("lucide-react").then((mod) => mod.Quote)),
  // 添加更多图标...
};

/**
 * 根据工具ID和参数生成内容
 * 这个函数会根据工具ID调用相应的内容生成函数
 */
async function generateContent(toolId: string, data: any): Promise<string> {
  // 根据工具ID调用相应的内容生成函数
  switch (toolId) {
    case "quiz":
      return generateQuizContentWithAPI(data);
    case "professional-email":
      // TODO: 实现专业邮件内容生成函数
      return "专业邮件内容生成功能尚未实现";
    case "daily-quote":
      // TODO: 实现每日金句内容生成函数
      return "每日金句内容生成功能尚未实现";
    default:
      return `${toolId} 工具的内容生成功能尚未实现`;
  }
}

/**
 * 获取工具特定的配置组件
 */
function getToolConfigComponent(toolId: string): React.ReactNode {
  // TODO: 根据工具ID返回相应的配置组件
  // 目前先返回 null，实际实现中可以根据需要添加特定组件
  return null;
}

/**
 * 创建工具组件
 * @param toolConfig 工具配置
 * @returns 工具组件
 */
export function createTool(toolConfig: ToolConfig) {
  return function ToolComponent(props: any) {
    // 合并配置和属性
    const config = { ...toolConfig, ...props };
    
    // 获取图标组件
    const IconComponent = iconComponents[config.icon] || null;
    const toolIcon = IconComponent ? <IconComponent size={24} /> : null;
    
    // 内容生成函数
    const handleGenerateContent = async (data: any) => {
      return await generateContent(config.id, data);
    };
    
    // 获取工具特定的配置组件
    const toolConfigComponent = getToolConfigComponent(config.id);
    
    // 返回配置好的工具模板
    return (
      <ToolTemplate
        title={config.title}
        description={config.description}
        toolType={config.toolType}
        toolIcon={toolIcon}
        additionalFormSchema={config.additionalFormSchema}
        toolConfigComponent={toolConfigComponent}
        generateContent={handleGenerateContent}
        gradeLevels={config.gradeLevels}
        countOptions={config.countOptions}
        defaultValues={config.defaultValues}
      />
    );
  };
}

/**
 * 导出预配置的工具组件
 * 这些组件可以直接在页面中使用
 */
export const tools = Object.entries(require("./tool-configs").toolConfigs).reduce(
  (acc, [key, config]) => {
    acc[key] = createTool(config as ToolConfig);
    return acc;
  },
  {} as Record<string, React.ComponentType<any>>
);
