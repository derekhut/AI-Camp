/**
 * 工具结果组件类型声明文件
 */
import { ReactNode } from 'react';

export interface ToolResultProps {
  result: string;
  title?: string;
}

export declare function ToolResult(props: ToolResultProps): ReactNode;
