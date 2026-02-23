import { levelFiles } from "@/constants/indexLevels";
import { normalizeRouteParam } from "@/utils/normalizeRouteParam";
import { useLocalSearchParams } from "expo-router";

const EMPTY_LEVEL_DATA = { tasks: [], character: "" };

export default function useLevelData() {
  const { practiceTool: practiceToolParam, id: idParam } =
    useLocalSearchParams();
  const practiceTool = normalizeRouteParam(practiceToolParam);
  const id = normalizeRouteParam(idParam);

  if (practiceTool && id) {
    return getLevelDataByNumber(practiceTool as string, parseInt(id as string));
  }
  return null;
}

export function getLevelDataByNumber(
  practiceTool: string,
  levelNumber: number
) {
  const toolLevels = levelFiles[practiceTool as string];
  if (!toolLevels) {
    return null;
  }

  return toolLevels[levelNumber.toString()] ?? EMPTY_LEVEL_DATA;
}
