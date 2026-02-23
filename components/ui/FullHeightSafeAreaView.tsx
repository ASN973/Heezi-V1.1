import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FullWindowContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={[style, { height: height || "100%" }]}>
      {children}
    </SafeAreaView>
  );
}
