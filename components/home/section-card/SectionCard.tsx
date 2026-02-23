import WatermarkAbsolute from "@/components/ui/watermark";
import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, View } from "react-native";
import ContinuerSectionBtn from "./ContinuerSectionBtn";
import ProgressBar from "./ProgressBar";

export default function SectionCard({
  mascotImageSource,
  sectionNumber,
  continuerRoute = "",
}: {
  mascotImageSource: number;
  sectionNumber: number;
  continuerRoute: string;
}) {
  const disabled = !!!continuerRoute;
  const { toolConstants, toolProgress } = usePracticeToolConstants();

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: disabled ? undefined : toolConstants.secondaryColor,
        },
      ]}
    >
      <View style={styles.leftColumn}>
        <Text style={styles.sectionHeader}>{`Section ${sectionNumber}`}</Text>
        <View style={styles.progressAndContinuer}>
          <ProgressBar progress={disabled ? 0 : toolProgress} />
          <ContinuerSectionBtn continuerRoute={continuerRoute} />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={mascotImageSource}
          resizeMode={"contain"}
          style={styles.mascotImage}
        />
      </View>
      {disabled && (
        <WatermarkAbsolute
          text="BIENTÔT DISPONIBLE"
          textStyle={styles.watermarkText}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 32,
    paddingLeft: !isMobile ? 32 : 4,
    paddingRight: !isMobile ? 32 : 0,
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
    marginRight: 33,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  progressAndContinuer: { justifyContent: "space-between", flex: 1 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
    marginLeft: 8,
  },
  imageContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  mascotImage: {
    borderRadius: 8,
    height: 100,
    maxWidth: isMobile ? 140 : undefined,
  },
  watermarkText: {
    fontSize: 16,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    fontWeight: "bold",
    transform: [{ rotate: "-30deg" }],
  },
});
