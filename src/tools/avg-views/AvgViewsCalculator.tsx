import { useState } from 'react';
import { Card, Input, Button, Typography, List, Statistic, message, Space, Tag, Divider } from 'antd';
import { PlayCircleOutlined, LinkOutlined, PushpinOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// mock数据顺序与截图一致
const mockFetchTiktokVideos = async (url: string) => {
  return [
    // 置顶视频（从左到右1,2,3）
    { id: 'p1', title: '置顶视频1', views: 944400, pinned: true },
    { id: 'p2', title: '置顶视频2', views: 5300000, pinned: true },
    { id: 'p3', title: '置顶视频3', views: 2600000, pinned: true },
    // 非置顶视频（从左到右，从上到下）
    { id: '1', title: '视频1', views: 1020, pinned: false },
    { id: '2', title: '视频2', views: 45100, pinned: false },
    { id: '3', title: '视频3', views: 26400, pinned: false },
    { id: '4', title: '视频4', views: 24800, pinned: false },
    { id: '5', title: '视频5', views: 52300, pinned: false },
    { id: '6', title: '视频6', views: 106800, pinned: false },
    { id: '7', title: '视频7', views: 26000, pinned: false },
    { id: '8', title: '视频8', views: 32200, pinned: false },
    { id: '9', title: '视频9', views: 28000, pinned: false },
    { id: '10', title: '视频10', views: 32800, pinned: false },
    { id: '11', title: '视频11', views: 24000, pinned: false },
    { id: '12', title: '视频12', views: 32000, pinned: false },
    { id: '13', title: '视频13', views: 27000, pinned: false },
    { id: '14', title: '视频14', views: 36700, pinned: false },
    { id: '15', title: '视频15', views: 111400, pinned: false },
    { id: '16', title: '视频16', views: 25600, pinned: false },
    { id: '17', title: '视频17', views: 41300, pinned: false },
    { id: '18', title: '视频18', views: 72000, pinned: false },
    { id: '19', title: '视频19', views: 135900, pinned: false },
  ];
};

function getAverage(arr: number[]) {
  if (arr.length === 0) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

const AvgViewsCalculator = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [pinnedVideos, setPinnedVideos] = useState<any[]>([]);
  const [normalVideos, setNormalVideos] = useState<any[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [calcDetail, setCalcDetail] = useState<JSX.Element | null>(null);

  const handleFetch = async () => {
    if (!url.trim()) {
      message.warning('请输入达人主页链接');
      return;
    }
    setLoading(true);
    try {
      // 获取视频数据
      const allVideos = await mockFetchTiktokVideos(url);
      // 分组，顺序严格按mock顺序
      const pinned = allVideos.filter(v => v.pinned).slice(0, 3);
      const normal = allVideos.filter(v => !v.pinned).slice(0, 12); // 取前12条非置顶
      if (normal.length < 3) {
        message.error('有效非置顶视频数不足，无法计算');
        setPinnedVideos(pinned);
        setNormalVideos([]);
        setAverage(null);
        setCalcDetail(null);
        setLoading(false);
        return;
      }
      // 取播放量数组
      const viewsArr = normal.map(v => v.views);
      // 找最大最小值及其视频
      const min = Math.min(...viewsArr);
      const max = Math.max(...viewsArr);
      const minIdx = viewsArr.indexOf(min);
      const maxIdx = viewsArr.indexOf(max);
      const minVideo = normal[minIdx];
      const maxVideo = normal[maxIdx];
      // 去除最大最小
      const validViews = viewsArr.filter(v => v !== min && v !== max);
      // 取平均值
      const avgValue = getAverage(validViews);
      setPinnedVideos(pinned);
      setNormalVideos(normal);
      setAverage(avgValue);
      // 计算过程
      setCalcDetail(
        <div>
          <b>排除值：</b>
          <ul style={{ margin: '8px 0 8px 24px', padding: 0 }}>
            <li>最大值：{maxVideo.title}，播放量 {maxVideo.views.toLocaleString()}</li>
            <li>最小值：{minVideo.title}，播放量 {minVideo.views.toLocaleString()}</li>
          </ul>
          <b>平均值计算：</b><br />
          <span>
            ({validViews.map(v => v.toLocaleString()).join(' + ')}) / 10 = {avgValue.toLocaleString()}
          </span>
        </div>
      );
    } catch (e) {
      message.error('获取数据失败');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        <PlayCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
        达人平均播放量计算器
      </Title>
      <Card style={{ marginBottom: 32 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="请输入Tiktok达人主页链接"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onPressEnter={handleFetch}
            allowClear
            size="large"
          />
          <Button type="primary" loading={loading} onClick={handleFetch} size="large">
            查询
          </Button>
        </Space>
      </Card>
      {(pinnedVideos.length > 0 || normalVideos.length > 0) && (
        <Card style={{ marginBottom: 24 }}>
          {pinnedVideos.length > 0 && (
            <>
              <Title level={4} style={{ marginBottom: 8 }}>
                <PushpinOutlined style={{ color: '#faad14', marginRight: 6 }} />置顶视频（{pinnedVideos.length}）
              </Title>
              <List
                dataSource={pinnedVideos}
                renderItem={(item, idx) => (
                  <List.Item>
                    <Tag color="gold" style={{ marginRight: 8 }}>Pinned</Tag>
                    <Text>{`置顶视频${idx + 1}`}</Text>
                    <Text style={{ float: 'right', color: '#1890ff' }}>{item.views.toLocaleString()}</Text>
                  </List.Item>
                )}
              />
              <Divider />
            </>
          )}
          {normalVideos.length > 0 && (
            <>
              <Title level={4} style={{ marginBottom: 8 }}>非置顶视频（{normalVideos.length}）</Title>
              <List
                dataSource={normalVideos}
                renderItem={(item, idx) => (
                  <List.Item>
                    <Text>{`视频${idx + 1}`}</Text>
                    <Text style={{ float: 'right', color: '#1890ff' }}>{item.views.toLocaleString()}</Text>
                  </List.Item>
                )}
              />
            </>
          )}
        </Card>
      )}
      {average !== null && (
        <Card>
          <Statistic
            title="达人近12条非置顶视频去极值后的平均播放量"
            value={average}
            valueStyle={{ color: '#52c41a', fontWeight: 700 }}
            suffix="次"
          />
          {calcDetail && (
            <div style={{ marginTop: 16, color: '#888', fontSize: 15 }}>
              <b>计算过程：</b><br />
              {calcDetail}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default AvgViewsCalculator; 