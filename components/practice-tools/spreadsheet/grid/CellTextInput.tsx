import useCursor from "@/context/useCursor";
import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { getCellUnderneath } from "@/utils/spreadsheetUtils";
import { useEffect, useRef } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function CellTextInput({
  id,
  isWrongAnswer,
  setIsWrongAnswer,
}: {
  id: string;
  onBlur: () => void;
}) {
  const { spreadsheetData, setCellValue, cellsEnabled, setCellsSelected } =
    useSpreadsheetStore();
  const { expected } = useCursor();
  const cellsValues = spreadsheetData?.cellsValues;
  const cellsSelected = spreadsheetData?.cellsSelected;
  const cellsStyles = spreadsheetData?.cellsStyles;

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (
      id &&
      cellsSelected?.includes(id) &&
      textInputRef.current &&
      cellsEnabled?.includes(id)
    ) {
      textInputRef.current?.focus();
    }
  }, [cellsSelected, id, cellsEnabled]);

  const handleBlur = () => {
    if (
      expected &&
      expected.type === "cellValue" &&
      expected.cell === id &&
      cellsValues?.[id]?.length &&
      expected?.value &&
      cellsValues?.[id] !== expected.value
    ) {
      setIsWrongAnswer(true);
    } else {
      setIsWrongAnswer(false);
    }
  };

  return (
    <TextInput
      style={[
        styles.selectedBox,
        cellsStyles?.[id],
        isWrongAnswer ? styles.wrongAnswer : styles.selectedCell,
      ]}
      value={cellsValues?.[id] || ""}
      onChangeText={(text) => setCellValue(id, text)}
      ref={textInputRef}
      onSubmitEditing={() => {
        const nextCell = getCellUnderneath(id);
        setCellsSelected([nextCell]);
      }}
      onBlur={handleBlur}
    />
  );
}

const styles = StyleSheet.create({
  selectedBox: {
    width: 107,
    height: 34,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    outlineStyle: "none",
    fontSize: 16,
  },
  wrongAnswer: {
    borderColor: "red",
  },
  selectedCell: {
    borderColor: "#249079",
    borderWidth: 3,
  },
});
