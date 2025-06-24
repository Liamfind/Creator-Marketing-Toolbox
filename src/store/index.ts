import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Tool } from '@/types';

interface AppState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;
  
  // 工具状态
  tools: Tool[];
  activeTool: string | null;
  
  // 设置状态
  theme: 'light' | 'dark';
  language: 'zh-CN' | 'en-US';
  
  // 操作函数
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTools: (tools: Tool[]) => void;
  setActiveTool: (toolId: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'zh-CN' | 'en-US') => void;
  
  // 登出
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      tools: [],
      activeTool: null,
      theme: 'light',
      language: 'zh-CN',
      
      // 操作函数
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setTools: (tools) => set({ tools }),
      setActiveTool: (activeTool) => set({ activeTool }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      // 登出
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        activeTool: null 
      }),
    }),
    {
      name: 'vv-calculator-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 