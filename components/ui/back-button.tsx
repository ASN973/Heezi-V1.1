import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function BackButton({ style }) {
  const { practiceTool } = usePracticeToolConstants();
  return (
    <View style={style}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace(`/(tabs)/play/${practiceTool}/section-screen`)
        }
      >
        <Image
          source={require("@/assets/images/escape.png")}
          resizeMode={"stretch"}
          style={styles.image5}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    alignItems: "center",
    backgroundColor: "#FDC1AB",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 32,
  },
  image5: {
    borderRadius: 8,
    width: 24,
    height: 24,
  },
});
