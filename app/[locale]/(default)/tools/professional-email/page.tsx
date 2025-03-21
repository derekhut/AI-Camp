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
  const tool = getToolById('professional-email');
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools/professional-email`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools/professional-email`;
  }

  return {
    title: tool ? `${tool.title} - AI Camp` : "专业邮件生成 - AI Camp",
    description: tool ? tool.description : "根据目的、场景和收件人，生成专业、得体的商务和学术邮件！",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 专业邮件工具页面 - 使用工具注册系统
 */
export default function ProfessionalEmailToolPage() {
  return <ToolPage toolId="professional-email" />;
}
