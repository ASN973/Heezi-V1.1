import WatermarkAbsolute from "@/components/ui/watermark";
import { isMobile } from "@/utils/isMobile";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function SuccessIcon() {
  return (
    <Image
      source={require("@/assets/images/successIcon.png")}
      resizeMode={"contain"}
      style={styles.sucessIcon}
    />
  );
}

export default function SuccessScreen() {
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                {"0/6 succès débloqués (0%)"}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}></View>
            </View>
          </View>
          <View style={styles.successRowsContainer}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.successRow}>
                <SuccessIcon />
                <View style={styles.successDescriptionRow}>
                  <Text style={styles.successName}>{`Succès ${
                    index + 1
                  }`}</Text>
                  <Text style={styles.successName}>{"..."}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <WatermarkAbsolute text="BIENTÔT DISPONIBLE" />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  contentContainer: {
    alignItems: !isMobile ? "center" : "stretch",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  progressBar: {
    width: 63,
    height: 8,
    backgroundColor: "#33C6FD",
  },

  header: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 18,
    marginBottom: 16,
    width: "100%",
  },
  successRowsContainer: {
    gap: 28,
  },
  successDescriptionRow: {
    width: !isMobile ? 489 : "100%",
  },
  sucessIcon: {
    borderRadius: 8,
    width: 85,
    height: 85,
  },
  successRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#1E6759",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
  successName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D3D3D",
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 10,
    lineHeight: 24,
    color: "#3D3D3D",
  },

  headerTextContainer: {
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: 16,
  },
  progressBarContainer: {
    backgroundColor: "#989898",
    borderRadius: 4,
    marginHorizontal: 16,
  },
});
