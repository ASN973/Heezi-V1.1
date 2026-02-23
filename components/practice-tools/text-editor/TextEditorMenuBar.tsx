import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const darkBgStyle = { backgroundColor: "#989898" };
const RIBBON_TABS = [
  { label: "Accueil" },
  { label: "Insertion" },
  { label: "Dessin", style: darkBgStyle },
  { label: "Conception", style: darkBgStyle },
  { label: "Mise en page" },
  { label: "Références" },
  { label: "Publipostage", style: darkBgStyle },
  { label: "Révision" },
  { label: "Affichage", style: darkBgStyle },
];

export function TextEditorMenuBar() {
  return (
    <View style={styles.row2}>
      <View style={styles.ribbonTabsContainer}>
        {RIBBON_TABS.map(({ label, style }) => (
          <TouchableOpacity
            key={label}
            style={[styles.button2, style]}
            onPress={() => {}}
            disabled
          >
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row3}>
        <TouchableOpacity style={styles.button9} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/ufeyprsl_expires_30_days.png")}
            resizeMode={"stretch"}
            style={styles.image6}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button10} onPress={() => {}} disabled>
          <Image
            source={require("@/assets/images/v82hp4b9_expires_30_days.png")}
            resizeMode={"stretch"}
            style={styles.image7}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    paddingVertical: 11,
  },
  button2: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    marginLeft: 32,
    marginRight: 8,
  },
  button3: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 8,
  },
  button4: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#989898",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 9,
  },
  button5: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#989898",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  button6: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 9,
  },
  button7: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 9,
    marginRight: 8,
  },
  button8: {
    width: 130,
    alignItems: "center",
    backgroundColor: "#989898",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 65,
  },
  button9: {
    width: 33,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 8,
  },
  button10: {
    width: 32,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
  },
  row3: {
    width: 73,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 33,
  },
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: "#292929",
  },
  image6: {
    borderRadius: 8,
    width: 17,
    height: 16,
  },
  image7: {
    borderRadius: 8,
    width: 17,
    height: 17,
  },
  ribbonTabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 32,
    marginRight: 64,
    gap: 8,
  },
});
