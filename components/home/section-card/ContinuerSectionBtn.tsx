import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomTouchableOpacity from "./CustomTouchableOpacity";

export default function ContinuerSectionBtn({
  continuerRoute,
}: {
  continuerRoute: string;
}) {
  const { toolConstants } = usePracticeToolConstants();
  const disabled = !!!continuerRoute;

  return (
    <View style={styles.mainContainer}>
      <CustomTouchableOpacity
        style={[
          styles.button,
          { backgroundColor: disabled ? "white" : toolConstants.color },
        ]}
        onPress={() => router.push(continuerRoute)}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{"Continuer"}</Text>
        <Image
          source={require("@/assets/images/7b4n53nk_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.image}
        />
      </CustomTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { padding: 8, backgroundColor: "#EFEFEF" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: !isMobile ? 16 : 12,
    gap: !isMobile ? 10 : 8,
  },
  buttonText: {
    fontSize: !isMobile ? 18 : 16,
    fontWeight: "bold",
    color: "#0A2924",
  },
  image: {
    borderRadius: 8,
    width: !isMobile ? 16 : 10,
    height: !isMobile ? 24 : 18,
  },
});
