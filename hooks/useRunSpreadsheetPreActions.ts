import useSpreadsheetStore from "@/store/useSpreadsheetStore";

export default function useRunSpreadsheetPreActions() {
  const { setCellValue, setCellsSelected, setCellStyle } =
    useSpreadsheetStore();

  const runPreAction = (preAction: any) => {
    switch (preAction.type) {
      case "cellValue":
        setCellValue(preAction.cell, preAction.value);
        break;
      case "select":
        setCellsSelected(preAction.cells);
        break;
      case "cellStyle":
        setCellStyle(preAction.cell, preAction.style);
        break;
    }
  };
  return (preActionsArr) => preActionsArr.map(runPreAction);
}
