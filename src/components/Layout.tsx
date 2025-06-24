import React from 'react';
import { Layout as AntLayout, Menu, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  CalculatorOutlined,
  BarChartOutlined,
  FileTextOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/tools/calculator',
      icon: <CalculatorOutlined />,
      label: 'ROI计算器',
    },
    {
      key: '/tools/analytics',
      icon: <BarChartOutlined />,
      label: '数据分析',
    },
    {
      key: '/tools/report',
      icon: <FileTextOutlined />,
      label: '报告生成',
    },
    {
      key: '/tools/avg-views',
      icon: <PlayCircleOutlined />,
      label: '达人平均播放量',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <AntLayout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Sider width={240} theme="light" style={{ minHeight: '100vh', boxShadow: '2px 0 8px #f0f1f2' }}>
        <div style={{ padding: '24px 0', textAlign: 'center' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff', letterSpacing: 2 }}>
            达人营销百宝箱
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0, fontSize: 16 }}
        />
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', padding: '0 32px', borderBottom: '1px solid #f0f0f0', height: 64, display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0, lineHeight: '64px', fontWeight: 700, color: '#222' }}>
            达人营销工具集
          </Title>
        </Header>
        <Content style={{ margin: 0, minHeight: 280, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: '#fff', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '32px 24px 48px 24px' }}>
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 