# TaskManager Frontend

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="64" height="64" alt="Next.js Logo" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="64" height="64" alt="React Logo" />
</p>

<p align="center">TaskManager フロントエンド - Next.js で構築されたモダンなタスク管理 UI</p>

## 概要

TaskManager Frontend は、直感的で使いやすいタスク管理インターフェースを提供するモダンな Web アプリケーションです。Next.js 15 の App Router と React 19 を使用し、Mantine UI コンポーネントと Tailwind CSS でスタイリングされています。リアルタイムなデータ同期、セキュアな認証、レスポンシブデザインを特徴とし、効率的なタスク管理体験を実現します。

## 機能

### 🔐 認証機能

- **ユーザー登録**: バリデーション付きの新規アカウント作成
- **ログイン**: セキュアな認証システム
- **認証状態管理**: JWT ベースの自動ログイン維持
- **ログアウト**: セキュアなセッション終了
- **エラーハンドリング**: 認証エラーの適切な表示と処理

### ✅ タスク管理機能

- **タスク作成**: タイトルと説明を含む新規タスク作成
- **タスク一覧表示**: ユーザー固有のタスク一覧を時系列順で表示
- **タスク編集**: 既存タスクのインライン編集
- **タスク削除**: 確認ダイアログ付きの安全な削除
- **リアルタイム更新**: Optimistic UI による即座の反映

### 👤 ユーザー管理機能

- **プロフィール表示**: ログイン中のユーザー情報表示
- **アカウント管理**: ユーザー情報の確認

### 🛡️ セキュリティ機能

- **XSS 対策**: DOMPurify による入力サニタイズ
- **入力バリデーション**: フロントエンド・バックエンド両方での検証
- **エラーハンドリング**: セキュリティエラーの適切な処理
- **認証ガード**: 未認証アクセスの自動リダイレクト

## 技術スタック

| カテゴリ               | 技術・ライブラリ                                                                                                                         | バージョン | 用途                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------- |
| **言語**               | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20"/> TypeScript     | 5.x        | 型安全性の確保                         |
| **フレームワーク**     | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="20" height="20"/> Next.js                | 15.4.5     | React ベースのフルスタックフレーム     |
| **ライブラリ**         | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="20" height="20"/> React                    | 19.1.0     | ユーザーインターフェース構築           |
| **UI フレームワーク**  | <img src="https://mantine.dev/favicon.svg" width="20" height="20"/> Mantine                                                              | 8.2.2      | モダンな UI コンポーネント             |
| **CSS フレームワーク** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="20" height="20"/> Tailwind CSS | 4.x        | ユーティリティファーストのスタイリング |
| **状態管理**           | Zustand                                                                                                                                  | 5.0.7      | 軽量な状態管理                         |
| **データフェッチング** | <img src="https://tanstack.com/favicon-32x32.png" width="20" height="20"/> TanStack React Query                                          | 4.x        | サーバー状態管理・キャッシュ           |
| **HTTP クライアント**  | <img src="https://axios-http.com/assets/favicon.ico" width="20" height="20"/> Axios                                                      | 1.11.0     | API 通信                               |
| **フォーム管理**       | <img src="https://mantine.dev/favicon.svg" width="20" height="20"/> Mantine Form                                                         | 8.2.2      | フォームバリデーション・状態管理       |
| **バリデーション**     | Yup                                                                                                                                      | 1.6.1      | スキーマバリデーション                 |
| **セキュリティ**       | DOMPurify                                                                                                                                | 3.2.6      | XSS 攻撃防止                           |
| **アイコン**           | Heroicons                                                                                                                                | 2.2.0      | SVG アイコンライブラリ                 |
| **アイコン**           | Tabler Icons                                                                                                                             | 3.34.1     | 豊富なアイコンセット                   |

## ページ構成

- **`/auth`**: 認証ページ（ログイン・新規登録）
- **`/dashboard`**: メインダッシュボード（タスク管理）
- **`/`**: ホームページ（認証ページへのリダイレクト）

## 処理フロー

