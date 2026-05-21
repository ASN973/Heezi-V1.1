import { create } from "zustand";

// Les deux outils de pratique disponibles dans l'app.
type PracticeTool = "spreadsheet" | "textEditor";

// Structure complète du store
interface CompletedLevelsState {
  levelsCompleted: Record<PracticeTool, Record<string, boolean>>;
  setLevelCompleted: (level: string, practiceTool: PracticeTool) => void;

  // hydrate() est appelé une seule fois au démarrage par useLevelSync.
  // Il remplace l'état initial par les vraies données venant de Firestore.
  hydrate: (levelsCompleted: Record<PracticeTool, Record<string, boolean>>) => void;

  spreadSheetProgress: number;
  textEditorProgress: number;
  totalProgress: number;
}

// Calcule le % de niveaux complétés pour un outil donné.
// Ex : { "1": true, "2": false, "3": true } → 66.67
const getPercentage = (levelsCompleted: Record<string, boolean>): number => {
  const values = Object.values(levelsCompleted);
  if (values.length === 0) return 0;
  return (values.filter(Boolean).length / values.length) * 100;
};

// État de départ : aucun niveau complété.
// Utilisé à l'initialisation ET comme fallback dans hydrate().
const initialLevelsCompleted = {
  spreadsheet: { 1: false, 2: false, 3: false },
  textEditor: { 1: false, 2: false, 3: false },
};

// Recalcule les 3 pourcentages à partir de levelsCompleted.
// Factorisé ici pour éviter la répétition dans set() et hydrate().
const computeProgress = (
  levelsCompleted: Record<PracticeTool, Record<string, boolean>>
) => ({
  spreadSheetProgress: getPercentage(levelsCompleted.spreadsheet),
  textEditorProgress: getPercentage(levelsCompleted.textEditor),
  totalProgress:
    (getPercentage(levelsCompleted.spreadsheet) +
      getPercentage(levelsCompleted.textEditor)) /
    2,
});

const useCompletedLevelsStore = create<CompletedLevelsState>()((set) => ({
  // --- État initial ---
  levelsCompleted: initialLevelsCompleted,
  ...computeProgress(initialLevelsCompleted),

  // --- hydrate() ---
  // Injecte les données Firestore dans le store au démarrage.
  // Imagine un réveil qu'on met à l'heure juste après l'avoir allumé.
  hydrate: (levelsCompleted) => {
    const safelevelsCompleted = {
      spreadsheet:
        levelsCompleted?.spreadsheet ?? initialLevelsCompleted.spreadsheet,
      textEditor:
        levelsCompleted?.textEditor ?? initialLevelsCompleted.textEditor,
    };
    set({
      levelsCompleted: safelevelsCompleted,
      ...computeProgress(safelevelsCompleted),
    });
  },

  // --- setLevelCompleted() ---
  // Coche un niveau comme terminé et recalcule les pourcentages.
  // Appelé par le composant quiz quand l'élève finit un niveau.
  // Note : syncToFirestore est appelé depuis le composant/hook appelant,
  // pas ici, pour garder le store découplé de Firebase.
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
        levelsCompleted: updatedLevelsCompleted,
        ...computeProgress(updatedLevelsCompleted),
      };
    });
  },
}));

export default useCompletedLevelsStore;
export type { PracticeTool };
