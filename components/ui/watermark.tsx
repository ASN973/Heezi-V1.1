import { StyleSheet, Text, TextStyle, View } from "react-native";

function WatermarkText({
  text = "BIENTÔT DISPONIBLE",
  textStyle,
}: {
  text: string;
  textStyle?: TextStyle;
}) {
  return <Text style={[styles.watermark, textStyle]}>{text}</Text>;
}

export default function WatermarkAbsolute({
  text,
  textStyle = {},
}: {
  text: string;
  textStyle?: TextStyle;
}) {
  return (
    <View style={styles.overlayAbsolute}>
      <WatermarkText text={text} textStyle={textStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlayAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1002,
  },
  watermark: {
    transform: [{ rotate: "-45deg" }, { translateY: -20 }],
    fontSize: 40,
    fontWeight: "900",
    borderTopWidth: 10,
    borderBottomWidth: 10,
    backgroundColor: "rgba(234, 234, 234, 0.6)",
    zIndex: 1,
    textAlign: "center",
    padding: 16,
    borderColor: "rgb(255, 91, 91)",
    color: "rgb(255, 91, 91)",
  },
});
