import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./RibbonStyles";
import SectionTitle from "./SectionTitle";

export default function SectionPressePapiers() {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionContent, { gap: 8 }]}>
        <TouchableOpacity
          style={styles.verticalButton}
          onPress={() => {}}
          disabled
        >
          <Image
            source={require("@/assets/images/coller.png")}
            resizeMode={"contain"}
            style={styles.iconBig}
          />
          <Text style={styles.text}>{"Coller"}</Text>
          <Image
            source={require("@/assets/images/down-arrow.png")}
            resizeMode={"contain"}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={styles.buttonBase}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/cut.png")}
              resizeMode={"contain"}
              style={styles.iconMd}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBase}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/clipboard.png")}
              resizeMode={"contain"}
              style={styles.iconMd}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SectionTitle title={"Presse-papiers"} />
    </View>
  );
}
