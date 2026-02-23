import useLevelData from "@/hooks/use-level-data";
import useMascotBubble from "@/hooks/useMascotBubble";
import {
  Image,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import SuivantBtn from "../ui/suivantBtn";

const MascotIcon = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768; // Common mobile breakpoint

  return (
    <Image
      source={require("@/assets/images/tfupuxd4_expires_30_days.png")}
      resizeMode={"contain"}
      style={[styles.mascot, isMobile && { width: 68, height: 68 }]}
    />
  );
};

export function MascotBubble({
  bubbleText,
  nextStep,
}: {
  bubbleText: string;
  nextStep: () => void | null;
}) {
  const { levelType } = useLevelData();

  const { handleLayout, mascotPosition } = useMascotBubble();

  const DownArrowNextStep = nextStep && levelType === "lesson" && (
    <SuivantBtn text="Suivant" onPress={nextStep} />
  );

  return (
    <MascotDialog
      bubbleText={bubbleText}
      downArrowNextStep={DownArrowNextStep}
      style={mascotPosition}
      onLayout={handleLayout}
    />
  );
}

const CornerTriangle = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View style={[styles.triangleContainer, style]}>
      <View style={styles.triangle} />
    </View>
  );
};

export const MascotDialog = ({
  bubbleText,
  downArrowNextStep = undefined,
  style = undefined,
  textContainerStyle = undefined,
  onLayout,
  fixed = false,
}: {
  bubbleText: string;
  downArrowNextStep: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  fixed?: boolean;
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const DownArrowNextStep = downArrowNextStep;

  // Calculate responsive maxWidth to prevent overflow on mobile
  // Reserve space for mascot (88px) + padding (16px on each side) + triangle (20px)
  const maxTextWidth = Math.min(600, windowWidth - 88 - 32 - 20);

  return (
    <View
      style={[!fixed && styles.mainContainer, style, fixed && { marginTop: 8 }]}
      onLayout={onLayout}
      pointerEvents="box-none" // allow clicks to pass through empty space
    >
      <View
        style={[
          styles.textBoxAndTriangle,
          { marginTop: fixed ? 0 : undefined },
        ]}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.textContainer,
            { maxWidth: maxTextWidth },
            textContainerStyle,
          ]}
        >
          <Text style={[styles.dialogText, fixed && { fontSize: 14 }]}>
            {bubbleText || "..."}
          </Text>
          {DownArrowNextStep}
        </View>
        <CornerTriangle style={fixed && { marginBottom: "10%" }} />
      </View>
      <MascotIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  triangleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: "auto",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderRightColor: "transparent",
    borderTopColor: "rgba(82,82,82,0.8)",
  },
  mainContainer: {
    position: "absolute",
    right: 0,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    maxWidth: "100%",
    paddingLeft: 8, // Prevent overflow on left side
  },
  textBoxAndTriangle: {
    marginTop: 64,
    flexDirection: "row",

    // alignItems: "flex-end",
    // maxWidth: 800,
    // height: "100%",
  },
  textContainer: {
    backgroundColor: "rgba(82,82,82,0.8)",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 16,
    maxWidth: 600,
    flexShrink: 1, // Allow text container to shrink on mobile
    // flex: 1,
  },

  cornerTriangle: {
    width: 42,
    marginBottom: "auto",
    borderWidth: 1,
    borderColor: "green",
  },
  mascot: {
    width: 88,
    height: 88,
  },

  dialogText: {
    fontSize: 18,
    fontWeight: 600,
    color: "#FFFFFF",
  },
});
