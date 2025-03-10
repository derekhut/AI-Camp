"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToolType } from "@/components/edu-tools/tool-template/types";
import { ToolResult } from "@/components/edu-tools/tool-template/tool-result";

/**
 * 测试页面，用于演示流式输出功能
 */
export default function TestStreamPage() {
  // 提示词
  const [prompt, setPrompt] = useState<string>("写一段关于人工智能的文字");
  // 生成结果
  const [result, setResult] = useState<string>("");
  // 是否正在生成
  const [generating, setGenerating] = useState<boolean>(false);
  // 是否显示结果
  const [showResult, setShowResult] = useState<boolean>(false);
  // 引用用于访问fetch控制器
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * 开始生成
   */
  const handleGenerate = async () => {
    if (generating) {
      // 如果正在生成，则中断
      abortControllerRef.current?.abort();
      setGenerating(false);
      return;
    }

    try {
      setResult("");
      setGenerating(true);
      setShowResult(true);
      
      // 创建一个AbortController用于中断请求
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      // 发送流式API请求
      const response = await fetch("/api/demo/gen-stream-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          provider: "deepseek",
          model: "deepseek-chat",
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 获取响应流
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法获取响应流");
      }

      // 解码器
      const decoder = new TextDecoder();
      let accumulatedResult = "";

      // 读取流
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResult += chunk;
        setResult(accumulatedResult);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("请求已中断");
      } else {
        console.error("生成出错:", error);
        setResult(`生成出错: ${error instanceof Error ? error.message : String(error)}`);
      }
    } finally {
      setGenerating(false);
      abortControllerRef.current = null;
    }
  };

  /**
   * 重置输入和结果
   */
  const handleReset = () => {
    setShowResult(false);
    setResult("");
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">流式输出测试</CardTitle>
        </CardHeader>
        
        {!showResult ? (
          <CardContent className="space-y-4">
            <div>
              <Textarea
                placeholder="请输入提示词..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full"
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={handleGenerate}>开始生成</Button>
            </div>
          </CardContent>
        ) : (
          <ToolResult
            content={result}
            toolType={ToolType.QUIZ}
            onReset={handleReset}
            isStreaming={generating}
            streamUpdate={(newContent) => {
              // 如果需要对新内容做额外处理，可以在这里添加
              console.log("接收到更新的内容，长度:", newContent.length);
            }}
          />
        )}
      </Card>
    </div>
  );
}
