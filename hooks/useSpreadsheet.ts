import useSpreadsheetStore from "@/store/useSpreadsheetStore";

export function useSpreadsheetRibbon() {
  const { spreadsheetData, setCellStyle } = useSpreadsheetStore();
  const cellsSelected = spreadsheetData?.cellsSelected;
  const cellsStyles = spreadsheetData?.cellsStyles;

  const isSelectedCellBold =
    (cellsSelected?.[0] !== null &&
      cellsStyles?.[cellsSelected?.[0]]?.fontWeight === "bold") ||
    false;

  return {
    isSelectedCellBold,
    boldSelectedCell: () => {
      if (cellsSelected?.length > 0) {
        setCellStyle(
          cellsSelected?.[0],
          isSelectedCellBold ? { fontWeight: "normal" } : { fontWeight: "bold" }
        );
      }
    },
  };
}
