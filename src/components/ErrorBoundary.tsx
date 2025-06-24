import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card style={{ margin: '24px', textAlign: 'center' }}>
          <Space direction="vertical" size="large">
            <ExclamationCircleOutlined style={{ fontSize: '64px', color: '#ff4d4f' }} />
            <div>
              <Title level={3} style={{ color: '#ff4d4f' }}>
                工具加载失败
              </Title>
              <Text type="secondary">
                抱歉，工具加载时出现了错误。请尝试重新加载或联系技术支持。
              </Text>
            </div>
            <Space>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={this.handleReload}
              >
                重新加载
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                返回首页
              </Button>
            </Space>
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details style={{ textAlign: 'left', marginTop: '16px' }}>
                <summary>错误详情</summary>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '12px', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </Space>
        </Card>
      );
    }

    return this.props.children;
  }
}

declare global {
  interface ImportMeta {
    env: {
      MODE: string;
      [key: string]: any;
    };
  }
}

export default ErrorBoundary; 