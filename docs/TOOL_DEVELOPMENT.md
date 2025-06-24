# 工具开发指南

本文档介绍如何在达人营销百宝箱中添加新的工具模块。

## 📋 开发规范

### 1. 工具结构
每个工具应该遵循以下目录结构：
```
src/tools/
├── your-tool/
│   ├── YourTool.tsx          # 主组件
│   ├── components/           # 工具内部组件
│   ├── hooks/               # 工具内部hooks
│   ├── utils/               # 工具内部工具函数
│   ├── types.ts             # 工具类型定义
│   └── index.ts             # 导出文件
```

### 2. 组件规范
- 使用TypeScript进行类型检查
- 使用函数式组件和React Hooks
- 遵循Ant Design设计规范
- 添加适当的错误处理
- 支持响应式布局

### 3. 类型定义
在 `src/types/index.ts` 中添加工具相关的类型定义：
```typescript
export interface YourToolData {
  // 定义工具数据结构
}
```

## 🛠️ 开发步骤

### 步骤1: 创建工具目录
```bash
mkdir src/tools/your-tool
```

### 步骤2: 创建主组件
```typescript
// src/tools/your-tool/YourTool.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import { YourIcon } from '@ant-design/icons';

const { Title } = Typography;

const YourTool: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <YourIcon style={{ marginRight: '8px' }} />
        你的工具名称
      </Title>
      
      <Card>
        {/* 工具内容 */}
      </Card>
    </div>
  );
};

export default YourTool;
```

### 步骤3: 注册工具
在 `src/config/tools.ts` 中添加工具配置：
```typescript
import YourTool from '@/tools/your-tool/YourTool';

export const toolConfigs: Tool[] = [
  // ... 其他工具
  {
    id: 'your-tool',
    name: '你的工具名称',
    description: '工具描述',
    icon: 'YourIcon',
    path: '/tools/your-tool',
    component: YourTool,
  },
];
```

### 步骤4: 添加路由
在 `src/components/ToolRouter.tsx` 中添加路由：
```typescript
import YourTool from '../tools/your-tool/YourTool';

const ToolRouter: React.FC = () => {
  return (
    <Routes>
      {/* ... 其他路由 */}
      <Route path="your-tool" element={<YourTool />} />
    </Routes>
  );
};
```

### 步骤5: 添加菜单项
在 `src/components/Layout.tsx` 中添加菜单项：
```typescript
const menuItems = [
  // ... 其他菜单项
  {
    key: '/tools/your-tool',
    icon: <YourIcon />,
    label: '你的工具名称',
  },
];
```

## 📝 最佳实践

### 1. 错误处理
使用ErrorBoundary包装工具组件：
```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourTool />
</ErrorBoundary>
```

### 2. 状态管理
对于复杂状态，使用Zustand store：
```typescript
import { useAppStore } from '@/store';

const { setActiveTool } = useAppStore();
```

### 3. 数据验证
使用Zod或Yup进行数据验证：
```typescript
import { z } from 'zod';

const schema = z.object({
  // 定义验证规则
});
```

### 4. 性能优化
- 使用React.memo优化组件渲染
- 使用useMemo和useCallback优化计算
- 实现虚拟滚动处理大量数据

### 5. 测试
为工具编写单元测试：
```typescript
// src/tools/your-tool/__tests__/YourTool.test.tsx
import { render, screen } from '@testing-library/react';
import YourTool from '../YourTool';

describe('YourTool', () => {
  it('should render correctly', () => {
    render(<YourTool />);
    expect(screen.getByText('你的工具名称')).toBeInTheDocument();
  });
});
```

## 🔧 工具API

### 工具注册API
```typescript
import { toolRegistry } from '@/utils/toolRegistry';

// 注册工具
toolRegistry.register({
  id: 'your-tool',
  name: '你的工具名称',
  description: '工具描述',
  icon: 'YourIcon',
  path: '/tools/your-tool',
  component: YourTool,
});
```

### 状态管理API
```typescript
import { useAppStore } from '@/store';

const {
  user,
  isAuthenticated,
  tools,
  activeTool,
  setUser,
  setTools,
  setActiveTool,
} = useAppStore();
```

## 📊 数据流

### 1. 数据获取
```typescript
import { useState, useEffect } from 'react';

const YourTool: React.FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/your-data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染组件
};
```

### 2. 数据提交
```typescript
import { message } from 'antd';

const handleSubmit = async (values: any) => {
  try {
    const response = await fetch('/api/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      message.success('操作成功');
    } else {
      message.error('操作失败');
    }
  } catch (error) {
    message.error('网络错误');
  }
};
```

## 🎨 UI设计规范

### 1. 布局
- 使用24px的页面内边距
- 使用Card组件包装主要内容
- 使用Row和Col进行响应式布局

### 2. 颜色
- 主色：#1890ff
- 成功色：#52c41a
- 警告色：#fa8c16
- 错误色：#ff4d4f

### 3. 字体
- 标题：使用Typography.Title
- 正文：使用Typography.Text
- 强调：使用Typography.Text strong

### 4. 间距
- 组件间距：16px
- 页面间距：24px
- 卡片内边距：24px

## 🚀 部署

### 1. 构建
```bash
npm run build
```

### 2. 测试
```bash
npm run test
```

### 3. 代码检查
```bash
npm run lint
```

## 📞 支持

如果在开发过程中遇到问题，请：
1. 查看本文档
2. 检查现有工具的代码示例
3. 联系开发团队

## 📚 参考资源

- [React官方文档](https://react.dev/)
- [Ant Design文档](https://ant.design/)
- [TypeScript文档](https://www.typescriptlang.org/)
- [Zustand文档](https://zustand-demo.pmnd.rs/) 