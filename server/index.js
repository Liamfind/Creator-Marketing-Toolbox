const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const RAPIDAPI_KEY = '27c16033cbmshb41e0049e725c35p10eac0jsn031a62f1e184'; // 建议用 .env 管理

// 代理接口：通过达人主页链接获取视频
app.get('/api/tiktok-user', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  // 解析主页链接，提取 username
  const match = url.match(/tiktok\.com\/@([\w.]+)/);
  if (!match) return res.status(400).json({ error: 'Invalid TikTok URL' });
  const username = match[1];

  try {
    // 以 Tiktok Scraper by TIKWM 为例，实际API路径和参数请参考你选的API文档
    const response = await axios.get('https://tiktok-scraper7.p.rapidapi.com/user/posts', {
      params: { username, count: 20 },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 