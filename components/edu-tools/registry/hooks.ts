"use client";

/**
 * 工具注册系统钩子函数
 * 提供React组件使用工具注册表的功能
 */
import { useState, useEffect, useCallback } from 'react';
import { ToolDefinition } from './types';
import { getToolById } from './tool-registry';
import { generateToolContent } from './api-service';

/**
 * 使用指定工具的钩子函数
 * @param toolId 工具ID
 * @returns 工具定义、生成函数和状态
 */
export function useTool(toolId: string) {
  const [tool, setTool] = useState<ToolDefinition | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取工具定义
  useEffect(() => {
    // 立即尝试获取工具定义
    let toolDefinition = getToolById(toolId);
    
    // 如果没有找到工具，设置一个重试机制
    // 在客户端渲染时，工具注册列表可能还没有准备好
    if (!toolDefinition) {
      // 设置一个重试定时器
      const retryTimer = setTimeout(() => {
        // 重新尝试获取工具
        const retryToolDefinition = getToolById(toolId);
        setTool(retryToolDefinition || null);
        
        if (!retryToolDefinition) {
          setError(`未找到ID为 "${toolId}" 的工具`);  
        } else {
          setError(null);
        }
      }, 100);
      
      // 清除定时器
      return () => clearTimeout(retryTimer);
    } else {
      // 如果立即找到工具，直接设置
      setTool(toolDefinition);
      setError(null);
    }
  }, [toolId]);

  // 生成内容函数
  const generate = useCallback(
    async (data: any) => {
      if (!tool) {
        setError(`未找到ID为 "${toolId}" 的工具`);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setFormData(data);

        const content = await generateToolContent(toolId, data);
        setResult(content);
        return content;
      } catch (error) {
        console.error('内容生成错误:', error);
        setError((error as Error).message || '生成内容时发生未知错误');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [tool, toolId]
  );

  // 重置函数
  const reset = useCallback(() => {
    setResult(null);
    setFormData(null);
    setError(null);
  }, []);

  return {
    tool,
    generate,
    reset,
    result,
    formData,
    isLoading,
    error
  };
}
