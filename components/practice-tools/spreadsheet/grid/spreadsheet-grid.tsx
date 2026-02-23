import useCursor from "@/context/useCursor";
import useHighlight from "@/hooks/useHighlight";
import { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Cell from "./cell";
import HeaderRow from "./header-row";

import { COLUMNS, ROWS } from "@/constants/spreadsheetConstants";
import useSpreadsheetStore from "@/store/useSpreadsheetStore";
import { isMobile } from "@/utils/isMobile";

// Row configuration

export default function SpreadsheetGrid() {
  const rowNumberContainerRef = useRef<View>(null);
  const { setContentRef } = useCursor();
  const { height } = useWindowDimensions();
  const { spreadsheetData } = useSpreadsheetStore();
  const cellsSelected = spreadsheetData?.cellsSelected;
  useEffect(() => {
    if (setContentRef) {
      setContentRef("rowNumbersColumn", rowNumberContainerRef);
    }
  }, [setContentRef]);

  const { isHighlighted } = useHighlight("rowNumbersColumn");
  // Calculate max height: window height minus safe area, title bar, ribbon, function bar, and padding
  const scrollViewHeight = height ? Math.max(200, height - 350) : 400;

  const isCellFromRowSelected = (rowNumber: string) =>
    isHighlighted ||
    cellsSelected?.some((cell) => cell.substring(1) === String(rowNumber));

  return (
    <ScrollView
      showsVerticalScrollIndicator
      style={[styles.mainContainer, { height: scrollViewHeight }]}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.scrollViewContentContainer}
    >
      <HeaderRow columnsLetters={COLUMNS} />
      {ROWS.map((item, index) => (
        <View key={item} style={styles.cellsRow}>
          <View ref={rowNumberContainerRef} style={[styles.rowNumberContainer]}>
            <View
              style={[
                styles.rowNumberTextContainer,
                isCellFromRowSelected(item) && styles.selectedIndex,
              ]}
            >
              <Text style={styles.rowNumber}>{item}</Text>
            </View>
          </View>
          {COLUMNS.map((_, colIndex) => (
            <Cell
              key={`${colIndex}-${index}`}
              id={`${String.fromCharCode(65 + colIndex)}${index + 1}`}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1001,
    position: "relative",
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 17,
    marginHorizontal: 8,
  },
  cellsRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    gap: 8,
    marginLeft: 8,
  },
  scrollViewContentContainer: { gap: 8 },
  rowNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#292929",
    textAlign: "center",
  },
  rowNumberContainer: {
    width: !isMobile ? 28 : 16,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: !isMobile ? 8 : 4,
  },
  highlighted: {
    borderColor: "red",
    borderWidth: 6,
    borderStyle: "dotted",
  },
  selectedIndex: { backgroundColor: "#A6E9D4" },
  rowNumberTextContainer: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
