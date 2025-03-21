/**
 * 概念背景工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { conceptBackgroundTool } from '@/components/edu-tools/registry/definitions/concept-background';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: conceptBackgroundTool.routing.metadata.title,
  description: conceptBackgroundTool.routing.metadata.description,
};

/**
 * 概念背景工具页面组件
 */
export default function ConceptBackgroundPage() {
  return <ToolPage toolId={conceptBackgroundTool.id} />;
}
