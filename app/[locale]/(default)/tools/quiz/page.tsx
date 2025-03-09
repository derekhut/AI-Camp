import { QuizTool } from "@/components/edu-tools/tools/quiz";

/**
 * 生成页面元数据
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools/quiz`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools/quiz`;
  }

  return {
    title: "设计选择题 - AI Camp",
    description: "创建一个AP学科的选择题测验，基于任何主题、标准或描述！",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 设计选择题工具页面
 */
export default function QuizToolPage() {
  return <QuizTool />;
}
