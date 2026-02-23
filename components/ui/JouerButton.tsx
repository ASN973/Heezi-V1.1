import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { Image, StyleSheet, Text, View } from "react-native";

export default function JouerButton({
  image,
  disabled,
}: {
  image: any;
  disabled: boolean;
}) {
  const { toolConstants } = usePracticeToolConstants();

  return (
    <View
      style={[
        styles.mainContainer,

        {
          backgroundColor: disabled
            ? "rgb(169, 169, 169)"
            : toolConstants.color,
        },
      ]}
    >
      <View style={styles.playButtonTextContainer}>
        <Text
          style={[{ fontSize: 18, fontWeight: "bold" }, styles.playButtonText]}
        >
          {"Jouer"}
        </Text>
      </View>

      <Image source={image} resizeMode={"contain"} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 8,
  },
  playButtonTextContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  playButtonText: {
    color: "white",
  },
  icon: {
    height: 36,
    width: 36,
  },
});
