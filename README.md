# はじめての Web アプリ
### 〆 Today’s wrap (YYYY-MM-DD)
- 環境停止：`docker-compose down`
- コード保存＆プッシュ済み
- 明日やること：フロント実装 → `/chat` 連携

📅 今日やったこと (2025-05-11)
Docker Compose & Dev Container で開発環境構築完了

index.js に OpenAI 呼び出し＋ログ保存機能実装

スタブ応答（APIキーなし時のダミー応答）を追加

シンプルなチャットUI (public/index.html + public/app.js) 実装

.gitignore を整備し不要ファイルを除外

変更を Git コミット＆プッシュ

🔜 明日やること
本物の OpenAI（GPTモデル）呼び出しに切り替え

モデル切り替え機能（環境変数 LLM_PROVIDER）を追加

RAG対応：pgvector によるベクトル検索

UI 改善：TailwindCSS導入、チャットバブル化、ローディング表示
