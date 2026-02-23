import VerticalDivider from "@/components/practice-tools/VerticalDivider";
import IconButton, {
  IconButtonSmall,
  TextDropdownButton,
} from "@/components/practice-tools/ribbons/RibbonButtons";
import styles from "@/components/practice-tools/ribbons/RibbonStyles";
import SectionGrid, {
  ButtonsStack,
} from "@/components/practice-tools/ribbons/SectionGrid";
import { useSpreadsheetRibbon } from "@/hooks/useSpreadsheet";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SectionPressePapiers from "../../ribbons/SectionPressePapiers";
import BoldButton from "../BoldButton";
import MobileRibbon from "../RibbonMobile";

export default function SpreadsheetRibbon() {
  return isMobile ? <MobileRibbon /> : <SpreadsheetRibbonDesktop />;
}

function SectionPolice() {
  const { isSelectedCellBold, boldSelectedCell } = useSpreadsheetRibbon();
  return (
    <SectionGrid title="Police">
      <View style={styles.buttonsRow}>
        <TextDropdownButton text="Police" widthMobile={73} widthDesktop={100} />
        <TextDropdownButton text="12" widthDesktop={50} />
      </View>
      <View style={styles.buttonsRow}>
        <BoldButton isBold={isSelectedCellBold} onPress={boldSelectedCell} />
        <IconButtonSmall
          iconSource={require("@/assets/images/wbsdd6yd_expires_30_days.png")}
        />
        <IconButtonSmall
          iconSource={require("@/assets/images/shmc35k2_expires_30_days.png")}
        />

        <VerticalDivider />
        <ButtonsStack
          iconSources={[
            require("@/assets/images/7czrdf4k_expires_30_days.png"),
            require("@/assets/images/ath16u4f_expires_30_days.png"),
            require("@/assets/images/uewh91sl_expires_30_days.png"),
          ]}
        />
      </View>
    </SectionGrid>
  );
}

function SectionParagraphe() {
  return (
    <SectionGrid title="Paragraphe">
      <View style={styles.buttonsRow}>
        <ButtonsStack
          iconSources={[
            require("@/assets/images/nkzp2nt3_expires_30_days.png"),
            require("@/assets/images/y7bq5psu_expires_30_days.png"),
            require("@/assets/images/gxdqlt2g_expires_30_days.png"),
          ]}
        />
        <VerticalDivider />
        <IconButton
          iconSource={require("@/assets/images/mc2ln7j3_expires_30_days.png")}
        />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonsStack
          iconSources={[
            require("@/assets/images/uirt4emu_expires_30_days.png"),
            require("@/assets/images/393nlgpw_expires_30_days.png"),
            require("@/assets/images/e7u96dzs_expires_30_days.png"),
          ]}
        />

        <VerticalDivider />
        <Image
          source={require("@/assets/images/spreadsheetRibbonAlignment.png")}
          resizeMode={"contain"}
          style={styles2.image22}
        />
        <ButtonsStack
          iconSources={[
            require("@/assets/images/h7fhqw57_expires_30_days.png"),
            require("@/assets/images/lxt8yo0p_expires_30_days.png"),
          ]}
        />
      </View>
    </SectionGrid>
  );
}

