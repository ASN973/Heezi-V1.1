import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, View } from "react-native";
import StatusText from "../status-text";

export function TitleBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default function HomeHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toolConstants } = usePracticeToolConstants();
  return (
    <View style={styles.container}>
      {!isMobile && (
        <Image source={toolConstants.icon} resizeMode={"contain"} />
      )}
      <View
        style={[styles.mainContent, { backgroundColor: toolConstants.color }]}
      >
        {children}
        <StatusText />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  mainContent: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 22,
    color: "#black",
  },
  description: { fontSize: 14, color: "#black" },
});
