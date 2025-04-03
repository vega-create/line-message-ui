// send-line.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// 你的 LINE Bot Token（請換成自己的）
const LINE_TOKEN = 'H7gLbnasL+A+fTlfAfdmDxda40JhhkHEQtTLPBKynnSD7ydBj2GVh+3uFGtbj3/D/LOvJL2Y6R7CXJJsGfpOFk73ovA3dX4frlHGXz1beVjJVeCqW0T6c5xbgZlb2RJMx7fmxnbiEEMepSBNd85UEQdB04t89/1O/w1cDnyilFU=';

app.post('/send', async (req, res) => {
  const { date, time, group, message } = req.body;

  if (!date || !time || !group || !message) {
    return res.status(400).json({ error: '請填寫完整資料' });
  }

  const fullMessage = `📅 ${date}\n🕒 ${time}\n👥 群組：${group}\n💬 ${message}`;

  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        messages: [
          {
            type: 'text',
            text: fullMessage,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LINE_TOKEN}`,
        },
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('LINE 傳送失敗：', err.response?.data || err.message);
    res.status(500).json({ error: 'LINE 發送失敗' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 LINE bot server running at http://localhost:${PORT}`);
});
