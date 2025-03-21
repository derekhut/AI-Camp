import { ToolPage } from "@/components/edu-tools/common/tool-page";
import { getToolById } from "@/components/edu-tools/registry/tool-registry";

/**
 * 生成页面元数据
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 从工具注册表获取工具定义
  const tool = getToolById('daily-quote');
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools/daily-quote`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools/daily-quote`;
  }

  return {
    title: tool ? `${tool.title} - AI Camp` : "每日金句生成 - AI Camp",
    description: tool ? tool.description : "根据主题、场景和风格，生成激励人心的每日金句，为学习增添动力！",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 每日金句工具页面 - 使用工具注册系统
 */
export default function DailyQuoteToolPage() {
  return <ToolPage toolId="daily-quote" />;
}
