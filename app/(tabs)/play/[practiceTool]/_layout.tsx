import { RightColumn } from "@/components/home/right-column";
import { ScrollView, StyleSheet, View } from "react-native";

import { isMobile } from "@/utils/isMobile";
import { Slot } from "expo-router";

function LeftColumnResponsiveWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return isMobile ? (
    <View>{children}</View>
  ) : (
    <ScrollView
      style={styles2.leftColumn}
      contentContainerStyle={styles2.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      {children}
    </ScrollView>
  );
}

function LeftColumn() {
  return (
    <View style={styles2.leftColumnContainer}>
      <LeftColumnResponsiveWrapper>
        <Slot />
      </LeftColumnResponsiveWrapper>
    </View>
  );
}

function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  return isMobile ? (
    <ScrollView
      style={styles.mobileScrollView}
      contentContainerStyle={styles.mobileContentContainer}
    >
      {children}
    </ScrollView>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={[styles.contentContainer]}
    >
      {children}
    </ScrollView>
  );
}

export default function HomeScreenLayout() {
  return (
    <ResponsiveWrapper>
      <LeftColumn />
      <RightColumn />
    </ResponsiveWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    justifyContent: "space-between",
  },
  mobileContentContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: 16,
    padding: 16,
  },
  mobileScrollView: {
    flex: 1,
  },
});

const styles2 = StyleSheet.create({
  leftColumnContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  leftColumn: {
    marginRight: 16,
    paddingRight: 16,
  },
  leftColumnContent: {
    flex: 1,
    alignSelf: "center",
  },
  contentContainer: {
    paddingTop: 8,
  },
  actionButton: {
    marginBottom: 16,
  },
  imageGrid: {
    marginBottom: 8,
  },
  imageGrid2: {
    marginBottom: 16,
  },
});
