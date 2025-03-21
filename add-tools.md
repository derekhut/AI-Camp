# 教育工具系统 - 添加新工具指南

本文档提供了向教育工具系统添加新工具的高级步骤指南。

## 添加新工具的步骤

### 1. 创建工具定义文件

在 `components/edu-tools/registry/definitions/` 目录下创建一个新的 TypeScript 文件，命名为 `[tool-id].ts`。

这个文件需要定义工具的基本信息、表单字段、验证规则、提示词模板和路由信息。

### 2. 在工具注册表中注册新工具

编辑 `components/edu-tools/registry/tools.ts` 文件，导入并注册新工具。

### 3. 在工具注册表备份映射中添加新工具

编辑 `components/edu-tools/registry/tool-registry.ts` 文件，将新工具添加到备份映射表中。

这是一个容错机制，确保在所有场景下都能找到工具定义。

### 4. 创建专用页面文件

在 `app/[locale]/(default)/tools/[tool-id]/` 目录下创建 `page.tsx` 文件。

这个文件使用通用的 `ToolPage` 组件来渲染工具页面，并设置正确的元数据。

### 5. 重启开发服务器

重启 Next.js 开发服务器以使更改生效。

## 注意事项

- 确保工具ID在所有文件中保持一致
- 使用现有的枚举类型（如 `ToolType` 和 `ToolCategory`）
- 如果遇到404错误，检查路由路径和工具ID是否匹配
- 如果系统报告找不到工具，检查工具是否正确添加到备份映射表中

## 工具结构参考

每个工具定义包含以下主要部分：
- 基本信息（ID、标题、描述、图标）
- 分类和类型
- 表单定义（字段、验证规则、默认值）
- 提示词模板和参数映射
- 路由信息和元数据

详细的实现示例可参考现有工具，如 `professional-email.ts` 或 `concept-background.ts`。
