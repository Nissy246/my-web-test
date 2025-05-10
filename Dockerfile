# 1. Node.js公式イメージをベースに
FROM node:18-alpine

RUN apk update && apk add --no-cache git

# 2. 作業ディレクトリを /app に
WORKDIR /app

# 3. 依存関係をコピーしてインストール
COPY package.json package-lock.json* ./
RUN npm install

# 4. アプリコードをコピー
COPY . .

# 5. コンテナ起動時のコマンド
CMD ["npm", "start"]
