/**
 * 工具动态路由页面
 * 基于工具ID加载相应的工具页面
 */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { getToolById, getAllTools } from '@/components/edu-tools/registry/tool-registry';

interface ToolRouteProps {
  params: {
    toolId: string;
  };
}

/**
 * 生成页面元数据
 */
export async function generateMetadata({ params }: ToolRouteProps): Promise<Metadata> {
  const tool = getToolById(params.toolId);
  
  if (!tool) {
    return {
      title: '工具未找到',
      description: '请求的工具不存在或已被移除',
    };
  }
  
  return {
    title: tool.routing.metadata.title,
    description: tool.routing.metadata.description,
  };
}

/**
 * 工具页面路由组件
 */
export default function ToolRoute({ params }: ToolRouteProps) {
  const { toolId } = params;
  const tool = getToolById(toolId);
  
  // 如果工具不存在，返回404页面
  if (!tool) {
    return notFound();
  }
  
  return <ToolPage toolId={toolId} />;
}

/**
 * 生成静态路径
 * Next.js将为每个返回的路径预渲染页面
 */
export async function generateStaticParams() {
  const tools = getAllTools();
  
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}
