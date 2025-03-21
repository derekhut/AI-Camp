/**
 * 工具注册表系统
 * 管理所有教育工具的注册和检索
 */
import { ToolDefinition } from './types';

/**
 * 存储所有注册工具的集合
 */
const toolRegistry = new Map<string, ToolDefinition>();

/**
 * 注册一个新工具
 * @param tool 工具定义对象
 */
export function registerTool(tool: ToolDefinition): void {
  if (toolRegistry.has(tool.id)) {
    console.warn(`工具ID "${tool.id}" 已存在，将被覆盖`);
  }
  
  // 验证工具定义的完整性
  validateToolDefinition(tool);
  
  // 注册工具
  toolRegistry.set(tool.id, tool);
  console.log(`工具 "${tool.id}" 已成功注册`);
}

// 导入工具定义，使用静态导入而非动态require
import { quizTool } from './definitions/quiz';
import { professionalEmailTool } from './definitions/professional-email';
import { lessonPlanTool } from './definitions/lesson-plan';

// 预先创建工具映射表，避免动态导入
const toolBackupMap: Record<string, ToolDefinition> = {
  'quiz': quizTool,
  'professional-email': professionalEmailTool,
  'lesson-plan': lessonPlanTool,
  // 可以根据需要添加更多工具
};

/**
 * 根据ID获取工具
 * @param id 工具ID
 * @returns 工具定义对象，如果未找到则返回undefined
 */
export function getToolById(id: string): ToolDefinition | undefined {
  // 先尝试从注册表中获取工具
  const tool = toolRegistry.get(id);
  if (tool) return tool;
  
  // 如果在注册表中未找到，尝试从备用映射中获取
  if (toolBackupMap[id]) {
    // 将工具添加到注册表中
    registerTool(toolBackupMap[id]);
    console.log(`从备用映射中注册了 ${id} 工具`);
    return toolBackupMap[id];
  }
  
  // 如果依然未找到，返回 undefined
  return undefined;
}

/**
 * 获取所有注册的工具
 * @returns 所有工具定义对象的数组
 */
export function getAllTools(): ToolDefinition[] {
  return Array.from(toolRegistry.values());
}

/**
 * 按分类获取工具
 * @param category 工具分类
 * @returns 指定分类的工具定义对象数组
 */
export function getToolsByCategory(category: string): ToolDefinition[] {
  return getAllTools().filter(tool => tool.category === category);
}

/**
 * 验证工具定义的完整性
 * @param tool 工具定义对象
 * @throws 如果工具定义不完整，抛出错误
 */
function validateToolDefinition(tool: ToolDefinition): void {
  // 基本验证，可以根据需要扩展
  if (!tool.id) throw new Error('工具ID不能为空');
  if (!tool.title) throw new Error('工具标题不能为空');
  if (!tool.prompt?.template) throw new Error('工具提示词模板不能为空');
  if (!tool.routing?.path) throw new Error('工具路由路径不能为空');
  
  // 验证表单字段ID的唯一性
  const fieldIds = new Set<string>();
  for (const field of tool.form.fields) {
    if (fieldIds.has(field.id)) {
      throw new Error(`表单字段ID "${field.id}" 在工具 "${tool.id}" 中重复`);
    }
    fieldIds.add(field.id);
  }
}
