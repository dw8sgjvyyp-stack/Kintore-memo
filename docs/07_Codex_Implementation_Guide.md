# Project Titan Design Book

## 07 Codex Implementation Guide

## 1. この章の目的

この章では、Codexに Project Titan v2 を実装させる時のルールを決める。

目的は、Codexが勝手に解釈して、画面や機能がバラバラになるのを防ぐことである。

Codexはコードを書く力はあるが、目的や優先順位が曖昧だと、以下の問題が起きる可能性がある。

- 画面が大きすぎる
- スクロールが増える
- 3セット固定になる
- コピー機能が雑になる
- 既存機能を壊す
- UIが統一されない

そのため、Codexには必ずこの `docs` フォルダを基準に実装させる。

---

## 2. Codexが読むべき設計書

Codexは実装前に、以下の順番で読む。

```text
docs/01_Vision.md
docs/02_UX_Flow.md
docs/03_Screen_Design.md
docs/04_Feature_Spec.md
docs/05_Design_System.md
docs/06_Component_Library.md
docs/07_Codex_Implementation_Guide.md
```

特に重要なのは以下。

```text
03_Screen_Design.md
04_Feature_Spec.md
05_Design_System.md
06_Component_Library.md
```

---

## 3. 実装の大原則

Codexは以下を必ず守る。

```text
1. 記録画面を最優先する
2. 3セット固定にしない
3. 前回コピーを強制しない
4. 記録中に戻る操作を強制しない
5. 数字キーボードを使う
6. 画面を縦に長くしすぎない
7. UI部品を共通化する
8. 既存のVercel / Firebase / PWA設定を壊さない
9. 既存データをなるべく壊さない
10. 1回の変更で広範囲を壊さない
```

---

## 4. 実装優先順位

最初から全部作らない。

まずは、アプリの中心である **記録画面** を完成させる。

### Phase 1：記録画面の再設計

```text
1. ジムモード / 記録中画面
2. セット入力UI
3. セット追加・削除
4. 前回記録表示
5. 前回コピー / 空で開始 / セット数だけコピー
6. 重量・回数・メモの個別コピー
7. 数字キーボード
8. 休憩タイマー
```

---

### Phase 2：記録中の変更機能

```text
1. メニュー変更
2. 種目変更
3. 種目追加
4. 種目スキップ
5. 今日だけ / 今後も
6. 終了時の変更確認設定
```

---

### Phase 3：ホーム・メニュー管理

```text
1. ホーム画面整理
2. 今日のおすすめメニュー ON / OFF
3. Push / Pull / Legs / 自作メニュー
4. テンプレート削除
5. 自作メニュー編集
```

---

### Phase 4：体重・睡眠・履歴

```text
1. 体重入力
2. 睡眠入力
3. 履歴
4. 履歴詳細
5. カレンダー
```

---

### Phase 5：分析・設定・同期

```text
1. 分析画面
2. アクセントカラー変更
3. 休憩時間設定
4. Firebase同期
5. JSON / CSVバックアップ
```

---

## 5. 最初にCodexへ依頼する内容

最初のCodex指示は、必ず小さくする。

いきなり全画面を作り直させない。

### 最初の依頼文

```text
docsフォルダ内のProject Titan Design Bookを読んでください。

まずは実装せず、現在のアプリ構成を確認し、
以下を報告してください。

1. 現在の主要ファイル構成
2. 記録画面を担当しているファイル
3. メニュー管理を担当しているファイル
4. データ保存を担当しているファイル
5. Firebase / PWA / Vercel設定に関係するファイル
6. Project Titan v2を実装する時に壊してはいけない部分

まだコード変更はしないでください。
```

---

## 6. 次にCodexへ依頼する内容

構成確認が終わったら、次に小さく実装させる。

### 記録画面v0.1

```text
docs/03_Screen_Design.md
docs/04_Feature_Spec.md
docs/05_Design_System.md
docs/06_Component_Library.md

を基準に、記録画面だけをProject Titan v2のUIへ改良してください。

今回やること：
- セット行をコンパクトにする
- 3セット固定をやめる
- ＋セット追加を実装する
- セット削除を実装する
- 重量と回数は数字キーボードにする
- 前回コピーを強制しないUIにする

今回やらないこと：
- Firebase構成の変更
- ログイン機能の変更
- 分析画面の変更
- ホーム画面の大幅変更
- App全体の作り直し

既存のVercel / PWA設定は壊さないでください。
```

