import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SuivantBtn({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.downArrowContainer}>
      <Text style={[{ fontSize: 18, fontWeight: "bold" }, styles.text]}>
        {text}
      </Text>
      <Image
        source={require("@/assets/images/7b4n53nk_expires_30_days.png")}
        resizeMode={"contain"}
        style={styles.image31}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  downArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  image31: {
    width: 32,
    height: 21,
  },
  text: {
    color: "black",
    marginRight: 11,
  },
});
