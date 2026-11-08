[README.md](https://github.com/user-attachments/files/34554859/README.md)
# Wingcraft Website

Independent Software Studio — Built together. Made to last.

静的サイト（HTML / CSS / JavaScript のみ）。ビルド不要で、GitHub Pages にそのまま公開できます。

## VS Codeで動かす

1. VS Code でこのフォルダを開く（ファイル → フォルダーを開く）
2. 拡張機能「Live Server」をインストール
3. `index.html` を右クリック → 「Open with Live Server」
4. ファイルを保存するたびにブラウザが自動で更新されます

## GitHubにプッシュして公開する

1. GitHub で新しいリポジトリ `wingcraft-web` を作成（READMEなしの空のまま）
2. このフォルダのターミナルで:

```
git init
git add .
git commit -m "Initial Wingcraft site"
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/wingcraft-web.git
git push -u origin main
```

3. GitHub のリポジトリで Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `(root)` にして Save
4. 数分後、`https://<あなたのユーザー名>.github.io/wingcraft-web/` で公開されます

注意: 無料プランのGitHub Pagesはパブリックリポジトリが対象です。プライベートのまま公開するには有料プランが必要です。

## 練習課題

- `index.html` の見出しの文言を変えてみる
- `style.css` の `--copper` の色を変えて、全体の印象を確かめる
- `contact.html` のプレースホルダーを実際の連絡先に差し替える（公開前に必ず）
- `about.html` に創業者の名前を入れる
- `script.js` を読んで、言語切り替えの仕組みを説明してみる
- `index.html` をコピーして新しいページを作り、ナビに追加する

## 公開前チェック

- 商標の確認（日本は J-PlatPat、トルコは TÜRKPATENT）
- 実績・お客様の声を載せていないこと
- PCとスマホで全ページを確認