```mermaid
%%{init: {"theme":"default"}}%%
sequenceDiagram
    participant U as User
    participant UI as Frontend UI
    participant A as Auth Flow
    participant T as Task Management
    participant API as Backend API
    participant Store as Zustand Store
    participant RQ as React Query

    Note over U,RQ: 1. 認証フロー
    U->>UI: アクセス
    UI->>A: 認証状態チェック
    A->>API: GET /user
    API-->>A: 401 Unauthorized
    A->>UI: 認証ページ表示

    U->>A: ログイン情報入力
    A->>A: フォームバリデーション
    A->>API: POST /auth/login
    API-->>A: JWT Cookie 設定
    A->>UI: ダッシュボードへリダイレクト

    Note over U,RQ: 2. タスク管理フロー
    UI->>RQ: useQueryTasks()
    RQ->>API: GET /todo
    API-->>RQ: タスク一覧
    RQ->>UI: タスク表示

    U->>T: 新規タスク作成
    T->>Store: editedTask 更新
    T->>T: 入力バリデーション・サニタイズ
    T->>RQ: createTaskMutation
    RQ->>API: POST /todo
    API-->>RQ: 新規タスク
    RQ->>RQ: キャッシュ更新
    RQ->>UI: UI 即座に更新

    U->>T: タスク編集
    T->>Store: editedTask 設定
    U->>T: 編集内容入力
    T->>T: DOMPurify サニタイズ
    T->>RQ: updateTaskMutation
    RQ->>API: PATCH /todo/:id
    API-->>RQ: 更新されたタスク
    RQ->>RQ: キャッシュ更新
    RQ->>UI: UI 反映

    U->>T: タスク削除
    T->>T: 確認ダイアログ表示
    U->>T: 削除確認
    T->>RQ: deleteTaskMutation
    RQ->>API: DELETE /todo/:id
    API-->>RQ: 削除成功
    RQ->>RQ: キャッシュから除去
    RQ->>UI: UI から除去

    Note over U,RQ: 3. エラーハンドリング
    RQ->>API: API リクエスト
    API-->>RQ: 401/403 エラー
    RQ->>A: 認証エラーハンドリング
    A->>Store: キャッシュクリア
    A->>UI: 認証ページへリダイレクト
```

## コンポーネント構成

```mermaid
graph TB
    subgraph "Pages"
        AUTH[🔐 /auth]
        DASH[📊 /dashboard]
        HOME[🏠 /]
    end

    subgraph "Layout"
        LAYOUT[📐 RootLayout]
        PROVIDERS[⚡ Providers]
    end

    subgraph "Auth Components"
        ACCOUNT[📝 AccountForm]
        CSRF[🛡️ CsrfProvider]
    end

    subgraph "Dashboard Components"
        DASHBOARD[📊 DashBoard]
        USER[👤 UserInfo]
        TASK_FORM[📝 TaskForm]
        TASK_LIST[📋 TaskList]
        TASK_ITEM[📌 TaskItem]
    end

    subgraph "Hooks"
        QUERY_TASKS[🔄 useQueryTasks]
        QUERY_USER[👤 useQueryUser]
        MUTATE_TASK[✏️ useMutateTask]
    end

    subgraph "Store & Utils"
        STORE[🗃️ Zustand Store]
        SANITIZE[🧹 Sanitize Utils]
        AUTH_UTILS[🔐 Auth Utils]
    end

    HOME --> AUTH
    AUTH --> ACCOUNT
    DASH --> DASHBOARD

    LAYOUT --> PROVIDERS
    PROVIDERS --> CSRF

    DASHBOARD --> USER
    DASHBOARD --> TASK_FORM
    DASHBOARD --> TASK_LIST
    TASK_LIST --> TASK_ITEM

    USER --> QUERY_USER
    TASK_FORM --> MUTATE_TASK
    TASK_FORM --> STORE
    TASK_LIST --> QUERY_TASKS
    TASK_ITEM --> MUTATE_TASK

    TASK_FORM --> SANITIZE
    MUTATE_TASK --> AUTH_UTILS

    style AUTH fill:#f3e5f5,color:#111
    style DASH fill:#f3e5f5,color:#111
    style HOME fill:#f3e5f5,color:#111
    style LAYOUT fill:#e8f5e8,color:#111
    style PROVIDERS fill:#e8f5e8,color:#111
    style ACCOUNT fill:#fff3e0,color:#111
    style CSRF fill:#fff3e0,color:#111
    style DASHBOARD fill:#e1f5fe,color:#111
    style USER fill:#e1f5fe,color:#111
    style TASK_FORM fill:#e1f5fe,color:#111
    style TASK_LIST fill:#e1f5fe,color:#111
    style TASK_ITEM fill:#e1f5fe,color:#111
    style QUERY_TASKS fill:#fce4ec,color:#111
    style QUERY_USER fill:#fce4ec,color:#111
    style MUTATE_TASK fill:#fce4ec,color:#111
    style STORE fill:#f1f8e9,color:#111
    style SANITIZE fill:#f1f8e9,color:#111
    style AUTH_UTILS fill:#f1f8e9,color:#111
```

