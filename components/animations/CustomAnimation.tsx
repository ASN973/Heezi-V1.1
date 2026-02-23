import LottieView from "lottie-react-native";
import { StyleProp, ViewStyle } from "react-native";

export default function CustomAnimation({
  animationData,
  style,
  resizeMode = "cover",
}: {
  animationData: any;
  style?: StyleProp<ViewStyle>;
  resizeMode?: "cover" | "contain" | "center";
}) {
  return (
    <LottieView
      source={animationData}
      loop={true}
      autoPlay={true}
      resizeMode={resizeMode}
      style={style}
    />
  );
}
