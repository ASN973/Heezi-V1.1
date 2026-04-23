import { PracticeToolCard } from "@/components/home/practice-tool-card";
import practiceToolsRightPanel from "@/constants/practiceToolRightPanel";
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
  const toolNames = Object.keys(practiceToolsRightPanel);

  return (
    <View style={styles.mainContainer}>
      {toolNames.map((toolName, index) => (
        <View key={index} style={isMobile ? styles.cardWrapper : undefined}>
          <PracticeToolCard
            toolName={toolName as PracticeTool}
            style={styles.cardFill}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: isMobile ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardWrapper: {
    width: "45%",
    margin: 6,
    height: 100,
  },

  cardFill: {
    flex: 1,
    marginTop : 12,
  },
});
