// index.js
const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const { Client } = require('pg');

// .env を読み込む
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// 健康チェック用エンドポイント
app.get('/', (req, res) => {
  res.send('🐋 Server is up!');
});

// チャット用エンドポイント
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body; // [{ role, content }, …]
    // OpenAI クライアント初期化
    const oaConfig = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(oaConfig);

    // Chat Completion を呼び出し
    const aiRes = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages,
    });
    const reply = aiRes.data.choices[0].message.content;

    // PostgreSQL に保存
    const db = new Client({ connectionString: process.env.DATABASE_URL });
    await db.connect();
    await db.query(
      'INSERT INTO chats(user_prompt, bot_reply) VALUES($1, $2)',
      [JSON.stringify(messages), reply]
    );
    await db.end();

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// サーバ起動
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
