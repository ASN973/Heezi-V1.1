import VerticalDivider from "@/components/practice-tools/VerticalDivider";
import BoldButton from "@/components/practice-tools/spreadsheet/BoldButton";
import RibbonMobile from "@/components/practice-tools/spreadsheet/RibbonMobile";
import { isMobile } from "@/utils/isMobile";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "@/components/practice-tools/ribbons/RibbonStyles";
import SectionPressePapiers from "../ribbons/SectionPressePapiers";
import SectionTitle from "../ribbons/SectionTitle";

import IconButton, { TextDropdownButton } from "../ribbons/RibbonButtons";

function SectionPolice() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionGrid}>
        <View style={styles.buttonsRow}>
          <TextDropdownButton
            text="Police"
            widthMobile={100}
            widthDesktop={241}
          />
          <TouchableOpacity
            style={[styles.buttonDropdown, { width: 73 }]}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text}>{"12"}</Text>
            <Image
              source={require("@/assets/images/7bw6obmu_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.downArrow}
            />
          </TouchableOpacity>
          <VerticalDivider />
          <TouchableOpacity
            style={[styles.buttonDropdown, { width: 55 }]}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text}>{"A a"}</Text>
            <Image
              source={require("@/assets/images/rjnwoeo6_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.downArrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <BoldButton />
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/djgcsw86_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/yn5b2k86_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/k9vx5ycz_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/n12ta229_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/1awwjlw7_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <VerticalDivider />
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/lrwrll0x_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/zvx6kr6l_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {}}
            disabled
          >
            <Image
              source={require("@/assets/images/zcd58amp_expires_30_days.png")}
              resizeMode={"contain"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SectionTitle title={"Police"} />
    </View>
  );
}

function SectionParagraphe() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionGrid}>
        <View style={styles.buttonsRow}>
          <IconButton
            iconSource={require("@/assets/images/bulletPoints.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/numberedList.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/numberedtablist.png")}
          />
          <VerticalDivider />
          <IconButton
            iconSource={require("@/assets/images/xhij6qe3_expires_30_days.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/m8i25506_expires_30_days.png")}
          />
          <VerticalDivider />
          <IconButton
            iconSource={require("@/assets/images/qsucqhf4_expires_30_days.png")}
          />
          <VerticalDivider />
          <IconButton
            iconSource={require("@/assets/images/f5tsg9ts_expires_30_days.png")}
          />
        </View>
        <View style={styles.buttonsRow}>
          <IconButton
            iconSource={require("@/assets/images/ce74949l_expires_30_days.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/mk84bjzk_expires_30_days.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/wnui27r7_expires_30_days.png")}
          />
          <IconButton
            iconSource={require("@/assets/images/x1fh47wq_expires_30_days.png")}
          />

          <IconButton
            iconSource={require("@/assets/images/paragraphSpacing.png")}
          />
        </View>
      </View>
      <SectionTitle title={"Paragraphe"} />
    </View>
  );
}

function SectionStyles() {
  return (
    <View style={styles.section}>
      <View style={styles.row10}>
        <View style={styles.row11}>
          <TouchableOpacity style={styles.button28} onPress={() => {}} disabled>
            <Text style={styles.text8}>{"Normal"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button29} onPress={() => {}} disabled>
            <Text style={styles.text9}>{"Titre 1"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button30} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/n981r9bx_expires_30_days.png")}
            resizeMode={"contain"}
            style={styles.image28}
          />
        </TouchableOpacity>
      </View>
      <SectionTitle title={"Styles"} />
    </View>
  );
}

function SectionEdition() {
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.verticalButton}
        onPress={() => {}}
        disabled
      >
        <Image
          source={require("@/assets/images/dpfumd98_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.image29}
        />
        <Text style={styles.text}>{"édition"}</Text>
        <Image
          source={require("@/assets/images/8h776a6o_expires_30_days.png")}
          resizeMode={"contain"}
          style={styles.downArrow}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function TextEditorRibbon() {
  return isMobile ? <RibbonMobile /> : <RibbonDesktop />;
}

function RibbonDesktop() {
  return (
    <View style={styles.mainContainer}>
      <SectionPressePapiers />
      <VerticalDivider />
      <SectionPolice />
      <VerticalDivider />
      <SectionParagraphe />
      <VerticalDivider />
      <SectionStyles />
      <VerticalDivider />
      <SectionEdition />
      <VerticalDivider />
    </View>
  );
}
