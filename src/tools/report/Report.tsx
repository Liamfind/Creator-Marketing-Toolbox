import { Card, Form, Input, Select, DatePicker, Button, Row, Col, Typography, Upload, message } from 'antd';
import { FileTextOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ReportFormData {
  campaignName: string;
  platform: string;
  startDate: any;
  endDate: any;
  description: string;
  reportType: string;
}

const Report: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ReportFormData) => {
    setLoading(true);
    
    // 模拟生成报告的过程
    setTimeout(() => {
      message.success('报告生成成功！');
      setLoading(false);
    }, 2000);
  };

  const reportTypes = [
    { value: 'summary', label: '项目总结报告' },
    { value: 'performance', label: '效果分析报告' },
    { value: 'roi', label: 'ROI分析报告' },
    { value: 'comprehensive', label: '综合评估报告' }
  ];

  const platforms = [
    { value: 'xiaohongshu', label: '小红书' },
    { value: 'douyin', label: '抖音' },
    { value: 'weibo', label: '微博' },
    { value: 'bilibili', label: 'B站' },
    { value: 'all', label: '全平台' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <FileTextOutlined style={{ marginRight: '8px' }} />
        报告生成器
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="报告配置">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                reportType: 'summary',
                platform: 'all'
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="项目名称"
                    name="campaignName"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                  >
                    <Input placeholder="请输入项目名称" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="报告类型"
                    name="reportType"
                    rules={[{ required: true, message: '请选择报告类型' }]}
                  >
                    <Select placeholder="请选择报告类型">
                      {reportTypes.map(type => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="平台"
                    name="platform"
                    rules={[{ required: true, message: '请选择平台' }]}
                  >
                    <Select placeholder="请选择平台">
                      {platforms.map(platform => (
                        <Option key={platform.value} value={platform.value}>
                          {platform.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="报告格式"
                    name="format"
                    initialValue="pdf"
                  >
                    <Select placeholder="请选择报告格式">
                      <Option value="pdf">PDF</Option>
                      <Option value="excel">Excel</Option>
                      <Option value="word">Word</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="开始日期"
                    name="startDate"
                    rules={[{ required: true, message: '请选择开始日期' }]}
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="请选择开始日期" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="结束日期"
                    name="endDate"
                    rules={[{ required: true, message: '请选择结束日期' }]}
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="请选择结束日期" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="项目描述"
                name="description"
              >
                <TextArea 
                  rows={4} 
                  placeholder="请输入项目描述（可选）"
                />
              </Form.Item>

              <Form.Item
                label="数据文件"
                name="dataFile"
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".xlsx,.xls,.csv"
                >
                  <Button icon={<UploadOutlined />}>上传数据文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  loading={loading}
                  icon={<DownloadOutlined />}
                >
                  生成报告
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="报告预览">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <FileTextOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
              <Text type="secondary">填写表单后生成报告预览</Text>
            </div>
          </Card>

          <Card title="报告模板" style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>项目总结报告</Text>
              <br />
              <Text type="secondary">包含项目概览、关键指标、效果评估等</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>效果分析报告</Text>
              <br />
              <Text type="secondary">详细的数据分析、趋势图表、对比分析</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>ROI分析报告</Text>
              <br />
              <Text type="secondary">投资回报率计算、成本分析、收益评估</Text>
            </div>
            <div>
              <Text strong>综合评估报告</Text>
              <br />
              <Text type="secondary">全面的项目评估、建议优化、未来规划</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Report; 