import { ScrollView, StyleSheet, View } from "react-native";
import FunctionBar from "./function-bar";
import SpreadsheetGrid from "./grid/spreadsheet-grid";
import SpreadsheetRibbon from "./spreadsheet-ribbon/spreadsheet-ribbon";
import RibbonTabs from "./spreadsheet-ribbon/spreadsheet-ribbon-tabs";

import MascotMonitor from "@/components/mascot/mascot-monitor";
import useLevelData from "@/hooks/use-level-data";
import { isMobile } from "@/utils/isMobile";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleBar from "../TitleBar";

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  return isMobile ? (
    children
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      style={styles.scrollView}
      contentContainerStyle={styles.scrollBody}
    >
      {children}
    </ScrollView>
  );
};

export default function SpreadsheetScreen({
  runPreActions,
  practiceToolData,
  checkConditionCallback,
}: {
  runPreActions: (preActions: any[]) => void;
  practiceToolData: any;
  checkConditionCallback: (expected: any) => boolean;
}) {
  const { levelType } = useLevelData();
  const isLesson = levelType === "lesson";
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <TitleBar />
        {!isMobile && <RibbonTabs />}
        <SpreadsheetRibbon />
        <FunctionBar />
        <SpreadsheetGrid />
        {isLesson && <View style={styles.overlay} />}
      </View>

      <MascotMonitor
        runPreActions={runPreActions}
        practiceToolData={practiceToolData}
        checkConditionCallback={checkConditionCallback}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  mainContent: {
    maxWidth: 1440,
    width: "100%",
    flex: 1,
    backgroundColor: "#EFEFEF",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    gap: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1001,
  },
  scrollView: {
    alignSelf: "stretch",
  },
  scrollBody: {
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#EFEFEF",
    flex: 1,
  },
});
