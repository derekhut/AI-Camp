"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// 动态导入MDEditor组件，禁用SSR
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  // 使用状态来避免hydration错误
  const [mounted, setMounted] = useState(false);

  // 组件挂载后设置状态
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full md:w-[800px]">
      {mounted && (
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          height={600}
        />
      )}
      {/* {mounted && <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />} */}
    </div>
  );
}