---

## 7. Codexに禁止すること

Codexには以下を禁止する。

```text
全画面を一気に作り直す
既存のFirebase設定を勝手に削除する
PWA設定を消す
Vercel設定を壊す
3セット固定に戻す
日本語キーボードが出る入力欄にする
記録画面をスクロール前提にする
アクセントカラーを全体に使いすぎる
背景色やカード色を勝手に変える
docsの内容と違うUIを勝手に作る
```

---

## 8. UI実装ルール

Codexは `05_Design_System.md` と `06_Component_Library.md` を基準にする。

### CSS変数を使う

可能なら、以下のようにCSS変数化する。

```css
:root {
  --bg: #090F18;
  --card: #111827;
  --card-blue: #111C2D;
  --card-active: #162033;
  --text-main: #F9FAFB;
  --text-sub: #9CA3AF;
  --accent: #EF4444;
  --success: #22C55E;
  --warning: #F59E0B;
  --border: rgba(255, 255, 255, 0.08);
}
```

---

## 9. コンポーネント化ルール

同じUIを何度も直接書かない。

共通化するべきもの：

```text
PrimaryButton
SecondaryButton
DangerButton
Card
SetRow
SetEditPanel
CopyButton
ExerciseTab
BottomSheet
Toast
InputField
QuickStepper
MenuCard
HistoryCard
SettingRow
```

特に重要：

```text
SetRow
SetEditPanel
CopyButton
BottomSheet
```

---

## 10. データ保存ルール

既存データを壊さないことを優先する。

データ構造を変更する場合は、以下を守る。

```text
既存データを読み取れるようにする
古いデータを無視しない
必要なら移行処理を作る
保存形式を勝手に大きく変えない
```

---

## 11. 実装後に確認すること

Codexが変更した後、必ず以下を確認する。

```text
1. アプリが起動するか
2. Vercelで表示できるか
3. PWAが壊れていないか
4. 記録画面が開けるか
5. セット追加ができるか
6. セット削除ができるか
7. 3セット固定になっていないか
8. 重量入力で数字キーボードが出るか
9. 回数入力で数字キーボードが出るか
10. 前回コピーを使わずに開始できるか
11. 画面が縦に長すぎないか
12. 既存データが消えていないか
```

---

## 12. 実装の進め方

今後は以下の流れで進める。

```text
1. 設計書を更新
2. Codexに小さく実装依頼
3. Vercelで確認
4. iPhoneで実機確認
5. 問題点をこのチャットで整理
6. docsを更新
7. 再度Codexに修正依頼
```

---

## 13. コミットルール

Codexには、変更内容が分かるコミットをさせる。

例：

```text
feat: redesign workout logging screen
feat: add flexible set controls
feat: add copy controls for weight reps memo
fix: prevent Japanese keyboard on numeric inputs
docs: update Project Titan design guide
```

大きすぎる変更を1コミットにまとめない。

---

## 14. レビュー基準

実装後のレビューでは、見た目よりもまず使いやすさを確認する。

優先順位：

```text
1. 記録が速いか
2. 入力が面倒ではないか
3. セット追加・削除が自然か
4. 前回コピーを強制していないか
5. スクロールが多すぎないか
6. ボタンが押しやすいか
7. UIが統一されているか
8. 見た目がかっこいいか
```

見た目より、まず記録速度。

---

## 15. Codexへの最重要メッセージ

Codexには、毎回この方針を伝える。

```text
Project Titanは、多機能アプリではなく、
トレーニングを止めない筋トレ記録アプリです。

最優先は、記録の速さ、入力の少なさ、途中変更のしやすさです。

画面を大きくしすぎず、戻る操作を減らし、
ジムで片手で使えるUIにしてください。
```

---

## 16. この章の結論

Codexには、いきなり全部を作らせない。

まずは、以下から小さく実装する。

```text
記録画面
セット入力
コピー機能
セット追加・削除
数字キーボード
```

Project Titan v2 は、既存の `Kintore-memo` を土台にした大幅改良版である。

既存の公開環境や保存設定を壊さず、設計書に従って段階的に作り替える。
