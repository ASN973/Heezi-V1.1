import VerticalDivider from "@/components/practice-tools/VerticalDivider";
import BoldButton from "@/components/practice-tools/spreadsheet/BoldButton";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function PoliceButtons() {
  return (
    <View style={styles.grid}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.police} onPress={() => {}} disabled>
          <Text style={styles.policeText}>{"Police"}</Text>
          <Image
            source={require("@/assets/images/downArrow.png")}
            resizeMode={"contain"}
            style={styles.downArrowIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <BoldButton />
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/wbsdd6yd_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/shmc35k2_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ParagraphButtons() {
  return (
    <View style={styles.grid}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/nkzp2nt3_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/y7bq5psu_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/gxdqlt2g_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/uirt4emu_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/393nlgpw_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/e7u96dzs_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabButtons() {
  return (
    <View style={styles.grid}>
      <View style={[styles.buttonRow, { justifyContent: "flex-start" }]}>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/h7fhqw57_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/lxt8yo0p_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RibbonMobile() {
  return (
    <View style={styles.mainContainer}>
      <PoliceButtons />
      <VerticalDivider />
      <ParagraphButtons />
      <VerticalDivider />
      <TabButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: !isMobile ? 8 : 4,
  },
  grid: { gap: !isMobile ? 8 : 4, padding: 8 },
  button: {
    backgroundColor: "#EFEFEF",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  police: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  downArrowIcon: {
    borderRadius: 8,
    width: 9,
    height: 6,
  },
  buttonIcon: {
    borderRadius: 8,
    height: !isMobile ? 10 : 12,
  },
  mainContainer: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 24,
    gap: !isMobile ? 8 : 2,
  },
  policeText: {
    fontSize: isMobile ? 12 : 10,
    color: "#292929",
  },
});
