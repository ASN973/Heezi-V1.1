import { parseCellsExpressions } from "@/utils/spreadsheetUtils";
import { create } from "zustand";

interface SpreadsheetStore {
  spreadsheetData: {
    cellsValues: { [key: string]: string | undefined };
    cellsSelected: string[];
    cellsStyles?: { [key: string]: any };
    cellsEnabled?: string[];
  };

  tasks: any[];
  setLevelData: (levelData: any) => void;
  setCellValue: (cell: string, value: string) => void;
  setCellsSelected: (cells: string[] | string) => void;
  setCellStyle: (cell: string, style: { [key: string]: any }) => void;
  levelType: string;
}

const getDefaultSpreadsheetData = () => ({
  cellsValues: {},
  cellsSelected: [],
  cellsStyles: {},
  cellsEnabled: [],
});

const useSpreadsheetStore = create<SpreadsheetStore>((set, get) => ({
  spreadsheetData: getDefaultSpreadsheetData(),

  tasks: [],
  levelType: "",
  setLevelData: (levelData: any) => {
    const { spreadsheetData, tasks, levelType, cellsEnabled } = levelData;
    set((state) => ({
      spreadsheetData: spreadsheetData || getDefaultSpreadsheetData(),
      tasks: tasks || [],
      levelType: levelType || "",
      cellsEnabled,
    }));
  },

  setCellValue: (cell: string, value: string) => {
    set((state) => ({
      spreadsheetData: {
        ...(state.spreadsheetData || getDefaultSpreadsheetData()),
        cellsValues: {
          ...(state.spreadsheetData?.cellsValues || {}),
          [cell]: value,
        },
      },
    }));
  },

  setCellStyle: (cell: string, style: { [key: string]: any }) => {
    set((state) => ({
      spreadsheetData: {
        ...(state.spreadsheetData || getDefaultSpreadsheetData()),
        cellsStyles: {
          ...(state.spreadsheetData?.cellsStyles || {}),
          [cell]: style,
        },
      },
    }));
  },

  setCellsSelected: (cells: string[] | string) => {
    set((state) => ({
      spreadsheetData: {
        ...(state.spreadsheetData || getDefaultSpreadsheetData()),
        cellsSelected: parseCellsExpressions(cells),
      },
    }));
  },
}));
export default useSpreadsheetStore;
