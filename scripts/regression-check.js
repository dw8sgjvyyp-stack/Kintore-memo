const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const outputsDir = path.join(root, "outputs");
const distAppPath = path.join(root, "dist", "app.js");
const indexPath = path.join(root, "outputs", "index.html");

let failed = false;

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}

function assert(condition, message) {
  condition ? pass(message) : fail(message);
}

function restoredAppFromChunks() {
  const chunks = fs
    .readdirSync(outputsDir)
    .filter(file => /^app\.gz\.b64\.\d{2}\.txt$/.test(file))
    .sort();
  if (!chunks.length) throw new Error("No encoded app chunks found");
  const encoded = chunks.map(file => fs.readFileSync(path.join(outputsDir, file), "utf8")).join("");
  return zlib.gunzipSync(Buffer.from(encoded.replace(/\s/g, ""), "base64")).toString("utf8");
}

const restoredApp = restoredAppFromChunks();
const hasDistApp = fs.existsSync(distAppPath);
const app = hasDistApp ? fs.readFileSync(distAppPath, "utf8") : restoredApp;
const index = fs.readFileSync(indexPath, "utf8");

assert(!hasDistApp || restoredApp === app, "encoded app chunks restore to dist/app.js");
if (!hasDistApp) pass("dist/app.js is absent; restored chunks were checked directly");

try {
  new vm.Script(restoredApp);
  pass("restored app bundle parses");
} catch (error) {
  fail(`restored app bundle parses: ${error.message}`);
}

assert(app.includes("exerciseCatalogSeeds"), "exercise catalog seed list is bundled");
assert((app.match(/\["[^"]+", "[^"]+", "(?:Push|Pull|Legs|Core|Cardio|Other)"\]/g) || []).length >= 55, "exercise catalog has expanded body-part and training-type seeds");
assert(app.includes("bodyPartCategories"), "bodyPart categories exist");
assert(app.includes("trainingTypeCategories"), "trainingType categories exist");
assert(app.includes("trainingType:"), "exercise templates carry trainingType");
assert(app.includes("allExerciseTemplates"), "exercise pickers can use catalog plus saved templates");
assert(app.includes("filter-sheet-exercise-type"), "exercise change sheet has training type filters");
assert(app.includes("filter-session-exercise-type"), "exercise add sheet has training type filters");
assert(app.includes("filter-menu-exercise-type"), "menu exercise catalog has training type filters");
assert(app.includes("history-body-chip"), "history body-part filters are present");
assert(app.includes("bodyPartVolumeRows"), "analytics body-part volume rows are present");
assert(app.includes("workoutBodyPart(workout)"), "history/analytics resolve workout body parts from existing data");
assert(app.includes("JSONインポート確認"), "JSON restore confirmation UI is present");
assert(app.includes("confirmRestoreJson"), "JSON restore requires explicit confirmation");
assert(app.includes("activeWorkoutSession"), "active workout session support is present");
assert(app.includes("recordDrafts[ex.sessionExerciseId]"), "record drafts remain keyed by session exercise id");
assert(app.includes("sets,"), "saved workout objects keep a sets field");
assert(app.includes("draftSetsToSavedSets"), "workout sets are still normalized before save");
assert(app.includes("renderHistory") && app.includes("renderCalendarCard") && app.includes("renderAnalytics"), "history calendar analytics routes are bundled");
assert(index.includes('data-route="history"'), "bottom history tab opens the history route");
assert(!index.includes('data-route="calendar" type="button"><span>▤</span><b>履歴</b>'), "bottom history tab no longer uses the calendar route");

if (failed) process.exit(1);
