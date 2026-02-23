import useSpreadsheetStore from "@/store/useSpreadsheetStore";

export default function useCheckSpreadsheetCondition({
  stepExpectedRef,
}: {
  stepExpectedRef: any;
}) {
  const { spreadsheetData } = useSpreadsheetStore();
  const cellsValues = spreadsheetData?.cellsValues;
  const cellsSelected = spreadsheetData?.cellsSelected;
  const cellsStyles = spreadsheetData?.cellsStyles;

  return () => {
    switch (stepExpectedRef.current.type) {
      case "cellValue":
        const currentValue = cellsValues?.[stepExpectedRef.current.cell];
        return currentValue == stepExpectedRef.current.value;
      case "cellSelected":
        return cellsSelected?.includes(stepExpectedRef.current.cell);
      case "cellStyle":
        return (
          JSON.stringify(cellsStyles?.[stepExpectedRef.current.cell]) ===
          JSON.stringify(stepExpectedRef.current.style)
        );
    }
  };
}
