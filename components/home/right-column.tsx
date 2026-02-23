import { CategoryList } from "@/components/home/category-list";
import { LevelSection } from "@/components/home/level-section";
import { HorizontalDivider } from "@/components/ui/HorizontalDivider";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, View } from "react-native";

export function RightColumn() {
  return (
    <View>
      {isMobile && (
        <View style={styles.mobileHeader}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <HorizontalDivider height={1} />
        </View>
      )}

      <LevelSection />
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  mobileHeader: { gap: 5, paddingBottom: 8 },
  logo: {
    height: 36,
    alignSelf: "center",
  },
});
