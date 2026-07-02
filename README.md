# 筋トレMEMO Pro

Apple純正アプリのように毎日使いやすい筋トレ記録PWAです。

## 機能

- Firebase同期
- JSONバックアップ / JSON復元
- ホーム / メニュー / 記録 / 履歴・分析 / 体重・睡眠 / カレンダー / 設定
- 部位別の種目管理
- PWA対応
- iPhone / iPad / PC対応

## Vercelデプロイ

Vercelでは以下の設定でそのまま公開できます。

- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` に同じ設定を含めています。

## ローカル起動

```bash
npm run start
```

## データ互換性

保存キーと基本データ構造は既存の `kintoreMemo.v2` を維持しています。Firebase設定JSONとFirestoreドキュメントパスは設定画面から登録し、既存の同期フローを壊さないようにしています。
