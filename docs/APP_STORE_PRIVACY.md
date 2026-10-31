# App Store Privacy 申告用メモ

最終更新日: 2026-10-30

この文書は、Muscle MemoのApp Store初回リリースについて、App Store ConnectのApp Privacy質問に回答するための整理メモです。

## コード上の確認結果

- 保存先は端末内 `localStorage` の `kintoreMemo.v2`
- トレーニング記録、体重、睡眠、メニュー、種目、メモ、進行中トレーニングは外部サーバーへ送信しない
- 外部サーバーとの同期UI、同期SDK、送受信処理は公開バンドルに含まれない
- JSONバックアップはユーザー操作で端末上にファイルを生成し、自動送信しない
- 広告SDK、トラッキングSDK、アクセス解析SDK、クラッシュ収集SDKは使用しない
- HealthKit、Push通知、Apple Sign In、課金、サブスクリプションは未使用
- CapacitorはローカルのWebアプリをiOS WebViewで実行するために使用

## 端末内で扱うデータ

- Fitness: トレーニング記録、種目、重量、回数、セット、RPE、メニュー
- Healthに該当し得るデータ: 体重、睡眠時間、就寝時刻、起床時刻
- User Content: メモ、自作メニュー名、自作種目名
- アプリ内部状態: 選択中画面、進行中トレーニング、開始日時、最終更新日時
- Settings: テーマ、休憩タイマー、バックアップ日時

これらは端末内だけで処理され、開発者または第三者がアクセス可能なサーバーへ送信されません。Appleの定義では、端末内だけで処理されるデータはApp Privacy上の「収集」には該当しません。

## App Store Connect回答案

初回リリースの実装がこの文書どおりであることを最終確認したうえで、データ収集の質問は「いいえ、このAppからデータを収集しません」を候補とします。

- Data Linked to You: 該当なし
- Data Not Linked to You: 該当なし
- Tracking: なし

Web/PWA版の静的ファイル配信に伴う一般的なホスティングアクセスログは、アプリが入力データを送信する処理とは別です。公開時のVercel等のホスティング設定で独自のアクセス解析を有効にした場合は、別途申告内容を再確認してください。

## 第三者SDK

- Capacitor Core / iOS: ネイティブWebView実行基盤

外部同期、広告、分析、SNS、クラッシュ収集SDKは公開版に含まれません。

## 参考

- Apple App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple Privacy Manifest: https://developer.apple.com/documentation/BundleResources/describing-data-use-in-privacy-manifests
