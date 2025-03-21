import { getLandingPage } from "@/services/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Icon from "@/components/icon";
import Link from "next/link";
import { getAllTools, ToolCategory } from "@/components/edu-tools/registry/tools";

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
  
  // 从工具注册表获取所有工具
  const registeredTools = getAllTools();
  
  // 定义工具类别映射（帮助显示中文名）
  const categoryNames: Record<string, string> = {
    [ToolCategory.CONTENT_CREATION]: "内容创作",
    [ToolCategory.ASSESSMENT]: "评测和评估",
    [ToolCategory.PLANNING]: "规划和管理"
  };
  
  // 工具分类（从工具注册表类型定义中获取）
  const categories = [
    { id: "all", name: "全部" },
    { id: ToolCategory.CONTENT_CREATION, name: "内容创作" },
    { id: ToolCategory.ASSESSMENT, name: "评测和评估" },
    { id: ToolCategory.PLANNING, name: "规划和管理" },
  ];
  
  // 将注册的工具映射到界面需要的格式
  const tools = registeredTools.map(tool => ({
    id: tool.id,
    title: tool.title,
    description: tool.description,
    category: tool.category,
    isPick: tool.id === 'quiz', // 示例：将选择题工具设为推荐工具
    image: "/placeholder-tool.png",
    url: tool.routing.path
  }));
  
  // 定义工具项类型，确保类型安全
  type ToolItem = {
    id: string;
    title: string;
    description: string;
    category: string;
    isPick: boolean;
    image: string;
    url?: string;
  };
  
  // 添加一些尚未实现但计划中的工具（仅用于演示）
  const plannedTools: ToolItem[] = [
    {
      id: "sentence-expansion",
      title: "句子扩写",
      description: "将简短句子扩写为更丰富、更有表现力的段落",
      category: ToolCategory.CONTENT_CREATION,
      isPick: false,
      image: "/placeholder-tool.png"
    },
    // 注意：concept-background 和 teaching-material 工具已经实现，已从计划中工具列表移除
  ];
  
  // 合并已实现和计划中的工具
  const allTools = [...tools, ...plannedTools];
  
  // 获取最受欢迎的工具
  const popularTools = allTools.filter(tool => tool.isPick).slice(0, 3); // 只取前3个

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
                    {categoryNames[tool.category] || tool.category}
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
              {allTools.map((tool) => (
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
                        {categoryNames[tool.category] || tool.category}
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
                            {categoryNames[tool.category] || tool.category}
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
