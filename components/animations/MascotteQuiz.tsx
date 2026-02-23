import LottieView from "lottie-react-native";
import { useRef } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

const animationData = require("@/assets/animations/MascotteQuiz.json");

interface MascotteQuizProps {
  /**
   * Whether the animation should loop
   * @default true
   */
  loop?: boolean;
  /**
   * Whether the animation should autoplay
   * @default true
   */
  autoplay?: boolean;
  /**
   * Custom style for the container
   */
  style?: ViewStyle;
  /**
   * Animation speed multiplier
   * @default 1
   */
  speed?: number;
  /**
   * Callback when animation finishes
   */
  onAnimationFinish?: () => void;
}

export default function MascotteQuiz({
  loop = true,
  autoplay = true,
  style,
  speed = 1,
  onAnimationFinish,
}: MascotteQuizProps) {
  const animationRef = useRef<LottieView>(null);

  return (
    <View style={[styles.container, style]}>
      <LottieView
        ref={animationRef}
        source={animationData}
        style={styles.animation}
        loop={loop}
        autoPlay={autoplay}
        speed={speed}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: "100%",
    aspectRatio: 1, // 800x800 = 1:1 aspect ratio
    maxHeight: "100%",
  },
});
