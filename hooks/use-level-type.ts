import { levelFiles } from "@/constants/indexLevels";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function useLevelData() {
  const { practiceTool, id } = useLocalSearchParams();
  const [levelType, setLevelType] = useState<any>(null);
  useEffect(() => {
    if (id && practiceTool) {
      const levelData = levelFiles[practiceTool][id as string];
      setLevelType(levelData.levelType);
    }
  }, [id, practiceTool]);
  return levelType;
}