function SectionNombre() {
  return (
    <SectionGrid title="Nombre">
      <View style={styles2.column8}>
        <TouchableOpacity
          style={styles2.buttonRow3}
          onPress={() => {}}
          disabled
        >
          <Text style={styles2.text4}>{"Standard"}</Text>
          <Image
            source={require("@/assets/images/f0blr7yj_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles2.image23}
          />
        </TouchableOpacity>
        <View style={styles2.row10}>
          <Image
            source={require("@/assets/images/spreadsheetRibbon2.png")}
            resizeMode={"contain"}
            style={styles2.image24}
          />
          <TouchableOpacity
            style={styles2.button26}
            onPress={() => {}}
            disabled
          >
            <Text style={styles2.text7}>{"%"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles2.button27}
            onPress={() => {}}
            disabled
          >
            <Text style={styles2.text7}>{"000"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SectionGrid>
  );
}

function SectionStyles() {
  return (
    <SectionGrid title="Styles">
      <View style={styles2.row11}>
        <Image
          source={require("@/assets/images/spreadsheetRibbon3.png")}
          resizeMode={"contain"}
          style={styles2.image25}
        />
        <Image
          source={require("@/assets/images/spreadsheetRibbon4.png")}
          resizeMode={"contain"}
          style={styles2.image26}
        />
      </View>
      <Image
        source={require("@/assets/images/spreadsheetRibbon5.png")}
        resizeMode={"contain"}
        style={styles2.image27}
      />
    </SectionGrid>
  );
}

function SectionCellules() {
  return (
    <SectionGrid title="Cellules">
      <View style={styles2.column11}>
        <View style={styles2.row12}>
          <TouchableOpacity
            style={styles2.buttonRow4}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/6p0qmdld_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles2.image28}
            />
            <Text style={styles2.text7}>{"Insérer"}</Text>
            <Image
              source={require("@/assets/images/bm26nyo6_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles2.image29}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles2.buttonRow5}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/3psjry5g_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles2.image28}
            />
            <Text style={styles2.text7}>{"Supprimer"}</Text>
            <Image
              source={require("@/assets/images/ihd2alr2_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles2.image23}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles2.buttonRow6}
          onPress={() => {}}
          disabled
        >
          <Image
            source={require("@/assets/images/ueuz0btu_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles2.image30}
          />
          <Text style={styles2.text8}>{"Format"}</Text>
          <Image
            source={require("@/assets/images/x88mmd51_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles2.image29}
          />
        </TouchableOpacity>
      </View>
    </SectionGrid>
  );
}

function SpreadsheetRibbonDesktop() {
  return (
    <View style={styles.mainContainer}>
      <SectionPressePapiers />
      <VerticalDivider />
      <SectionPolice />
      <VerticalDivider />
      <SectionParagraphe />
      <VerticalDivider />
      <SectionNombre />
      <VerticalDivider />
      <SectionStyles />
      <VerticalDivider />
      <SectionCellules />
    </View>
  );
}

const styles2 = StyleSheet.create({
  button26: {
    width: 26,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  button27: {
    width: 44,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonRow3: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonRow4: {
    width: 92,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 9,
  },
  buttonRow5: {
    width: 114,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonRow6: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  column8: {
    width: 133,
    marginRight: 16,
  },
  column11: {
    marginBottom: 11,
  },
  image22: {
    width: 45,
    height: 32,
    marginRight: 7,
  },
  image23: {
    borderRadius: 8,
    width: 9,
    height: 6,
    marginRight: 7,
  },
  image24: {
    width: 46,
    height: 30,
    marginRight: 7,
  },
  image25: {
    width: 45,
    height: 32,
    marginRight: 8,
  },
  image26: {
    width: 44,
    height: 31,
  },
  image27: {
    width: 44,
    height: 31,
    marginBottom: 9,
  },
  image28: {
    borderRadius: 8,
    width: 15,
    height: 15,
    marginLeft: 8,
  },
  image29: {
    borderRadius: 8,
    width: 9,
    height: 6,
    marginRight: 6,
  },
  image30: {
    borderRadius: 8,
    width: 15,
    height: 15,
    marginLeft: 8,
    marginRight: 4,
  },
  row10: {
    flexDirection: "row",
    marginBottom: 10,
  },
  row11: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  row12: {
    flexDirection: "row",
    marginBottom: 8,
  },
  text4: {
    fontSize: 10,
    color: "#292929",
    marginLeft: 8,
    marginRight: 12,
  },
  text7: {
    fontSize: 10,
    color: "#292929",
  },
  text8: {
    fontSize: 10,
    color: "#292929",
    marginRight: 6,
  },
});
