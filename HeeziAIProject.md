# Heezi — Project Handoff Summary (AI-readable)

## Project Stack
- **Framework**: Expo Router (file-based routing), React Native, TypeScript
- **Backend**: Firebase Auth + Firestore (NoSQL)
- **State**: Zustand (local cache over Firestore)
- **Navigation**: Dynamic routes e.g. `/mission/[practiceTool]/[levelNumber]`

---

## App Purpose
Heezi is a cross-platform digital literacy practice app. Users complete lessons organized by practice tool (spreadsheet, textEditor) and level number (1, 2, 3). There is a lesson progression system with XP and user levels.

---

## Firestore Structure (final agreed schema)

### /users/{uid}
```
firstName, lastName, email, experience, level, diagnosticResult, updatedAt (Timestamp)
```

### /users/{uid}/lessons/{lessonId}
```
lessonId:     "lesson_spreadsheet_1"   // convention: lesson_{tool}_{number}
tool:         "spreadsheet" | "textEditor"
completed:    boolean
completedAt:  Timestamp                // NOT a string
```

### /lessons/{id}  (catalog — read-only from app)
```
lessonID:       "lesson_spreadsheet_1"
tool:           "spreadsheet" | "textEditor"
difficulty:     number
lessonPath:     "assets/spreadsheet/level1.json"
type:           "quizz"
xpReward:       number
prerequisiteId: "lesson_spreadsheet_1" | null   // ← field to ADD in Firestore
```

**Key rules:**
- `/userLessons` flat collection was replaced by `/users/{uid}/lessons` subcollection
- `completedAt` must be `Timestamp.now()`, NOT a string
- `lessonId` convention is `lesson_{tool}_{levelNumber}` — critical for `extractLevelNumber()`

---

## Architecture: Zustand cache + Firestore source of truth

```
Firestore ──► hydrate() ──► Zustand ──► Components (read)
                                │
              syncToFirestore() ◄── setLevelCompleted() (write)
```

Components (MissionPart, SectionCard) NEVER talk to Firestore directly.
They only read from Zustand. This is intentional and must not change.

---

## Files Created / Modified

### ✅ useCompletedLevelsStore.ts (MODIFIED)
**Location**: `@/store/useCompletedLevels`
**Changes from original:**
- Removed: `persist`, `AsyncStorage`, `require("zustand/middleware")`, `merge()`
- Added: `hydrate()` action, `computeProgress()` helper (factored out)
- `create()` is now bare — no middleware

```ts
type PracticeTool = "spreadsheet" | "textEditor";

interface CompletedLevelsState {
  levelsCompleted: Record<PracticeTool, Record<string, boolean>>;
  setLevelCompleted: (level: string, practiceTool: PracticeTool) => void;
  hydrate: (levelsCompleted: Record<PracticeTool, Record<string, boolean>>) => void;
  spreadSheetProgress: number;
  textEditorProgress: number;
  totalProgress: number;
}

// hydrate() replaces persist/merge — called once at startup by useLevelSync
// setLevelCompleted() unchanged — called by quiz component
// computeProgress() factored helper — avoids repetition
```

### ✅ useLevelSync.ts (NEW)
**Location**: `@/hooks/useLevelSync`
**Two exports:**

1. `useLevelSync` — hook, call ONCE in root layout
   - Reads `/users/{uid}/lessons` on mount
   - Transforms flat Firestore docs → `{ spreadsheet: { 1: true }, textEditor: {} }`
   - Calls `hydrate()` to inject into Zustand
   - Returns `{ status: "idle" | "loading" | "synced" | "error" }`

2. `syncToFirestore(uid, lessonId, tool)` — function, call after `setLevelCompleted()`
   - Writes to `/users/{uid}/lessons/{lessonId}`
   - Uses `setDoc` with `{ merge: true }`
   - Uses `Timestamp.now()` for `completedAt`

```ts
// Key internal function:
const extractLevelNumber = (lessonId: string): number | null => {
  const match = lessonId.match(/_(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};
// "lesson_spreadsheet_1" → 1, "lesson_textEditor_3" → 3
```

### ✅ useNextLesson.ts (NEW)
**Location**: `@/hooks/useNextLesson`
**Returns**: `{ nextLesson: Lesson | null, status }`

Logic:
1. Load all lessons from `/lessons`
2. Build `Set<string>` of completed lessonIDs from Zustand
3. Filter: not completed AND (prerequisiteId is null OR prerequisiteId is in completed set)
4. Sort: by tool priority (spreadsheet=0, textEditor=1) then by difficulty ASC
5. Return first result

```ts
// Tool priority map — extend when adding new tools
const TOOL_PRIORITY: Record<string, number> = {
  spreadsheet: 0,
  textEditor: 1,
};
```

### ✅ usePracticeToolConstants.ts (MODIFIED)
**Location**: `@/hooks/usePracticeToolConstants`
**Changes:**
- Was calling `useCompletedLevelsStore()` twice — fixed to single call
- `toolProgress` was a brittle if/else — replaced with `progressMap` object lookup

```ts
const { spreadSheetProgress, textEditorProgress, levelsCompleted } =
  useCompletedLevelsStore(); // single call

const progressMap: Record<string, number> = {
  spreadsheet: spreadSheetProgress,
  textEditor: textEditorProgress,
};
const toolProgress = progressMap[practiceTool] ?? 0;
```

### ✅ levelFiles.ts (discussed, NOT yet modified)
Currently:
```ts
export const levelFiles = {
  spreadsheet: { 1: require("..."), 2: require("...") },
  textEditor: { 1: require("...") },
  diagnostic: { 1: require("...") },
};
```
Planned change: flatten keys to match `lessonPath` from Firestore:
```ts
export const levelFiles: Record<string, any> = {
  "assets/spreadsheet/level1.json": require("..."),
  // ...
};
// Usage: levelFiles[lesson.lessonPath]
```
⚠️ lessonPath values in Firestore must match require() paths exactly.

---

## Components — NO CHANGES NEEDED

| Component | Why unchanged |
|---|---|
| MissionPart.tsx | reads `levelsCompleted` from Zustand only |
| SectionCard.tsx | reads `toolProgress` from `usePracticeToolConstants` |

`MissionPart` unlock logic (do not change):
```ts
const isPreviousLevelCompleted = levelsCompleted[practiceTool]?.[levelNumber - 1];
const disabled = levelNumber !== 1 && !isPreviousLevelCompleted;
```

---

## Remaining Tasks (checklist)

| # | Task | File |
|---|---|---|
| 1 | ✅ Apply migrated useCompletedLevelsStore | store/useCompletedLevels.ts |
| 2 | Apply useLevelSync in root layout | app/(tabs)/_layout.tsx |
| 3 | Call syncToFirestore after setLevelCompleted | quiz component (not yet seen) |
| 4 | Add prerequisiteId field in /lessons Firestore docs | Firestore console |
| 5 | Rename lessonIds in Firestore to convention | Firestore console |
| 6 | Apply corrected usePracticeToolConstants | hooks/usePracticeToolConstants.ts |
| 7 | Flatten levelFiles to match lessonPath | constants/levelFiles.ts |

---

## Critical Conventions
- `lessonId` format: `lesson_{tool}_{levelNumber}` — e.g. `lesson_spreadsheet_1`
- `prerequisiteId` in `/lessons`: same format or `null`
- `completedAt`: always `Timestamp.now()` — never a string
- All Firestore paths use `/users/{uid}/lessons/` subcollection — NOT flat `/userLessons`
- `syncToFirestore` always uses `{ merge: true }` to avoid overwriting unrelated fields
EOF