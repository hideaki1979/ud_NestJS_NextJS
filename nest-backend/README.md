# TaskManager Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">TaskManager バックエンド API - NestJS で構築されたセキュアなタスク管理システム</p>

## 概要

TaskManager Backend は、モダンなタスク管理アプリケーションのための RESTful API です。NestJS フレームワークを使用して構築され、JWT 認証、CSRF 保護、型安全性を重視したアーキテクチャを提供します。PostgreSQL データベースと Prisma ORM を活用し、スケーラブルで保守性の高いバックエンドシステムを実現しています。

## 機能

### 🔐 認証機能 (Auth)

- **ユーザー登録**: 安全なパスワードハッシュ化による新規ユーザー作成
- **ログイン**: JWT トークンベースの認証システム
- **ログアウト**: セキュアなセッション終了
- **CSRF 保護**: Cross-Site Request Forgery 攻撃からの保護
- **Cookie ベース認証**: HttpOnly クッキーによるトークン管理

### ✅ タスク管理機能 (Todo)

- **タスク一覧取得**: ユーザー固有のタスク一覧を作成日時順で取得
- **タスク詳細取得**: 特定タスクの詳細情報取得
- **タスク作成**: タイトルと説明を含む新規タスク作成
- **タスク更新**: 既存タスクの部分更新
- **タスク削除**: 安全なタスク削除（権限チェック付き）

### 👤 ユーザー管理機能 (User)

- **ユーザー情報取得**: 認証済みユーザーの情報取得
- **プロフィール更新**: ニックネームの更新

## 技術スタック

| カテゴリ             | 技術・ライブラリ                                                                                                                                                  | バージョン      | 用途                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------- |
| **言語**             | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20"/> TypeScript                              | 5.7.3           | 型安全性の確保               |
| **フレームワーク**   | <img src="https://nestjs.com/img/logo-small.svg" width="20" height="20"/> NestJS                                                                                  | 11.0.1          | モジュラーなバックエンド構築 |
| **データベース**     | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="20" height="20"/> PostgreSQL                              | 16.x            | リレーショナルデータ管理     |
| **ORM**              | <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" width="20" height="20"/> Prisma                                                             | 6.13.0          | 型安全なデータベースアクセス |
| **認証**             | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" height="20"/> JWT + Passport (@nestjs/jwt / @nestjs/passport) | 10.3.0 / 10.0.3 | セキュアな認証システム       |
| **パスワード暗号化** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" height="20"/> bcrypt                                          | 6.0.0           | パスワードハッシュ化         |
| **バリデーション**   | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20"/> class-validator                         | 0.14.2          | 入力データ検証               |
| **セキュリティ**     | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" height="20"/> csrf-csrf                                       | 4.0.3           | CSRF 攻撃防止                |
| **テスト**           | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="20" height="20"/> Jest                                                   | 29.7.0          | 単体・統合テスト             |

## API エンドポイント

### 認証 (Auth)

```
GET  /auth/csrf-token    # CSRF トークン取得
POST /auth/signup        # ユーザー登録
POST /auth/login         # ログイン
POST /auth/logout        # ログアウト
```

### タスク管理 (Todo) - 🔒 認証必須

```
GET    /todo           # タスク一覧取得
GET    /todo/:id       # タスク詳細取得
POST   /todo           # タスク作成
PATCH  /todo/:id       # タスク更新
DELETE /todo/:id       # タスク削除
```

### ユーザー管理 (User) - 🔒 認証必須

```
GET   /user            # ユーザー情報取得
PATCH /user            # ユーザー情報更新
```

## 処理フロー

