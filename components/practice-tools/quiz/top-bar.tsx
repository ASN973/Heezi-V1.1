import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const ProgressBar = ({ progress }: { progress: number }) => {
  const { toolConstants } = usePracticeToolConstants();
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarOutline}>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: toolConstants.color, width: `${progress}%` },
          ]}
        ></View>
      </View>
    </View>
  );
};

function BackButton() {
  return (
    <TouchableOpacity
      style={styles.backButtonBox}
      onPress={() => router.back()}
    >
      <Image
        source={require("@/assets/images/8jxkmv5m_expires_30_days.png")}
        resizeMode={"contain"}
        style={styles.backButtonIcon}
      />
    </TouchableOpacity>
  );
}

const TopBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.topBar}>
      <BackButton />
      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  progressBar: {
    width: "30%",
    height: 8,
    backgroundColor: "#45BC9E",
  },
  backButtonBox: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDC1AB",
    borderRadius: 8,
  },
  backButtonIcon: {
    borderRadius: 8,
    width: 24,
    height: 24,
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  progressBarOutline: {
    backgroundColor: "#989898",
    borderRadius: 4,
  },
});

export default TopBar;
