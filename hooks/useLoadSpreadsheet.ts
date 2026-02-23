import { levelFiles } from "@/constants/indexLevels";
import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { normalizeRouteParam } from "@/utils/normalizeRouteParam";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function useLoadSpreadsheet() {
  const { practiceTool: practiceToolParam, id: idParam } =
    useLocalSearchParams();
  const practiceTool = normalizeRouteParam(practiceToolParam);
  const id = normalizeRouteParam(idParam);
  const { setLevelData } = useSpreadsheetStore();
  useEffect(() => {
    if (!id || !practiceTool || !setLevelData) {
      return;
    }

    const toolLevels = levelFiles[practiceTool];
    const levelData = toolLevels?.[id];

    if (levelData) {
      setLevelData(levelData);
    }
  }, [practiceTool, id, setLevelData]);
}
