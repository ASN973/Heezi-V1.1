import practiceToolsConstants from "@/constants/practiceToolsConstants";
import sectionButtons from "@/constants/sectionButtons";
import useCompletedLevelsStore from "@/store/useCompletedLevels";

import { useLocalSearchParams } from "expo-router";

export default function usePracticeToolConstants() {
  const { practiceTool } =
    useLocalSearchParams<{ practiceTool }>() || "spreadsheet";
  const { spreadSheetProgress, textEditorProgress } = useCompletedLevelsStore();
  const toolConstants =
    practiceToolsConstants[practiceTool as keyof typeof practiceToolsConstants];
  const toolSectionButtons =
    sectionButtons[practiceTool as keyof typeof sectionButtons];
  const { levelsCompleted } = useCompletedLevelsStore();
  const toolLevelsCompleted =
    levelsCompleted[practiceTool as keyof typeof levelsCompleted];
  const toolProgress =
    practiceTool === "spreadsheet" ? spreadSheetProgress : textEditorProgress;
  return {
    practiceTool,
    toolConstants,
    toolSectionButtons,
    toolLevelsCompleted,
    toolProgress,
  };
}
