import { Tool } from '@/types';

// 工具注册表
class ToolRegistry {
  private tools: Map<string, Tool> = new Map();

  // 注册工具
  register(tool: Tool): void {
    if (this.tools.has(tool.id)) {
      console.warn(`Tool ${tool.id} already exists, overwriting...`);
    }
    this.tools.set(tool.id, tool);
  }

  // 获取工具
  get(id: string): Tool | undefined {
    return this.tools.get(id);
  }

  // 获取所有工具
  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }

  // 移除工具
  remove(id: string): boolean {
    return this.tools.delete(id);
  }

  // 检查工具是否存在
  has(id: string): boolean {
    return this.tools.has(id);
  }

  // 获取工具数量
  size(): number {
    return this.tools.size;
  }

  // 清空所有工具
  clear(): void {
    this.tools.clear();
  }
}

// 创建全局工具注册表实例
export const toolRegistry = new ToolRegistry();

// 工具注册装饰器
export function registerTool(tool: Tool) {
  return function (target: any) {
    toolRegistry.register(tool);
    return target;
  };
}

// 导出工具注册表
export default toolRegistry; 