import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { rangeToCells } from "@/utils/spreadsheetUtils";

export default function useExportSpreadsheetValues() {
  // useLoadSpreadsheet();
  const {
    spreadsheetData: { cellsValues, cellsStyles },
  } = useSpreadsheetStore();

  const col1 = rangeToCells("A2:A7");
  const col2 = rangeToCells("B2:B7");
  const col1Values = col1.map((cell) => cellsValues[cell]);
  const col2Values = col2.map((cell) => cellsValues[cell]);
  const cellsIndices = [
    ["A1", "B1"],
    ["A2", "B2"],
    ["A3", "B3"],
    ["A4", "B4"],
    ["A5", "B5"],
    ["A6", "B6"],
    ["A7", "B7"],
  ];
  const cellsContents = cellsIndices.map((cellsRow) =>
    cellsRow.map((cell) => {
      return { value: cellsValues[cell], style: cellsStyles?.[cell] || {} };
    })
  );
  return { col1Values, col2Values, cellsIndices, contents: cellsContents };
}
