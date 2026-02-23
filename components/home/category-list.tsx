import { PracticeToolCard } from "@/components/home/practice-tool-card";
import practiceToolsConstants from "@/constants/practiceToolsConstants";
import { PracticeTool } from "@/context/usePracticeTool";
import { isMobile } from "@/utils/isMobile";
import { StyleSheet, View } from "react-native";

export interface CategoryItem {
  title: string;
  backgroundColor: string;
  textColor: string;
  tool: PracticeTool;
}

export function CategoryList() {
  const toolNames = Object.keys(practiceToolsConstants);

  return (
    <View style={styles.mainContainer}>
      {toolNames.map((toolName, index) => (
        <View key={index} style={isMobile ? styles.cardWrapper : undefined}>
          <PracticeToolCard
            toolName={toolName as PracticeTool}
            style={isMobile ? styles.cardFill : undefined}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    gap: 8,
    flexDirection: isMobile ? "row" : "column",
    flex: 1,
    justifyContent: isMobile ? "center" : "flex-start",
  },
  cardWrapper: {
    flex: 1,
    alignSelf: "stretch",
  },
  cardFill: {
    flex: 1,
  },
});
