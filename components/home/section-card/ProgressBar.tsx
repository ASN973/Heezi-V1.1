import { StyleSheet, View } from "react-native";

export default function ProgressBar({
  progress,
}: {
  progress: number;
}): React.ReactNode {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBg}>
        <View
          style={[styles.progressBarFill, { width: `${progress}%` }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 8,
  },
  progressBarBg: {
    backgroundColor: "#989898",
    borderRadius: 4,
    height: 8,
    borderColor: "#33C6FD",
  },
  progressBarFill: {
    width: "1%",
    height: 8,
    backgroundColor: "#33C6FD",
  },
});
