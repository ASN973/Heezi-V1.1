import { isMobile } from "@/utils/isMobile";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./RibbonStyles";

export default function IconButton({
  iconSource,
}: {
  iconSource: ImageSourcePropType;
}) {
  return (
    <TouchableOpacity style={styles.buttonMd} onPress={() => {}} disabled>
      <Image
        source={iconSource}
        resizeMode={"contain"}
        style={styles.buttonIconMd}
      />
    </TouchableOpacity>
  );
}

export function IconButtonSmall({
  iconSource,
}: {
  iconSource: ImageSourcePropType;
}) {
  return (
    <TouchableOpacity style={styles.buttonSmall} onPress={() => {}} disabled>
      <Image
        source={iconSource}
        resizeMode={"contain"}
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  );
}

export function TextDropdownButton({
  text,
  widthMobile = 0,
  widthDesktop,
}: {
  text: string;
  widthMobile: number;
  widthDesktop: number;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonDropdown,
        { width: isMobile ? widthMobile || widthDesktop : widthDesktop },
      ]}
      onPress={() => {}}
      disabled
    >
      <Text style={styles.text}>{text}</Text>
      <Image
        source={require("@/assets/images/uig4w09q_expires_30_days.png")}
        resizeMode={"contain"}
        style={styles.downArrow}
      />
    </TouchableOpacity>
  );
}
