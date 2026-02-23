import useExportSpreadsheetValues from "@/hooks/useExportSpreadsheetValues";
import { isMobile } from "@/utils/isMobile";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function SpreadsheetResultSnapshot() {
  const { contents: cellsContents } = useExportSpreadsheetValues();
  const [headers, ...entries] = cellsContents;
  // useLoadSpreadsheet();
  return (
    <View style={styles.container}>
      <View style={styles.snapshotBox}>
        <View style={styles.cellsRow}>
          {headers.map((cell, index) => (
            <View key={index} style={[styles.cell, styles.headerCell]}>
              <Text
                style={[
                  { fontSize: 18, fontWeight: "bold" },
                  styles.headerText,
                  cell.style,
                ]}
              >
                {cell.value}
              </Text>
            </View>
          ))}
        </View>

        <FlatList
          style={styles.flatList}
          data={entries}
          renderItem={({ item }) => {
            return (
              <View style={styles.cellsRow}>
                {item.map((cell, index) => {
                  return (
                    <View key={index} style={styles.cell}>
                      <Text
                        style={[
                          { fontSize: 16, lineHeight: 24 },
                          styles.text,
                          cell.style,
                        ]}
                      >
                        {cell.value}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
  },
  snapshotBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: !isMobile ? 32 : 8,
    // borderWidth: 1,
    // borderColor: "black",
  },
  flatList: {
    // borderWidth: 1,
    // borderColor: "green",
  },
  cellGrid: {
    flex: 1,
    borderRadius: 8,
    paddingTop: 32,
    marginTop: 102,
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  cellsRow: {
    marginHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth: 1,
  },
  headerCell: {
    borderWidth: 2,
    borderColor: "black",
  },
  cell: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: isMobile ? "60%" : "40%",
    textAlign: "center",
  },
  headerText: {
    color: "#292929",
    marginBottom: 10,
    marginRight: 25,
  },
  text: {
    color: "#292929",
    marginBottom: 10,
  },
  column: {
    marginHorizontal: 32,
  },
  text3: {
    fontSize: 10,
    lineHeight: 24,
    color: "#292929",
    marginBottom: 10,
  },
});
