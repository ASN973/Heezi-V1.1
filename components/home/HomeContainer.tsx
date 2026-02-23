import { ScrollableScreen } from "@/components/scrollable-screen";
import { isMobile } from "@/utils/isMobile";
import { StyleSheet } from "react-native";

export default function HomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollableScreen
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContent}
    >
      {children}
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: isMobile ? 0 : 32,
    paddingHorizontal: isMobile ? 0 : 0,
  },
  mainContent: {
    gap: 32,
    marginBottom: 32,
    alignItems: "stretch",
  },
});
