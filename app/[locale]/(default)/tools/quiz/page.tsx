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
  const tool = getToolById('quiz');
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools/quiz`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools/quiz`;
  }

  return {
    title: tool ? `${tool.title} - AI Camp` : "设计选择题 - AI Camp",
    description: tool ? tool.description : "创建一个AP学科的选择题测验，基于任何主题、标准或描述！",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 设计选择题工具页面 - 使用工具注册系统
 */
export default function QuizToolPage() {
  return <ToolPage toolId="quiz" />;
}
