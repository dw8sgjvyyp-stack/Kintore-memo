# App Store Privacy 申告用メモ

最終更新日: 2026-08-30

この文書は、App Store ConnectのApp Privacy質問に回答するための整理メモです。最終申告では、公開時点の実装、Firebase同期の提供有無、Apple Developer Program上の設定を再確認してください。

## コード上の確認結果

- 主な保存先は `localStorage` の `kintoreMemo.v2`
- Firebase同期は任意で、設定JSONと有効化フラグがない場合は動作しない
- Firebase同期を有効にした場合、Firestoreへ `{ state, updatedAt }` を保存する
- 広告SDK、トラッキングSDK、アクセス解析SDKは確認できない
- Capacitor 8.5.0を使用
- Capacitor iOS / CapacitorCordova には `PrivacyInfo.xcprivacy` が含まれ、現状は収集データなし、トラッキングなしの内容
- HealthKit、Push通知、Apple Sign In、課金、サブスクリプションは未使用

## A. 端末内だけに保存されるデータ

Firebase同期を有効にしない場合、以下は端末内のlocalStorageに保存されます。

- Fitness: トレーニング記録、種目、重量、回数、セット、RPE、メニュー
- Healthに該当し得るデータ: 体重、睡眠時間、就寝時刻、起床時刻
- User Content: メモ、自作メニュー名、自作種目名、任意入力のメモ
- Usage Dataに近い内部状態: 選択中ルート、進行中トレーニング、開始日時、最終更新日時
- Settings: テーマ、休憩タイマー、Firebase設定、バックアップ日時

AppleのApp Privacyでは、端末内だけで処理され、開発者や第三者がアクセスできないデータは「収集」とは別扱いになる可能性があります。ただし最終申告では、Appleの定義に沿って確認してください。

## B. Firebaseを有効にした場合に外部へ送信されるデータ

ユーザーがFirebase同期を有効にした場合、以下のデータがユーザー指定のFirestoreへ送信されます。

- Fitness: トレーニング記録、種目、メニュー、セット内容
- Healthに該当し得るデータ: 体重、睡眠
- User Content: メモ、自作メニュー名、自作種目名
- Settings: Firebase設定を含むアプリ設定
- Usage Dataに近い内部状態: 進行中トレーニング、選択中画面、開始日時、更新日時

利用目的はApp Functionalityです。広告、第三者広告、トラッキング目的では使用しません。

## C. アプリが収集していないデータ

現在のコードでは、以下の収集は確認できません。

- Contact Info: 氏名、メールアドレス、電話番号、住所
- Location: 位置情報
- Contacts: 連絡先
- Photos / Videos / Audio: 写真、動画、音声
- Purchases: 購入履歴
- Advertising Data: 広告データ
- Diagnostics: 独自のクラッシュログ、診断ログ
- Device ID: IDFAなど広告識別子
- Browsing History: アプリ外Web閲覧履歴

## App Store Connectで検討すべき項目

Firebase同期を提供する場合は、少なくとも以下を申告候補として確認してください。

- Fitness: トレーニング記録
- Health: 体重、睡眠
- User Content: メモ、自作メニュー、自作種目
- Usage Data: 進行中状態や画面状態を同期対象に含めるかどうか

「Data Linked to You」は、FirebaseプロジェクトやFirestoreパス、アカウント運用によって判断が変わります。現在のアプリ自体にはログイン機能はありません。

「Tracking」は、現在のコードでは確認できません。

## 第三者SDK

- Capacitor Core / iOS: ネイティブWebView実行基盤
- Firebase Web SDK: Firebase同期が有効な場合のみ、Google CDNから動的import

広告SDK、分析SDK、SNS SDKは確認できません。

## 参考

- Apple App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple Privacy Manifest: https://developer.apple.com/documentation/BundleResources/describing-data-use-in-privacy-manifests