```mermaid
%%{init: {"theme":"default"}}%%
sequenceDiagram
    participant C as Client
    participant A as Auth Controller
    participant T as Todo Controller
    participant U as User Controller
    participant S as Services
    participant DB as PostgreSQL

    Note over C,DB: 1. 認証フロー
    C->>A: POST /auth/signup (email, password)
    A->>S: AuthService.signUp()
    S->>DB: ユーザー作成 (bcrypt)
    DB-->>S: ユーザー情報
    S-->>A: 成功メッセージ
    A-->>C: 201 Created

    C->>A: POST /auth/login (email, password)
    A->>S: AuthService.login()
    S->>DB: ユーザー検証
    DB-->>S: ユーザー情報
    S->>S: パスワード照合 (bcrypt)
    S->>S: JWT トークン生成
    S-->>A: JWT トークン
    A->>A: HttpOnly クッキー設定
    A-->>C: 200 OK + クッキー

    Note over C,DB: 2. タスク管理フロー
    C->>T: GET /todo (with JWT cookie)
    T->>T: JWT 認証 (Passport)
    T->>S: TodoService.getTasks(userId)
    S->>DB: SELECT tasks WHERE userId
    DB-->>S: タスク一覧
    S-->>T: タスク配列
    T-->>C: 200 OK + tasks[]

    C->>T: POST /todo (title, description)
    T->>T: バリデーション (class-validator)
    T->>S: TodoService.createTask()
    S->>DB: INSERT task
    DB-->>S: 新規タスク
    S-->>T: タスク情報
    T-->>C: 201 Created + task

    C->>T: PATCH /todo/:id (updates)
    T->>S: TodoService.updateTaskById()
    S->>DB: トランザクション開始
    S->>DB: 権限チェック (userId)
    S->>DB: UPDATE task
    DB-->>S: 更新されたタスク
    S-->>T: タスク情報
    T-->>C: 200 OK + updated task

    Note over C,DB: 3. ユーザー管理フロー
    C->>U: GET /user (with JWT cookie)
    U->>U: JWT 認証
    U-->>C: 200 OK + user info

    C->>U: PATCH /user (nickname)
    U->>S: UserService.updateUser()
    S->>DB: UPDATE user
    DB-->>S: 更新されたユーザー
    S-->>U: ユーザー情報
    U-->>C: 200 OK + updated user
```

## データベーススキーマ

```mermaid
%%{init: {"theme":"default"}}%%
erDiagram
    User {
        int id PK
        string email UK
        string hashedPassword
        string nickname
        datetime createdAt
        datetime updatedAt
    }

    Task {
        int id PK
        string title
        string description
        datetime createdAt
        datetime updatedAt
        int userId FK
    }

    User ||--o{ Task : "1対多"
```

## 環境構築手順

### 前提条件

- Node.js (v18 以上)
- Yarn
- PostgreSQL
- Docker (オプション)

### 1. プロジェクトセットアップ

```bash
# 依存関係のインストール
$ yarn install

# 環境変数の設定
$ cp .env.example .env
```

### 2. 環境変数設定

`.env` ファイルに以下の設定を追加：

```bash
# データベース接続
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanager"

# JWT 設定
JWT_SECRET="your-super-strong-jwt-secret-key-for-production"

# 環境設定
NODE_ENV="development"
```

### 3. データベースセットアップ

```bash
# Docker で PostgreSQL を起動（オプション）
$ docker-compose up -d

# Prisma マイグレーション実行
$ npx prisma migrate deploy

# Prisma Client 生成
$ npx prisma generate
```

### 4. アプリケーション起動

```bash
# 開発モード
$ yarn start:dev

# 本番モード
$ yarn build
$ yarn start:prod
```

### 5. テスト実行

```bash
# 単体テスト
$ yarn test

# E2E テスト
$ yarn test:e2e

# テストカバレッジ
$ yarn test:cov
```

## 開発コマンド

```bash
# 開発サーバー起動（ホットリロード）
$ yarn start:dev

# ビルド
$ yarn build

# リンター実行
$ yarn lint

# フォーマッター実行
$ yarn format

# Prisma Studio（GUI）起動
$ npx prisma studio
```

## セキュリティ機能

- 🔐 **JWT 認証**: ステートレスな認証システム
- 🍪 **HttpOnly クッキー**: XSS 攻撃からトークンを保護
- 🛡️ **CSRF 保護**: Cross-Site Request Forgery 防止
- 🔒 **bcrypt ハッシュ化**: 安全なパスワード保存
- ✅ **入力バリデーション**: 不正データの検証・拒否
- 🔄 **トランザクション**: データ整合性の保証

## ライセンス

このプロジェクトは **MIT ライセンス** の下で公開されています。
