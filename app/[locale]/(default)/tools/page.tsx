import { getLandingPage } from "@/services/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Icon from "@/components/icon";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/tools`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/tools`;
  }

  return {
    title: "AI Camp Tools",
    description: "AI tools for educational purposes",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ToolsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 获取页面数据（暂时沿用landing page的数据结构）
  const page = await getLandingPage(locale);
  
  // 工具分类（实际项目中可以从数据库或API获取）
  const categories = [
    { id: "all", name: "全部" },
    { id: "content_creation", name: "内容创作" },
    { id: "personal_growth", name: "个人成长" },
    { id: "teaching_activities", name: "教学活动" },
    { id: "teaching_resources", name: "教学资源" },
  ];
  
  // 模拟工具数据（实际项目中应从数据库或API获取）
  const tools = [
    {
      id: "sentence-expansion",
      title: "句子扩写",
      description: "将简短句子扩写为更丰富、更有表现力的段落",
      category: "content_creation",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "professional-email",
      title: "撰写专业邮件",
      description: "根据需求生成专业、得体的商务和学术邮件",
      category: "content_creation",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "daily-quotes",
      title: "每日金句",
      description: "生成激励、反思或创造性思考的精彩句子",
      category: "content_creation",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "concept-background",
      title: "概念背景",
      description: "深入浅出地解释复杂的主题和概念",
      category: "content_creation",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "concept-analogy",
      title: "概念类比",
      description: "通过生动的类比解释抽象或复杂的概念",
      category: "content_creation",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "effective-communication",
      title: "有效沟通",
      description: "针对不同场景提供有效沟通的策略和建议",
      category: "personal_growth",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "mind-mirror",
      title: "心灵镜像",
      description: "通过提示词反映学生的心理和情感状态",
      category: "personal_growth",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "teaching-slides",
      title: "教学课件",
      description: "为特定知识点生成结构清晰的教学课件",
      category: "teaching_resources",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "group-activity",
      title: "小组活动",
      description: "设计适用于特定知识点的互动小组活动",
      category: "teaching_activities",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "activity-plan",
      title: "活动方案",
      description: "生成详细的活动计划，包括目标、规则和时间安排",
      category: "teaching_activities",
      isPick: false,
      image: "/placeholder-tool.png"
    },
    {
      id: "quiz",
      title: "设计选择题",
      description: "创建一个AP学科的选择题测验，基于任何主题、标准或描述！",
      category: "teaching_resources",
      isPick: true,
      image: "/placeholder-tool.png",
      url: "/tools/quiz"
    },
  ];
  
  // 获取最受欢迎的工具（这里简单使用isPick标记，实际应基于更复杂的逻辑）
  const popularTools = tools.filter(tool => tool.isPick).slice(0, 3); // 只取前3个

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* 最受欢迎部分 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-6">推荐给你</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <Link 
              key={tool.id} 
              href={tool.url || `#${tool.id}`} 
              className="flex flex-col h-full group transition-all duration-300"
            >
              <Card className="flex flex-col h-full hover:border-primary hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="text-primary mb-2 text-sm font-medium flex items-center">
                    <Icon name="star" className="mr-1" />
                    Our Pick
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-3">
                  <div className="inline-block px-2.5 py-1 bg-accent/10 text-accent-foreground rounded-md text-xs font-medium">
                    {tool.category === "content_creation" && "内容创作"}
                    {tool.category === "personal_growth" && "个人成长"}
                    {tool.category === "teaching_activities" && "教学活动"}
                    {tool.category === "teaching_resources" && "教学资源"}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      {/* 所有工具部分 */}
      <section>
        <h2 className="text-2xl font-semibold text-primary mb-6">所有工具</h2>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* 全部工具 */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  href={tool.url || `#${tool.id}`} 
                  className="flex flex-col h-full group transition-all duration-300"
                >
                  <Card className="flex flex-col h-full hover:border-primary hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-3">
                      {tool.isPick && (
                        <div className="text-primary mb-2 text-sm font-medium flex items-center">
                          <Icon name="star" className="mr-1" />
                          Our Pick
                        </div>
                      )}
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-3">
                      <div className="inline-block px-2.5 py-1 bg-accent/10 text-accent-foreground rounded-md text-xs font-medium">
                        {tool.category === "content_creation" && "内容创作"}
                        {tool.category === "personal_growth" && "个人成长"}
                        {tool.category === "teaching_activities" && "教学活动"}
                        {tool.category === "teaching_resources" && "教学资源"}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          {/* 分类工具 */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter(tool => tool.category === category.id)
                  .map((tool) => (
                    <Link 
                      key={tool.id} 
                      href={tool.url || `#${tool.id}`} 
                      className="flex flex-col h-full group transition-all duration-300"
                    >
                      <Card className="flex flex-col h-full hover:border-primary hover:shadow-md transition-all duration-300">
                        <CardHeader className="pb-3">
                          {tool.isPick && (
                            <div className="text-primary mb-2 text-sm font-medium flex items-center">
                              <Icon name="star" className="mr-1" />
                              Our Pick
                            </div>
                          )}
                          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{tool.title}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto pt-3">
                          <div className="inline-block px-2.5 py-1 bg-accent/10 text-accent-foreground rounded-md text-xs font-medium">
                            {tool.category === "content_creation" && "内容创作"}
                            {tool.category === "teaching_activities" && "教学活动"}
                            {tool.category === "teaching_resources" && "教学资源"}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
