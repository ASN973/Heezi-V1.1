import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { StyleSheet, Text, View } from "react-native";

export default function StatusText() {
  const { toolConstants } = usePracticeToolConstants();
  return (
    <View
      style={[
        styles.statusButton,
        { backgroundColor: toolConstants.secondaryColor },
      ]}
    >
      <Text style={styles.statusText}>En cours</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  statusButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: isMobile ? 4 : 8,
    paddingVertical: isMobile ? 4 : 6,
    position: isMobile ? "absolute" : undefined,
    right: isMobile ? 8 : undefined,
    top: isMobile ? 8 : undefined,
  },
  statusText: {
    color: "#0A2924",
    lineHeight: 10,
    fontSize: isMobile ? 12 : 14,
  },
});
