import React, { useState } from 'react';
import { Card, Form, InputNumber, Button, Row, Col, Typography, Divider, Alert } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CalculationResult {
  totalCost: number;
  totalRevenue: number;
  roi: number;
  profit: number;
  profitMargin: number;
}

const Calculator: React.FC = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<CalculationResult | null>(null);

  const onFinish = (values: any) => {
    const {
      influencerFee,
      productCost,
      shippingCost,
      platformFee,
      expectedSales,
      averageOrderValue
    } = values;

    const totalCost = influencerFee + productCost + shippingCost + platformFee;
    const totalRevenue = expectedSales * averageOrderValue;
    const profit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? ((profit / totalCost) * 100) : 0;
    const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100) : 0;

    setResult({
      totalCost,
      totalRevenue,
      roi,
      profit,
      profitMargin
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <CalculatorOutlined style={{ marginRight: '8px' }} />
        ROI计算器
      </Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="输入参数" style={{ height: 'fit-content' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                influencerFee: 0,
                productCost: 0,
                shippingCost: 0,
                platformFee: 0,
                expectedSales: 0,
                averageOrderValue: 0
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="达人费用 (元)"
                    name="influencerFee"
                    rules={[{ required: true, message: '请输入达人费用' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="产品成本 (元)"
                    name="productCost"
                    rules={[{ required: true, message: '请输入产品成本' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="物流成本 (元)"
                    name="shippingCost"
                    rules={[{ required: true, message: '请输入物流成本' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="平台费用 (元)"
                    name="platformFee"
                    rules={[{ required: true, message: '请输入平台费用' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="预期销量 (件)"
                    name="expectedSales"
                    rules={[{ required: true, message: '请输入预期销量' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="平均客单价 (元)"
                    name="averageOrderValue"
                    rules={[{ required: true, message: '请输入平均客单价' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="0"
                      min={0}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  计算ROI
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="计算结果">
            {result ? (
              <div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card size="small">
                      <Text>总成本</Text>
                      <br />
                      <Title level={3} style={{ margin: '8px 0', color: '#ff4d4f' }}>
                        ¥{result.totalCost.toFixed(2)}
                      </Title>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small">
                      <Text>总收入</Text>
                      <br />
                      <Title level={3} style={{ margin: '8px 0', color: '#52c41a' }}>
                        ¥{result.totalRevenue.toFixed(2)}
                      </Title>
                    </Card>
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card size="small">
                      <Text>净利润</Text>
                      <br />
                      <Title level={3} style={{ margin: '8px 0', color: result.profit >= 0 ? '#52c41a' : '#ff4d4f' }}>
                        ¥{result.profit.toFixed(2)}
                      </Title>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small">
                      <Text>利润率</Text>
                      <br />
                      <Title level={3} style={{ margin: '8px 0', color: result.profitMargin >= 0 ? '#52c41a' : '#ff4d4f' }}>
                        {result.profitMargin.toFixed(2)}%
                      </Title>
                    </Card>
                  </Col>
                </Row>

                <Divider />

                <Alert
                  message={`ROI: ${result.roi.toFixed(2)}%`}
                  description={result.roi > 0 ? '项目盈利' : '项目亏损'}
                  type={result.roi > 0 ? 'success' : 'error'}
                  showIcon
                  style={{ marginTop: '16px' }}
                />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Text type="secondary">请输入参数并点击计算按钮</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Calculator; 