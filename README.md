# Wingscraft Web Studio

[日本語](#日本語) | [English](#english)

---

<a id="日本語"></a>
## 日本語 (Japanese)

東京を拠点とする独立ソフトウェア開発スタジオ「Wingscraft」の公式Webサイトおよび対話型デモシステムです。

### 📁 ディレクトリ構成

```text
wingscraft/
├── index.html           # ホーム
├── services.html        # サービス・参考価格・制作の流れ
├── examples.html        # 制作例・デモ一覧
├── projects.html        # プロダクト構想（Wingscraft Booking）
├── journal.html         # 制作ノート・技術発信
├── about.html           # スタジオ概要・創業者紹介
├── contact.html         # お問い合わせフォーム（下書き自動保存対応）
├── privacy.html         # プライバシーポリシー
├── 404.html             # カスタム404ページ
│
├── sample-coffee.html   # 架空店舗サイトの制作例
├── demo-booking.html    # 予約管理ツールのデモ
├── demo-inquiries.html  # 問い合わせ管理ツールのデモ
│
├── assets/              # ロゴ、ファビコン、OG画像、アプリアイコン
├── scripts/             # 品質管理・フォーマット用スクリプト
│   ├── check.py         # リンク・構文・メタタグ自動テスト
│   └── format.py        # HTML自動インデントフォーマッター
│
├── style.css            # メインスタイルシート（ダークテーマ固定）
├── script.js            # メインスクリプト（言語切替、バックトゥトップ、解析）
├── motion.js            # スクロールアニメーション制御
├── navigation.js        # モバイルメニュー制御
├── contact.js           # お問い合わせ処理・下書き自動保存
├── contact-transport.js # フォーム送信トランスポート
├── site-config.js       # 公開URL・エンドポイント・解析設定
├── site.webmanifest     # PWA（Web App Manifest）
├── sitemap.xml          # 検索エンジン用サイトマップ
├── robots.txt           # クローラー制御設定
├── _headers             # Cloudflare Pages / Netlify 用セキュリティ＆キャッシュヘッダー
└── package.json         # 開発コマンド定義
```

### 🚀 使い方

#### ローカルプレビュー
```bash
npm run dev
# または
python3 -m http.server 3000
```
ブラウザで `http://localhost:3000` を開きます。

#### サイト整合性チェック（リンク切れ・構文・メタタグ）
```bash
npm run check
```

#### HTMLフォーマット整形
```bash
npm run format
```

### ⚙️ 設定変更 (`site-config.js`)
- `formspreeEndpoint`: Formspreeのお問い合わせ受信エンドポイント
- `cloudflareAnalyticsToken`: Cloudflare Web Analyticsのトークン（設定すると自動でクッキーレス解析が有効になります）

---

<a id="english"></a>
## English

The official website and interactive demonstration suite for **Wingscraft**, an independent software development studio based in Tokyo.

### 📁 Project Structure

```text
wingscraft/
├── index.html           # Home page
├── services.html        # Services, pricing estimates, and workflow process
├── examples.html        # Showcase of interactive studies and demos
├── projects.html        # Product concepts (Wingscraft Booking)
├── journal.html         # Studio notes and essays
├── about.html           # Studio philosophy and founder profiles
├── contact.html         # Inquiry form with real-time draft auto-save
├── privacy.html         # Privacy policy
├── 404.html             # Custom branded 404 error page
│
├── sample-coffee.html   # Sample shop website study (Sumi Coffee)
├── demo-booking.html    # Interactive booking desk demonstration
├── demo-inquiries.html  # Interactive inquiry dashboard demonstration
│
├── assets/              # Logo, favicon, Open Graph banners, icons
├── scripts/             # Quality control and utility scripts
│   ├── check.py         # Link validation, schema syntax, and meta tag tester
│   └── format.py        # HTML auto-indentation formatter
│
├── style.css            # Core stylesheet (focused dark theme)
├── script.js            # Main script (bilingual switcher, back-to-top, analytics)
├── motion.js            # Scroll-reveal animations
├── navigation.js        # Mobile disclosure navigation
├── contact.js           # Form handling and draft recovery
├── contact-transport.js # Secure submission transport
├── site-config.js       # Endpoints and configuration parameters
├── site.webmanifest     # Progressive Web App (PWA) manifest
├── sitemap.xml          # Search engine sitemap
├── robots.txt           # Search crawler directives
├── _headers             # Security headers (CSP) and caching policy
└── package.json         # Development scripts and metadata
```

### 🚀 Quick Start

#### Local Development Server
```bash
npm run dev
# or
python3 -m http.server 3000
```
Visit `http://localhost:3000` in your browser.

#### Comprehensive Site Validation
```bash
npm run check
```
Verifies structural tags, Open Graph meta tags, JSON-LD schemas, and internal link integrity.

#### HTML Source Formatting
```bash
npm run format
```

### ⚙️ Configuration (`site-config.js`)
- `formspreeEndpoint`: Formspree endpoint URL for direct web inquiries.
- `cloudflareAnalyticsToken`: Optional token for privacy-first Cloudflare Web Analytics.
