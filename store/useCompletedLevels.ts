import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type PersistFn = typeof import("zustand/middleware").persist;
type CreateJSONStorageFn =
  typeof import("zustand/middleware").createJSONStorage;

const { persist, createJSONStorage } = require("zustand/middleware") as {
  persist: PersistFn; 
  // Fonction qui va enregistrer des données sur l'appareil de l'utilisateur
  createJSONStorage: CreateJSONStorageFn;
};
// store : permet d'avoir des variables globales sur tt toute l'application
type PracticeTool = "spreadsheet" | "textEditor";

interface CompletedLevelsState {
  levelsCompleted: Record<PracticeTool, Record<string, boolean>>;
  setLevelCompleted: (level: string, practiceTool: PracticeTool) => void;
  spreadSheetProgress: number;
  textEditorProgress: number;
  totalProgress: number;
}

const getPercentage = (levelsCompleted: Record<string, boolean>) =>
  (Object.values(levelsCompleted).filter(Boolean).length /
    Object.values(levelsCompleted).length) *
  100;

const initialLevelsCompleted = {
  spreadsheet: { 1: false, 2: false, 3: false },
  textEditor: { 1: false, 2: false, 3: false },
};

const useCompletedLevelsStore = create<CompletedLevelsState>()(
  persist(
    (set, get) => ({
      levelsCompleted: initialLevelsCompleted,
      spreadSheetProgress: getPercentage(initialLevelsCompleted.spreadsheet),
      textEditorProgress: getPercentage(initialLevelsCompleted.textEditor),
      totalProgress:
        (getPercentage(initialLevelsCompleted.spreadsheet) +
          getPercentage(initialLevelsCompleted.textEditor)) /
        2,
      setLevelCompleted: (level, practiceTool) => {
        set((state) => {
          const updatedLevelsCompleted = {
            ...state.levelsCompleted,
            [practiceTool]: {
              ...state.levelsCompleted[practiceTool],
              [level]: true,
            },
          };
          return {
            // Prendre le pourcentage de spreadSheetProgress 
            levelsCompleted: updatedLevelsCompleted,
            spreadSheetProgress: getPercentage(
              updatedLevelsCompleted.spreadsheet
            ),
            // Prendre le pourcentage de textEditorProgress
            textEditorProgress: getPercentage(
              updatedLevelsCompleted.textEditor
            ),
            // Prendre le pourcentage du progès total
            totalProgress:
              (getPercentage(updatedLevelsCompleted.spreadsheet) +
                getPercentage(updatedLevelsCompleted.textEditor)) /
              2,
          };
        });
      },
    }),
    {
      name: "completed-levels",
      // Ce que je dois changer
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState: any, currentState: CompletedLevelsState) => {
        const merged = {
          ...currentState,
          ...persistedState,
        };
        // Ensure levelsCompleted exists and has the correct structure
        if (!merged.levelsCompleted) {
          merged.levelsCompleted = initialLevelsCompleted;
        } else {
          merged.levelsCompleted = {
            spreadsheet:
              merged.levelsCompleted.spreadsheet ||
              initialLevelsCompleted.spreadsheet,
            textEditor:
              merged.levelsCompleted.textEditor ||
              initialLevelsCompleted.textEditor,
          };
        }
        // Recalculate progress values from levelsCompleted to ensure they're always correct
        merged.spreadSheetProgress = getPercentage(
          merged.levelsCompleted.spreadsheet
        );
        merged.textEditorProgress = getPercentage(
          merged.levelsCompleted.textEditor
        );
        merged.totalProgress =
          (merged.spreadSheetProgress + merged.textEditorProgress) / 2;
        return merged;
      },
    }
  )
);
export default useCompletedLevelsStore;
