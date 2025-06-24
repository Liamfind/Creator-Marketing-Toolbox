import { useState, useEffect } from 'react';
import { Tool } from '@/types';
import { toolRegistry } from '@/utils/toolRegistry';

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取所有已注册的工具
    const registeredTools = toolRegistry.getAll();
    setTools(registeredTools);
    setLoading(false);
  }, []);

  const addTool = (tool: Tool) => {
    toolRegistry.register(tool);
    setTools(toolRegistry.getAll());
  };

  const removeTool = (id: string) => {
    toolRegistry.remove(id);
    setTools(toolRegistry.getAll());
  };

  const getTool = (id: string) => {
    return toolRegistry.get(id);
  };

  return {
    tools,
    loading,
    addTool,
    removeTool,
    getTool,
  };
}; 