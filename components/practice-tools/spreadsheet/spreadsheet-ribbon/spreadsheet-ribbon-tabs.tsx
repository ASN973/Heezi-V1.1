import {
  RIBBON_TABS_DESKTOP,
  RIBBON_TABS_MOBILE,
} from "@/constants/spreadsheetConstants";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RibbonTabsMobile() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ribbonTabsContainer}>
        {RIBBON_TABS_MOBILE.map(({ label }) => (
          <TouchableOpacity
            key={label}
            style={styles.button2}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function RibbonTabs() {
  return isMobile ? <RibbonTabsMobile /> : <RibbonTabsDesktop />;
}

function RibbonTabsDesktop() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ribbonTabsContainer}>
        {RIBBON_TABS_DESKTOP.map(({ label, style }) => (
          <TouchableOpacity
            key={label}
            style={[styles.button2, style]}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button10} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/zromobil_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.image6}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",

    justifyContent: isMobile ? "space-between" : undefined,
    width: "100%",
    paddingHorizontal: isMobile ? 16 : 0,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDC1AB",
    borderRadius: 8,
  },
  backButtonIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    maxWidth: 52,
    height: 32,
  },
  row3: {
    width: 73,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 33,
  },
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: "#292929",
  },
  button2: {
    width: isMobile ? undefined : 130,
    minWidth: isMobile ? 80 : 130,
    flex: isMobile ? 1 : undefined,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 4,
  },

  button9: {
    width: 32,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 8,
  },
  button10: {
    width: 32,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  image6: {
    borderRadius: 8,
    width: 16,
    height: 16,
  },

  ribbonTabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: !isMobile ? 32 : undefined,
    gap: 8,
    flex: 1,
  },
});
