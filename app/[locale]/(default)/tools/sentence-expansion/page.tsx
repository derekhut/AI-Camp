/**
 * 句子扩写工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { sentenceExpansionTool } from '@/components/edu-tools/registry/definitions/sentence-expansion';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: sentenceExpansionTool.routing.metadata.title,
  description: sentenceExpansionTool.routing.metadata.description,
};

/**
 * 句子扩写工具页面组件
 */
export default function SentenceExpansionPage() {
  return <ToolPage toolId={sentenceExpansionTool.id} />;
}