## 環境構築手順

### 前提条件

- Node.js (v18 以上)
- npm / yarn / pnpm
- バックエンド API が起動していること

### 1. プロジェクトセットアップ

```bash
# 依存関係のインストール
$ npm install
# または
$ yarn install
```

### 2. 環境変数設定

`.env.local` ファイルを作成し、以下の設定を追加：

```bash
# バックエンド API URL
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

### 3. アプリケーション起動

```bash
# 開発サーバー起動
$ npm run dev
# または
$ yarn dev

# 本番ビルド
$ npm run build
$ npm start
```

### 4. アクセス確認

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 開発コマンド

```bash
# 開発サーバー起動（Turbopack 使用）
$ npm run dev

# 本番ビルド
$ npm run build

# 本番サーバー起動
$ npm start

# リンター実行
$ npm run lint
```

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # 認証ページ
│   ├── dashboard/         # ダッシュボードページ
│   ├── globals.css        # グローバルスタイル
│   └── layout.tsx         # ルートレイアウト
├── components/            # UI コンポーネント
│   ├── AccountForm.tsx    # 認証フォーム
│   ├── DashBoard.tsx      # メインダッシュボード
│   ├── TaskForm.tsx       # タスクフォーム
│   ├── TaskList.tsx       # タスク一覧
│   ├── TaskItem.tsx       # タスクアイテム
│   └── UserInfo.tsx       # ユーザー情報
├── hooks/                 # カスタムフック
│   ├── useMutateTask.ts   # タスク変更フック
│   ├── useQueryTasks.ts   # タスク取得フック
│   └── useQueryUser.ts    # ユーザー取得フック
├── store/                 # 状態管理
│   └── store.ts           # Zustand ストア
├── types/                 # 型定義
│   └── index.ts           # 共通型
├── utils/                 # ユーティリティ
│   ├── authUtils.ts       # 認証ユーティリティ
│   └── sanitize.ts        # セキュリティユーティリティ
└── constants/             # 定数
    └── queryKeys.ts       # React Query キー
```

## セキュリティ機能

- 🛡️ **XSS 対策**: DOMPurify による HTML サニタイズ
- ✅ **入力バリデーション**: フロントエンド・バックエンド双方での検証
- 🔐 **認証ガード**: 未認証ユーザーの自動リダイレクト
- 🚫 **CSRF 保護**: バックエンドとの連携による CSRF 対策
- 📝 **型安全性**: TypeScript による実行時エラーの削減

## パフォーマンス最適化

- ⚡ **Turbopack**: 高速な開発サーバー
- 🔄 **React Query**: インテリジェントなキャッシング
- 🎯 **Optimistic Updates**: UI の即座な反映
- 📦 **コード分割**: Next.js による自動最適化
- 🖼️ **画像最適化**: Next.js Image コンポーネント

## ライセンス

このプロジェクトは **MIT ライセンス** の下で公開されています。
