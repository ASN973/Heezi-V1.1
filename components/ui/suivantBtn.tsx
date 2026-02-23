import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SuivantBtn({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Text style={[{ fontSize: 18, fontWeight: "bold" }, styles.text]}>
        {text}
      </Text>
      <Image
        source={require("@/assets/images/7b4n53nk_expires_30_days.png")}
        resizeMode={"center"}
        style={styles.image31}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 16,
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
