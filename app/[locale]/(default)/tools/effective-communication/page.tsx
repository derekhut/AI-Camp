/**
 * 有效沟通工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { effectiveCommunicationTool } from '@/components/edu-tools/registry/definitions/effective-communication';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: effectiveCommunicationTool.routing.metadata.title,
  description: effectiveCommunicationTool.routing.metadata.description,
};

/**
 * 有效沟通工具页面组件
 */
export default function EffectiveCommunicationToolPage() {
  return <ToolPage toolId={effectiveCommunicationTool.id} />;
}
