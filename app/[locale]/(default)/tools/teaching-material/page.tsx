/**
 * 教学课件工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { teachingMaterialTool } from '@/components/edu-tools/registry/definitions/teaching-material';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: teachingMaterialTool.routing.metadata.title,
  description: teachingMaterialTool.routing.metadata.description,
};

/**
 * 教学课件工具页面组件
 */
export default function TeachingMaterialPage() {
  return <ToolPage toolId={teachingMaterialTool.id} />;
}
