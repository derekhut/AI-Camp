/**
 * 心灵镜像工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { mindMirrorTool } from '@/components/edu-tools/registry/definitions/mind-mirror';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: mindMirrorTool.routing.metadata.title,
  description: mindMirrorTool.routing.metadata.description,
};

/**
 * 心灵镜像工具页面组件
 */
export default function MindMirrorToolPage() {
  return <ToolPage toolId={mindMirrorTool.id} />;
}
