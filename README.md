# Muscle Memo（筋トレMEMO）

トレーニング中の入力を素早く行い、履歴や成長を振り返るための筋トレ記録アプリです。iOSアプリとWeb/PWA版に対応しています。

## 機能

- 端末内保存（localStorage）
- JSONバックアップ / JSON復元
- ホーム / メニュー / 記録 / 履歴・分析 / 体重・睡眠 / カレンダー / 設定
- 部位別の種目管理
- PWA対応
- iPhone / iPad / PC対応

## データの保存

App Store初回リリースでは、トレーニング記録、体重、睡眠、メニュー、設定などのデータを端末内のlocalStorageに保存します。外部サーバーとの同期、広告、アクセス解析、トラッキングは行いません。

機種変更やアプリ削除に備え、設定画面のJSONエクスポートで定期的にバックアップしてください。

## サポートとプライバシー

- [サポート](https://dw8sgjvyyp-stack.github.io/Kintore-memo/support.html)
- [プライバシーポリシー](https://dw8sgjvyyp-stack.github.io/Kintore-memo/privacy.html)

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

保存キーと基本データ構造は既存の `kintoreMemo.v2` を維持しています。既存のトレーニング記録を削除または変換する変更は行いません。
