import MissionPart from "@/components/MissionPart";
import HomeContainer from "@/components/home/HomeContainer";
import SectionHeader from "@/components/home/section-header";
import sectionButtons from "@/constants/sectionButtons";
import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { StyleSheet, View } from "react-native";

const Divider = () => <View style={styles.divider} />;

export default function SectionScreen() {
  const { toolSectionButtons } = usePracticeToolConstants();

  return (
    <HomeContainer>
      <SectionHeader />
      <View style={styles.missionPartsContainer}>
        <MissionPart
          title="1/3 - Cours"
          image={toolSectionButtons.lesson}
          levelNumber={1}
        />
        <Divider />
        <MissionPart
          title="2/3 - Quiz"
          image={toolSectionButtons.quiz}
          imageDisabled={sectionButtons.disabled.quiz}
          levelNumber={2}
        />
        <Divider />
        <MissionPart
          title="3/3 - Pratique"
          image={toolSectionButtons.practice}
          levelNumber={3}
          imageDisabled={sectionButtons.disabled.practice}
        />
      </View>
    </HomeContainer>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainContent: { flex: 1, justifyContent: "flex-start" },
  missionPartsContainer: {
    gap: 8,
  },
  divider: {
    height: 2,
    backgroundColor: !isMobile ? "#EFEFEF" : "lightgray",
    marginHorizontal: "20%",
  },
});
