/**
 * 工具注册表主文件
 * 导入并注册所有可用工具
 */
import { registerTool, getAllTools, getToolById } from './tool-registry';
import { professionalEmailTool } from './definitions/professional-email';
import { quizTool } from './definitions/quiz';
import { lessonPlanTool } from './definitions/lesson-plan';
import { conceptBackgroundTool } from './definitions/concept-background';
import { teachingMaterialTool } from './definitions/teaching-material';

// 注册所有工具
// 每添加一个新工具，只需要在这里导入并注册即可
console.log('开始注册工具...');
console.log('注册专业邮件工具:', professionalEmailTool.id);
registerTool(professionalEmailTool);

console.log('注册测验工具:', quizTool.id);
registerTool(quizTool);

console.log('注册教案工具:', lessonPlanTool.id);
registerTool(lessonPlanTool);

console.log('注册概念背景工具:', conceptBackgroundTool.id);
registerTool(conceptBackgroundTool);

console.log('注册教学课件工具:', teachingMaterialTool.id);
registerTool(teachingMaterialTool);

// 导出工具注册表相关函数
export { getAllTools, getToolById } from './tool-registry';
export { ToolCategory } from './types';

// 注册完成后检查工具列表
const allTools = getAllTools();
console.log(`已成功注册 ${allTools.length} 个教育工具:`);
allTools.forEach(tool => console.log(` - ${tool.id}: ${tool.title}`));

// 特别检查测验工具是否正确注册
const quizToolCheck = getToolById('quiz');
console.log('测验工具检查结果:', quizToolCheck ? '已找到' : '未找到');
