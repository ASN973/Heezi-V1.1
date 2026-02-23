import CustomAnimation from "@/components/animations/CustomAnimation";
import { EndLevelReport } from "@/components/result/EndLevelReport";
import { ButtonWithArrow } from "@/components/ui/ButtonWithArrow";
import characters from "@/constants/characters";
import useLevelData from "@/hooks/use-level-data";
import { getMissionStaticParams } from "@/utils/getMissionStaticParams";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMissionStaticParams();
}

export default function ResultScreen() {
  const { practiceTool, id } = useLocalSearchParams<{
    practiceTool: string;
    id: string;
  }>();
  const { levelType, character, endLevelReport } = useLevelData();

  const goToNextPage = () => {
    if (levelType === "practice") {
      router.push(`/mission/${practiceTool}/${id}/export`);
    } else {
      router.replace(`/(tabs)/play/${practiceTool}/section-screen`);
    }
  };

  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={[styles.mainContainer, { height: height || "100%" }]}>
      <View style={styles.mainContent}>
        <View style={styles.animationBox}>
          <CustomAnimation
            animationData={
              characters[character as keyof typeof characters]?.fin || ""
            }
          />
        </View>
        <View>
          <EndLevelReport
            title={endLevelReport?.title || "Bravo !"}
            description={
              endLevelReport?.description || "Tu as réussi la mission"
            }
          />
          <ButtonWithArrow text={"Continuer"} onPress={goToNextPage} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: { alignItems: "center" },

  mainContent: {
    backgroundColor: "white",
    alignItems: "stretch",
    flex: 1,
    padding: 16,
    margin: 16,
  },
  animationBox: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
});
