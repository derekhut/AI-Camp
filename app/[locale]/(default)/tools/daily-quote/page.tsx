/**
 * 每日金句工具页面
 */
import { Metadata } from 'next';
import { ToolPage } from '@/components/edu-tools/common/tool-page';
import { dailyQuoteTool } from '@/components/edu-tools/registry/definitions/daily-quote';

/**
 * 页面元数据
 */
export const metadata: Metadata = {
  title: dailyQuoteTool.routing.metadata.title,
  description: dailyQuoteTool.routing.metadata.description,
};

/**
 * 每日金句工具页面组件
 */
export default function DailyQuoteToolPage() {
  return <ToolPage toolId={dailyQuoteTool.id} />;
}
