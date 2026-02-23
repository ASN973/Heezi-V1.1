import useCursor from "@/context/useCursor";
import useLevelData from "@/hooks/use-level-data";
import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CellTextInput from "./CellTextInput";

export default function Cell({ id }: { id: string }) {
  const { spreadsheetData, setCellsSelected, setCellValue, cellsEnabled } =
    useSpreadsheetStore();
  const { levelType } = useLevelData();
  const { setContentRef, expected, currentStep } = useCursor();
  const [isWrongAnswer, setIsWrongAnswer] = useState(null);
  const cellsValues = spreadsheetData?.cellsValues;
  const cellsSelected = spreadsheetData?.cellsSelected;
  const cellsStyles = spreadsheetData?.cellsStyles;

  const cellRef = useRef<View>(null);

  useEffect(() => {
    if (setContentRef && id) {
      setContentRef(id, cellRef);
    }
  }, [setContentRef, id, cellsEnabled]);

  return (
    <View ref={cellRef}>
      {levelType === "practice" &&
      currentStep.expected?.cell === id &&
      cellsSelected?.includes(id) ? (
        <CellTextInput
          id={id}
          isWrongAnswer={isWrongAnswer}
          setIsWrongAnswer={setIsWrongAnswer}
        />
      ) : (
        <Pressable onPress={() => setCellsSelected([id])}>
          <View
            style={[
              styles.box,
              isWrongAnswer ? { borderColor: "red" } : {},
              cellsSelected?.includes(id) && styles.selectedCell,
            ]}
          >
            <Text style={[cellsStyles?.[id], { fontSize: 16 }]}>
              {cellsValues?.[id] || ""}
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 107,
    height: 34,
    backgroundColor: "#FFFFFF",
    borderColor: "#BDBDBD",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  selectedCell: {
    borderColor: "#249079",
    borderWidth: 3,
  },
});
