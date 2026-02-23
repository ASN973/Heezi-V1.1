import { isMobile } from "@/utils/isMobile";
import { StyleSheet, View } from "react-native";

export function HorizontalDivider({ height = 2 }: { height?: number }) {
  return <View style={[styles.divider, { height }]} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: !isMobile ? "#EFEFEF" : "lightgray",
    marginHorizontal: "20%",
  },
});
