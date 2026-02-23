import { StyleSheet, Text, View } from "react-native";

export function EndLevelReport({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.reportTitle}>{title}</Text>
      <Text style={[styles.text2]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  column3: {
    alignSelf: "flex-start",
  },
  column4: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingLeft: 8,
    marginRight: 8,
  },
  reportTitle: {
    fontSize: 24,
    color: "#292929",
    marginBottom: 8,
  },
  image: {
    borderRadius: 8,
    width: 24,
    height: 19,
    marginRight: 446,
  },
  image2: {
    borderRadius: 8,
    width: 20,
    height: 20,
    marginRight: 425,
  },
  row: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  row2: {
    alignSelf: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  row3: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#292929",
    marginBottom: 8,
  },
  text2: {
    color: "#292929",
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  text3: {
    color: "#F95F3C",
    marginLeft: 4,
    marginRight: 8,
  },
  text4: {
    color: "#F28B0E",
    marginLeft: 4,
    marginRight: 8,
  },
  text5: {
    color: "#1D1D1D",
  },
  text6: {
    color: "#292929",
  },
  view4: {
    alignSelf: "flex-start",
    paddingBottom: 1,
    marginBottom: 4,
    marginRight: 406,
  },
  view5: {
    backgroundColor: "#989898",
    borderRadius: 4,
    marginRight: 8,
  },
  box2: {
    width: 63,
    height: 8,
    backgroundColor: "#33C6FD",
  },
});
