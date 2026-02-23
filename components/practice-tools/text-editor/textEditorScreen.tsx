import MascotMonitor from "@/components/mascot/mascot-monitor";
import useLevelData from "@/hooks/use-level-data";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleBar from "../TitleBar";
import RibbonTabs from "../spreadsheet/spreadsheet-ribbon/spreadsheet-ribbon-tabs";
import ContentPage from "./ContentPage";
import TextEditorRibbon from "./TextEditorRibbon";
import { isMobile } from "@/utils/isMobile";

function PageNumber({ currentPage = 1, totalPages = 1 }) {
  return (
    <View style={styles.pageNumberContainer}>
      <Text
        style={[{ fontSize: 12, fontWeight: "bold" }, styles.pageNumberText]}
      >{`Page ${currentPage}/${totalPages}`}</Text>
    </View>
  );
}

export default function TextEditorScreen({
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
    <SafeAreaView style={[styles.mainContainer]}>
      <View style={styles.mainContent}>
        <TitleBar />
        {!isMobile && <RibbonTabs />}
        <TextEditorRibbon />
        <ContentPage />
        <PageNumber currentPage={1} totalPages={1} />
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
  pageNumberContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  pageNumberText: {
    color: "#292929",
  },
});
