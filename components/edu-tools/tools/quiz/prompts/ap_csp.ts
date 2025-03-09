/**
 * AP计算机科学原理特定提示词
 * 
 * 根据 College Board 的 AP CSP 课程框架定制
 * https://apcentral.collegeboard.org/courses/ap-computer-science-principles
 */

/**
 * AP计算机科学原理课程的核心概念和大思想
 */
export const apCspPrompt = `
请专注于以下 AP 计算机科学原理 (CSP) 的核心概念和大思想：

1. 创造性开发 (Creative Development)
   - 使用迭代设计过程开发程序
   - 使用算法解决问题
   - 使用抽象管理程序复杂性

2. 数据 (Data)
   - 使用计算工具分析数据
   - 数据如何被表示和可视化
   - 使用计算工具处理数据和信息
   
3. 算法和编程 (Algorithms and Programming)
   - 变量、数据类型和算术表达式
   - 控制结构如条件和循环
   - 算法设计、实现和测试
   - 过程抽象与函数
   - 数据抽象与集合类型
   
4. 计算机系统与网络 (Computing Systems and Networks)
   - 计算机硬件概念
   - 互联网和网络概念
   - 网络层次结构
   - 分布式计算系统
   
5. 计算的影响 (Impact of Computing)
   - 计算创新的目的和功能
   - 计算创新在社会中的影响
   - 计算对隐私、法律与伦理的影响
   - 计算创新解决社会问题的能力

必须确保问题与以上内容相关，涵盖概念理解和实际应用能力，符合 AP CSP 考试风格。
`;

/**
 * 获取AP计算机科学原理的完整提示词
 * @returns AP计算机科学原理的完整提示词
 */
export function getApCspPrompt(): string {
  return apCspPrompt;
}
