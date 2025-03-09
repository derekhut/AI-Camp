/**
 * 提示词管理
 * 
 * 这个文件作为提示词模块的主入口点，负责整合所有学科的提示词
 * 并提供统一的接口供 QuizTool 组件使用
 */

import { SubjectId } from "../index";
import { basePromptTemplate, replaceTemplateVariables } from "./base";
import { getApCspPrompt } from "./ap_csp";

/**
 * 其他学科的提示词导入将在这里添加
 * 例如:
 * import { getApPsychologyPrompt } from "./ap_psychology";
 * import { getApPrecalculusPrompt } from "./ap_precalculus";
 * import { getApComputerSciencePrompt } from "./ap_computer_science";
 */

/**
 * 根据学科ID获取特定学科的提示词
 * @param subjectId 学科ID
 * @returns 学科特定的提示词
 */
function getSubjectSpecificPrompt(subjectId: SubjectId): string {
  switch (subjectId) {
    case "ap_csp":
      return getApCspPrompt();
    case "ap_computer_science":
      // 这里将来会返回 AP 计算机科学的提示词
      return "";
    case "ap_psychology":
      // 这里将来会返回 AP 心理学的提示词
      return "";
    case "ap_precalculus":
      // 这里将来会返回 AP 微积分的提示词
      return "";
    default:
      return "";
  }
}

/**
 * 根据提供的参数生成完整的提示词
 * @param params 生成提示词所需的参数
 * @returns 完整的提示词
 */
export function generatePrompt(params: {
  subjectId: SubjectId;
  subjectName: string;
  gradeLevel: string;
  count: string;
  description: string;
}): string {
  // 1. 使用基本模板替换变量
  const basePromptWithVariables = replaceTemplateVariables(basePromptTemplate, {
    subjectName: params.subjectName,
    gradeLevel: params.gradeLevel,
    count: params.count,
    description: params.description,
  });
  
  // 2. 获取特定学科的提示词
  const subjectSpecificPrompt = getSubjectSpecificPrompt(params.subjectId);
  
  // 3. 组合基础提示词和特定学科提示词
  return `${basePromptWithVariables}\n\n${subjectSpecificPrompt}`;
}
