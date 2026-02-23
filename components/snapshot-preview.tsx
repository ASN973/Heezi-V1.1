import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import SpreadsheetResultSnapshot from "./spreadsheet-result-snapshot";
import TextEditorResultSnapshot from "./text-editor-result-snapshot";

export default function SnapshotPreview() {
  const { practiceTool } = useLocalSearchParams();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <View style={styles.box}>
          {practiceTool === "spreadsheet" ? (
            <SpreadsheetResultSnapshot />
          ) : practiceTool === "textEditor" ? (
            <TextEditorResultSnapshot />
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingLeft: 4,
    paddingRight: 16,
  },
  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
