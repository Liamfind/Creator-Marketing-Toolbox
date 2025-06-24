import { Card, Typography, Row, Col, Statistic, Progress } from 'antd';
import { BarChartOutlined, RiseOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Analytics: React.FC = () => {
  // 模拟数据
  const mockData = {
    totalInfluencers: 156,
    activeCampaigns: 23,
    totalRevenue: 1250000,
    avgROI: 245,
    conversionRate: 3.2,
    engagementRate: 8.5,
    monthlyGrowth: 15.3
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <BarChartOutlined style={{ marginRight: '8px' }} />
        数据分析
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="合作达人总数"
              value={mockData.totalInfluencers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃项目"
              value={mockData.activeCampaigns}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总收入"
              value={mockData.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              formatter={(value) => `¥${(value as number / 10000).toFixed(1)}万`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均ROI"
              value={mockData.avgROI}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="转化率分析">
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>整体转化率</Text>
                <Text strong>{mockData.conversionRate}%</Text>
              </div>
              <Progress 
                percent={mockData.conversionRate * 10} 
                strokeColor="#1890ff"
                showInfo={false}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>互动率</Text>
                <Text strong>{mockData.engagementRate}%</Text>
              </div>
              <Progress 
                percent={mockData.engagementRate * 10} 
                strokeColor="#52c41a"
                showInfo={false}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>月度增长</Text>
                <Text strong>{mockData.monthlyGrowth}%</Text>
              </div>
              <Progress 
                percent={mockData.monthlyGrowth * 5} 
                strokeColor="#fa8c16"
                showInfo={false}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="平台分布">
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>小红书</Text>
                <Text strong>45%</Text>
              </div>
              <Progress percent={45} strokeColor="#ff4d4f" showInfo={false} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>抖音</Text>
                <Text strong>35%</Text>
              </div>
              <Progress percent={35} strokeColor="#1890ff" showInfo={false} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>微博</Text>
                <Text strong>15%</Text>
              </div>
              <Progress percent={15} strokeColor="#52c41a" showInfo={false} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text>其他</Text>
                <Text strong>5%</Text>
              </div>
              <Progress percent={5} strokeColor="#fa8c16" showInfo={false} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="数据洞察">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Title level={4} style={{ color: '#1890ff' }}>🎯 最佳表现</Title>
                  <Text>小红书平台转化率最高，达到4.2%</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Title level={4} style={{ color: '#52c41a' }}>📈 增长趋势</Title>
                  <Text>本月收入环比增长15.3%，表现良好</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Title level={4} style={{ color: '#fa8c16' }}>💡 优化建议</Title>
                  <Text>建议增加抖音平台投入，提升整体ROI</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics; 