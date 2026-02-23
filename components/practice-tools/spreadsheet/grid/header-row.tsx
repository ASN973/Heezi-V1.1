import useCursor from "@/context/useCursor";
import useHighlight from "@/hooks/useHighlight";
import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { isMobile } from "@/utils/isMobile";
import { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CornerSymbol = () => (
  <View style={styles.rowNumberContainer}>
    <Image
      source={require("@/assets/images/pt024urq_expires_30_days.png")}
      resizeMode={"contain"}
      style={styles.triangleIcon}
    />
  </View>
);

export default function HeaderRow({
  columnsLetters,
}: {
  columnsLetters: string[];
}) {
  const elementId = "headerRow";
  const headerRowRef = useRef<View>(null);
  const { setContentRef } = useCursor();
  const { spreadsheetData } = useSpreadsheetStore();
  const cellsSelected = spreadsheetData?.cellsSelected;
  useEffect(() => {
    if (setContentRef) {
      setContentRef(elementId, headerRowRef);
    }
  }, [setContentRef]);
  const {
    currentStep: { highlight },
  } = useCursor();

  const { isHighlighted } = useHighlight("headerRow");
  const isCellFromColumnSelected = (columnLetter: string) =>
    isHighlighted ||
    cellsSelected?.some((cell) => cell.startsWith(columnLetter));

  return (
    <View ref={headerRowRef} style={[styles.cellsRow]}>
      <CornerSymbol />
      <View style={styles.lettersContainer}>
        {columnsLetters.map((columnLetter, index) => (
          <View
            key={columnLetter}
            style={[
              styles.letterContainer,
              isCellFromColumnSelected(columnLetter) && styles.selectedIndex,
              ,
            ]}
          >
            <Text style={styles.letterText}>{columnLetter}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  lettersContainer: {
    flexDirection: "row",
    gap: 8,
  },
  letterContainer: {
    width: 107,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  letterText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#292929",
    textAlign: "center",
  },
  triangleIcon: {
    width: 24,
    height: 17,
  },
  highlighted: {
    borderColor: "red",
    borderWidth: 6,
    borderStyle: "dotted",
  },
  cellsRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    gap: 8,
    marginLeft: 8,
  },
  rowNumberContainer: {
    width: !isMobile ? 28 : 16,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: !isMobile ? 8 : 4,
  },
  selectedIndex: { backgroundColor: "#A6E9D4" },
});
