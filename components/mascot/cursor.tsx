import useCursor from "@/context/useCursor";
import { Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function Cursor() {
  const { cursorRef, animatedStyle } = useCursor();

  return (
    <AnimatedImage
      source={require("@/assets/images/cursor.png")}
      ref={cursorRef}
      style={[styles.cursor, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  cursor: {
    position: "absolute",
    width: 40,
    height: 40,
    zIndex: 10000,
    pointerEvents: "none",
    visibility: "hidden",
  },
});
