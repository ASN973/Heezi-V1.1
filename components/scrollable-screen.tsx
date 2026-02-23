import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScrollableScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
}

export function ScrollableScreen({
  children,
  useSafeArea = true,
  style,
  contentContainerStyle,
  ...scrollViewProps
}: ScrollableScreenProps) {
  const content = (
    <ScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );

  if (useSafeArea) {
    return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
  }

  return content;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
