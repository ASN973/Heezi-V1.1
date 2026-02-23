import HomeContainer from "@/components/home/HomeContainer";
import CourseCard from "@/components/home/course-card";
import SectionCard from "@/components/home/section-card/SectionCard";
import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { StyleSheet, View } from "react-native";

function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  return isMobile ? (
    <View style={styles.mobileContainer}>{children}</View>
  ) : (
    <HomeContainer>{children}</HomeContainer>
  );
}

export default function SectionsList() {
  const { practiceTool } = usePracticeToolConstants();

  return (
    <ResponsiveWrapper>
      {!isMobile && <CourseCard />}
      <SectionCard
        mascotImageSource={require("@/assets/images/aik0c764_expires_30_days.png")}
        sectionNumber={1}
        continuerRoute={`/(tabs)/play/${practiceTool}/section-screen`}
      />
      <SectionCard
        mascotImageSource={require("@/assets/images/kvf6wzrn_expires_30_days.png")}
        sectionNumber={2}
        continuerRoute=""
      />
      <SectionCard
        mascotImageSource={require("@/assets/images/xdcz0s8c_expires_30_days.png")}
        sectionNumber={3}
        continuerRoute=""
      />
    </ResponsiveWrapper>
  );
}
const styles = StyleSheet.create({
  mainContent: {
    gap: 32,
    marginBottom: 32,
  },
  mobileContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
  },
});
