import { levelFiles } from "@/constants/indexLevels";

export interface MissionRouteParams {
  practiceTool: string;
  id: string;
}

export function getMissionStaticParams(): MissionRouteParams[] {
  return Object.entries(levelFiles).flatMap(([practiceTool, levels]) =>
    Object.keys(levels).map((id) => ({
      practiceTool,
      id: id.toString(),
    }))
  );
}
