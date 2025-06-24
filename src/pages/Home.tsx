import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  CalculatorOutlined, 
  BarChartOutlined, 
  FileTextOutlined,
  RocketOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: 'ROI计算器',
      description: '快速计算达人营销的投资回报率，帮助评估项目效果',
      icon: <CalculatorOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      path: '/tools/calculator',
    },
    {
      title: '数据分析',
      description: '深度分析达人营销数据，生成可视化图表和洞察',
      icon: <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      path: '/tools/analytics',
    },
    {
      title: '报告生成',
      description: '自动生成专业的营销报告，提升工作效率',
      icon: <FileTextOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
      path: '/tools/report',
    },
  ];

  return (
    <div style={{ maxWidth: 800, width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1} style={{ fontWeight: 700, color: '#1890ff', marginBottom: 0 }}>
          <RocketOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
          达人营销百宝箱
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#666', margin: '16px 0 0 0' }}>
          专为达人营销团队打造的专业工具集，提升工作效率，优化营销效果
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {tools.map((tool, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              style={{ height: '100%', textAlign: 'center', borderRadius: 12 }}
              onClick={() => navigate(tool.path)}
              bodyStyle={{ padding: 24 }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {tool.icon}
                <div>
                  <Title level={3} style={{ margin: 0 }}>{tool.title}</Title>
                  <Paragraph style={{ color: '#666', margin: '8px 0 16px 0' }}>
                    {tool.description}
                  </Paragraph>
                  <Button type="primary" size="large">
                    开始使用
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Title level={2} style={{ fontWeight: 600 }}>为什么选择我们的工具？</Title>
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }} justify="center">
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 10 }}>
              <Title level={4}>🚀 高效便捷</Title>
              <Paragraph>
                一键操作，快速完成复杂的计算和分析工作
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 10 }}>
              <Title level={4}>📊 专业准确</Title>
              <Paragraph>
                基于行业标准算法，确保计算结果的准确性
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={{ borderRadius: 10 }}>
              <Title level={4}>🎯 针对性强</Title>
              <Paragraph>
                专为达人营销场景设计，满足专业需求
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 