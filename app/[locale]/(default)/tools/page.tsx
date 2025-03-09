import { getLandingPage } from "@/services/page";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Icon from "@/components/icon";

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
    { id: "automation", name: "自动化" },
    { id: "websites", name: "基础网站" },
    { id: "ecommerce", name: "电子商务" },
    { id: "jobboard", name: "求职板" },
    { id: "marketing", name: "营销" },
    { id: "marketplace", name: "市场" },
    { id: "membership", name: "会员资格" },
    { id: "mobile", name: "移动应用" },
  ];
  
  // 模拟工具数据（实际项目中应从数据库或API获取）
  const tools = [
    {
      id: "tool1",
      title: "如何使用Airtable和Zapier自动化处理查询",
      description: "使用Airtable和Zapier建立查询自动化处理流程",
      category: "automation",
      tag: "tutorial",
      isPick: true,
      image: "/placeholder-tool.png"
    },
    {
      id: "tool2",
      title: "Superpath: 每月只花$500打造价值$500K的内容营销业务",
      description: "通过内容营销策略打造持续增长的业务",
      category: "marketing",
      tag: "community_story",
      isPick: true,
      image: "/placeholder-tool.png"
    },
    {
      id: "tool3",
      title: "使用Outseta和Carrd构建高效的咨询业务",
      description: "使用无代码工具快速启动咨询业务",
      category: "websites",
      tag: "tutorial",
      isPick: true,
      image: "/placeholder-tool.png"
    },
    {
      id: "tool4",
      title: "构建无代码求职板",
      description: "不需要编程即可构建专业求职板网站",
      category: "jobboard",
      tag: "tutorial",
      isPick: true,
      image: "/placeholder-tool.png"
    },
    {
      id: "zapier",
      title: "Zapier",
      description: "连接你的应用并自动化工作流",
      category: "automation",
      tag: "tool",
      isPick: true,
      image: "/placeholder-tool.png"
    },
    {
      id: "webflow",
      title: "Webflow",
      description: "构建更好的业务网站，更快。无需编码。",
      category: "websites",
      tag: "tool",
      isPick: true,
      image: "/placeholder-tool.png"
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
            <Card key={tool.id} className="flex flex-col h-full group hover:border-primary hover:shadow-md transition-all duration-300">
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
                  {tool.tag === "tutorial" && "教程"}
                  {tool.tag === "community_story" && "社区故事"}
                  {tool.tag === "tool" && "工具"}
                </div>
              </CardFooter>
            </Card>
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
                <Card key={tool.id} className="flex flex-col h-full group hover:border-primary hover:shadow-md transition-all duration-300">
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
                      {tool.tag === "tutorial" && "教程"}
                      {tool.tag === "community_story" && "社区故事"}
                      {tool.tag === "tool" && "工具"}
                    </div>
                  </CardFooter>
                </Card>
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
                    <Card key={tool.id} className="flex flex-col h-full group hover:border-primary hover:shadow-md transition-all duration-300">
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
                          {tool.tag === "tutorial" && "教程"}
                          {tool.tag === "community_story" && "社区故事"}
                          {tool.tag === "tool" && "工具"}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
