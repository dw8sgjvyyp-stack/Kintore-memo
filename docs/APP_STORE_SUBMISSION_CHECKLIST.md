# App Store 提出前チェックリスト

最終更新日: 2026-08-30

この文書は、筋トレMEMOをApp Store Connectへ登録し、TestFlightまたはApp Reviewへ進める前の確認項目です。今回はArchiveとUploadの手順整理までで、実際のUploadや審査提出は行いません。

## 1. Apple Developer Program

- Apple Developer Programに登録済みであること
- App Store Connectへアクセスできること
- Account Holder / Admin / App Manager / Developer など、必要な権限があること
- 最新の契約、税金、銀行、コンプライアンス関連の未処理項目がないこと

## 2. App Store Connect 新規App作成

- Platform: iOS
- App Name: 筋トレMEMO
- Primary Language: Japanese
- Bundle ID: com.sion.kintorememo
- SKU: 任意の一意な管理用IDを設定する
- User Access: 必要に応じて設定する

## 3. Xcode / iOSビルド設定

- Display Name: 筋トレMEMO
- Bundle Identifier: com.sion.kintorememo
- Version: 1.0.0
- Build: 1
- Target Device: iPhone
- Orientation: Portrait
- Signing: Automatic signing
- Team: Xcodeで使用するApple Developer Teamを選択済みであること
- Capacitor webDir: dist

## 4. App Icon

現在の配置先:

```text
ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png
```

提出前の必要条件:

- 1024 x 1024 px
- PNG
- 正方形
- 不透明背景
- 透明背景なし
- 画像側で角丸を付けない
- ダークネイビーと赤アクセントに合う正式デザイン

現在の状態:

- 1024 x 1024 px
- アルファなし
- ただしCapacitorデフォルト画像のため、正式提出前に差し替え必須

## 5. App Store 商品ページ

- Subtitle: `迷わず続ける筋トレ記録`
- Category: Health & Fitness
- Description: `docs/APP_STORE_METADATA.md` の案をもとに登録
- Keywords: `筋トレ,記録,ジム,体重,睡眠,セット,ワークアウト,分析`
- Promotional Text: 必要に応じて `docs/APP_STORE_METADATA.md` の案を使用
- Copyright: 公開者名と年を設定する
- Support URL: 公開済みサポートページURLを設定する
- Privacy Policy URL: 公開済みプライバシーポリシーURLを設定する
- Marketing URL: 任意

## 6. Privacy / Age Rating

- Privacy Policy: `docs/PRIVACY_POLICY.md` をWebページとして公開する
- App Privacy: `docs/APP_STORE_PRIVACY.md` を見ながら回答する
- Age Rating: `docs/AGE_RATING.md` を見ながら回答する
- Firebase同期は任意機能として説明する
- 広告、トラッキング、HealthKit、Push通知、課金、Apple Sign Inは現在未使用

## 7. Screenshots

`docs/APP_STORE_SCREENSHOTS.md` の候補から5から7枚を撮影する。

推奨候補:

1. ホーム / トレーニング開始
2. トレーニング記録
3. セット入力Bottom Sheet
4. 履歴カレンダー
5. 履歴詳細
6. 体重グラフ
7. トレーニング分析

注意:

- 個人情報やFirebase設定JSONを映さない
- デモデータ入りの状態で撮影する
- iPhone Portraitで撮影する

## 8. Export Compliance

App Store Connectで暗号利用に関する質問に回答する。

現状のアプリは、独自暗号、課金、HealthKit、ログインを実装していません。ただしFirebase同期を使う場合はHTTPS通信やApple標準の通信経路を利用するため、App Store Connectの質問に沿って最終判断してください。

## 9. Content Rights

現在のアプリは、ユーザーが入力したトレーニング記録、自作メニュー、自作種目、メモを扱います。第三者コンテンツ配信は確認できません。

App Icon、スクリーンショット、説明文、サポートページに第三者の画像・商標・素材を入れる場合は、利用権限を確認してください。

## 10. Archive前のローカル確認

以下を順番に実行する。

```bash
node scripts/build.js
npx cap sync ios
node scripts/regression-check.js
```

Xcodeで以下を確認する。

- Scheme: App
- Build Configuration: Release
- Destination: Any iOS Device (arm64)
- Signing Team
- Bundle Identifier
- Version / Build
- App Icon
- Launch Screen

## 11. Xcode Archive手順

1. Xcodeで `ios/App/App.xcodeproj` を開く。
2. Schemeを `App` にする。
3. 実行先を `Any iOS Device (arm64)` にする。
4. `Product` > `Clean Build Folder` を実行する。
5. `Product` > `Archive` を実行する。
6. Organizerが開いたら、最新Archiveを選択する。
7. `Distribute App` を押す。
8. `App Store Connect` を選ぶ。
9. `Upload` を選ぶ。
10. 署名、App Storeアイコン、Privacy Manifest、Export Complianceの警告を確認する。
11. 問題なければUploadする。

今回のPhase 3では、ここまでの手順を整理するだけで、Uploadは行わない。

## 12. Build選択

Upload後、App Store Connectでビルド処理が完了するまで待つ。処理が完了したら、TestFlightまたはApp Review提出画面でBuildを選択する。

## 13. 参考

- App Store Connect App Information: https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/
- Upload Builds: https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/
- Export Compliance: https://developer.apple.com/help/app-store-connect/manage-app-information/overview-of-export-compliance/
- Screenshot Specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
