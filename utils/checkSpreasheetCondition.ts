export default function checkSpreasheetCondition(
  expected: any,
  spreadsheetData: any
) {
  if (!expected || !expected.type) {
    return false;
  }
  
  switch (expected.type) {
    case "cellValue":
      const cellsValues = spreadsheetData?.cellsValues;
      const currentValue = cellsValues?.[expected.cell];

      return currentValue === expected.value;
    case "cellSelected":
      const cellsSelected = spreadsheetData?.cellsSelected;
      return cellsSelected?.includes(expected.cell);
    case "cellStyle":
      const cellsStyles = spreadsheetData?.cellsStyles;
      return (
        JSON.stringify(cellsStyles?.[expected.cell]) ===
        JSON.stringify(expected.style)
      );
  }

  return false;
}
