import { useState } from 'react';
import { Input, Button, Card, Typography, message } from 'antd';

const { Title } = Typography;

const SECRET_KEY = 'ttsgoat';
const STORAGE_KEY = 'vv_auth_key';

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === SECRET_KEY;
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (input.trim() === SECRET_KEY) {
        localStorage.setItem(STORAGE_KEY, SECRET_KEY);
        setAuthed(true);
      } else {
        message.error('密钥错误，请重试');
      }
      setLoading(false);
    }, 500);
  };

  if (authed) return <>{children}</>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <Card style={{ minWidth: 340, boxShadow: '0 2px 16px #eee' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>请输入访问密钥</Title>
        <Input.Password
          placeholder="请输入密钥"
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={handleLogin}
          size="large"
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" block size="large" loading={loading} onClick={handleLogin}>
          登录
        </Button>
        <div style={{ marginTop: 16, color: '#888', fontSize: 13, textAlign: 'center' }}>
          仅限公司内部使用，未经授权请勿传播
        </div>
      </Card>
    </div>
  );
};

export default AuthGate; 