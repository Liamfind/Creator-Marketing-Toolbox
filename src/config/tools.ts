import { Tool } from '@/types';
import Calculator from '@/tools/calculator/Calculator';
import Analytics from '@/tools/analytics/Analytics';
import Report from '@/tools/report/Report';
import AvgViewsCalculator from '@/tools/avg-views';

// 工具配置
export const toolConfigs: Tool[] = [
  {
    id: 'calculator',
    name: 'ROI计算器',
    description: '快速计算达人营销的投资回报率，帮助评估项目效果',
    icon: 'CalculatorOutlined',
    path: '/tools/calculator',
    component: Calculator,
  },
  {
    id: 'avg-views',
    name: '达人平均播放量',
    description: '输入Tiktok主页，自动统计近10条视频去极值后的中位播放量',
    icon: 'PlayCircleOutlined',
    path: '/tools/avg-views',
    component: AvgViewsCalculator,
  },
  {
    id: 'analytics',
    name: '数据分析',
    description: '深度分析达人营销数据，生成可视化图表和洞察',
    icon: 'BarChartOutlined',
    path: '/tools/analytics',
    component: Analytics,
  },
  {
    id: 'report',
    name: '报告生成',
    description: '自动生成专业的营销报告，提升工作效率',
    icon: 'FileTextOutlined',
    path: '/tools/report',
    component: Report,
  },
];

// 工具分类
export const toolCategories = [
  {
    id: 'calculation',
    name: '计算工具',
    tools: ['calculator'],
  },
  {
    id: 'analysis',
    name: '分析工具',
    tools: ['analytics'],
  },
  {
    id: 'report',
    name: '报告工具',
    tools: ['report'],
  },
];

// 获取工具配置
export const getToolConfig = (id: string): Tool | undefined => {
  return toolConfigs.find(tool => tool.id === id);
};

// 获取所有工具配置
export const getAllToolConfigs = (): Tool[] => {
  return toolConfigs;
};

// 获取工具分类
export const getToolCategories = () => {
  return toolCategories;
}; 