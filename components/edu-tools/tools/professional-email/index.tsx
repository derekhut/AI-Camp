"use client";

/**
 * 专业邮件工具入口组件
 */

import React from "react";
import { createTool } from "../../config/tool-factory";
import { toolConfigs } from "../../config/tool-configs";
import { generateEmailContentWithAPI } from "./api";

/**
 * 使用工具工厂创建专业邮件工具组件
 */
const ProfessionalEmailToolBase = createTool(toolConfigs.professionalEmail);

/**
 * 专业邮件工具组件
 * 使用基础工具组件并提供内容生成功能
 */
export function ProfessionalEmailTool(props: any) {
  // 此处可以添加特殊逻辑，如果需要

  // 内容生成函数
  const generateContent = async (data: any) => {
    return await generateEmailContentWithAPI(data);
  };

  // 返回配置好的工具组件
  return <ProfessionalEmailToolBase {...props} generateContent={generateContent} />;
}

/**
 * 导出默认组件
 */
export default ProfessionalEmailTool;
