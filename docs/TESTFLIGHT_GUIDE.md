# TestFlight 準備ガイド

最終更新日: 2026-08-30

この文書は、筋トレMEMOをTestFlightで確認するための準備ガイドです。今回はTestFlight公開やApp Store ConnectへのUploadは実行しません。

## 1. 前提

- iOSプロジェクトが生成済み
- Bundle ID: com.sion.kintorememo
- Version: 1.0.0
- Build: 1
- Xcodeで実機起動確認済み
- App Store Connectに新規Appを作成できる権限がある
- App Store ConnectへUploadする前に正式App Iconへ差し替える

## 2. Upload後の流れ

1. XcodeのArchiveからApp Store ConnectへUploadする。
2. App Store ConnectのBuild処理が完了するまで待つ。
3. 処理完了メール、またはApp Store ConnectのTestFlightタブで状態を確認する。
4. 必要なExport ComplianceやMissing Complianceが出た場合は回答する。
5. Internal Testing用のグループを作成する。
6. テスターを追加する。
7. 該当Buildを選択する。
8. TestFlightアプリからインストールして実機確認する。

## 3. Internal Testing

- まずはInternal Testingで確認する
- 内部テスターはApp Store Connectユーザーから追加する
- 最初の外部テストはBeta App Reviewが必要になる可能性があるため、内部テストで主要機能を固める

## 4. TestFlightで確認すべき機能

### ホーム

- ホームが表示される
- 今日のおすすめメニューが表示される
- Push / Pull / Legs / 自作メニューから開始できる
- 進行中トレーニングがある場合、再開カードが表示される

### トレーニング記録

- トレーニングを開始できる
- 種目タブを切り替えられる
- 同じ種目名が複数あっても別タブとして扱われる
- セット入力Bottom Sheetが開く
- 重量は数字・小数入力しやすい
- 回数は数字入力しやすい
- セット追加と削除ができる
- 前回コピーができる
- 空で開始できる
- セット数だけコピーできる
- 種目追加、種目変更、スキップができる

### 途中保存 / 再開

- 入力途中でアプリを閉じても進行中トレーニングが残る
- ホームから続きから再開できる
- 選択中種目、種目タブ、入力中セットが復元される
- 進行中トレーニングを破棄できる
- 日付を跨いだ場合、確認シートが表示される
- 前日の記録として保存できる
- 今日の新しいトレーニングと混ざらない

### 保存

- トレーニング終了から保存できる
- 保存後、進行中トレーニングが消える
- 同じトレーニングが二重保存されない
- リロードや再起動後も記録が残る

### 履歴 / カレンダー

- 履歴カードが表示される
- 履歴詳細が開く
- 種目ごとのセット内容が見える
- カレンダーに記録日の印が出る
- 日付タップで当日の記録が見える
- 種目別履歴が開ける

### 分析 / グラフ

- 体重、睡眠、トレーニング量のタブが切り替わる
- 総重量、セット数、レップ数が表示される
- 推定1RMやPRカードが表示される
- 記録が少ない場合でも空状態が崩れない

### 体重 / 睡眠

- 体重を記録できる
- -0.1 / +0.1 が動く
- 睡眠の就寝・起床を入力できる
- 睡眠時間が自動計算される
- 保存後、履歴や分析に反映される

### JSONバックアップ / 復元

- JSONエクスポートができる
- JSONインポート前に確認が出る
- 不正JSONではエラー表示になる
- 復元後もトレーニング記録、metrics、templates、settingsが読み込める

### Firebase任意同期

- Firebase同期を使わない状態でアプリが動作する
- Firebase設定が空でもエラーで止まらない
- Firebase同期を使う場合は、設定JSONとFirestoreパスを入力して個別に確認する

## 5. TestFlight確認時の注意

- 実データを入れる前にJSONバックアップを取る
- スクリーンショット撮影時に個人情報やFirebase設定JSONを映さない
- TestFlightビルドでApp Iconが正式版に差し替わっていることを確認する
- 端末のダークモード / ライトモードで違和感がないか確認する
- iPhoneのDynamic Island、ステータスバー、ホームインジケーターとUIが重ならないか見る

## 6. 外部テストへ進む前の確認

- 内部テストで主要導線が通っている
- Privacy Policy URLとSupport URLが公開済み
- App Privacy回答が実装と一致している
- Age Rating回答が実装と一致している
- Export Complianceの回答が完了している
- App Iconとスクリーンショットが正式版になっている
- Firebase同期の説明が任意機能として正しい

## 7. 参考

- TestFlight Overview: https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/
- Add Internal Testers: https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers/
- App Build Statuses: https://developer.apple.com/help/app-store-connect/reference/app-build-statuses/
