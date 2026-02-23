import { ScrollableScreen } from "@/components/scrollable-screen";
import WatermarkAbsolute from "@/components/ui/watermark";
import { isMobile } from "@/utils/isMobile";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HeaderSection() {
  return (
    <View style={styles.headerRow}>
      <View style={styles.levelAndProgress}>
        <Text style={styles.text}>{"Niveau. 1"}</Text>
        <View style={styles.progressBar}></View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => {}} disabled>
        <Image
          source={require("@/assets/images/profiladd.png")}
          resizeMode={"contain"}
          style={styles.addIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {}}
        disabled
      >
        <Image
          source={require("@/assets/images/profilSettings.png")}
          resizeMode={"contain"}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function ProfilScreen() {
  return (
    <ScrollableScreen
      style={styles.mainContainer}
      contentContainerStyle={styles.mainContainerContent}
    >
      <View style={styles.mainContent}>
        <HeaderSection />

        <View style={styles.body}>
          <Image
            source={require("@/assets/images/ProfilMascot.png")}
            resizeMode={"contain"}
            style={styles.mascotImage}
          />
          <View style={styles.statsContainer}>
            <Text style={styles.profileNameText}>{"Nom du profil"}</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.text}>{"0/6 succès débloqués (0%)"}</Text>
              <View style={styles.progressBar}></View>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.text}>{"Progression dans le jeu (0%)"}</Text>
              <View style={styles.progressBar}></View>
            </View>
            <View style={styles.rankContainer}>
              <Image
                source={require("@/assets/images/Rank.png")}
                resizeMode={"contain"}
                style={styles.rankIcon}
              />
              <View style={styles.rankTextContainer}>
                <Text style={styles.rankText}>{"Rang bronze"}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <WatermarkAbsolute text="BIENTÔT DISPONIBLE" />
    </ScrollableScreen>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContainerContent: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingBottom: isMobile ? 32 : 0,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#33C6FD",
    marginHorizontal: isMobile ? 8 : 16,
    flex: 1,
  },
  addButton: {
    width: isMobile ? 70 : 97,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 18,
    marginRight: isMobile ? 4 : 9,
  },
  settingsButton: {
    width: isMobile ? 50 : 67,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 18,
  },
  mainContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingTop: 32,
    paddingBottom: 32,
    marginHorizontal: isMobile ? 16 : 32,
    shadowColor: "#249079",
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  levelAndProgress: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
    marginRight: isMobile ? 8 : 16,
  },
  statsContainer: {
    width: isMobile ? "100%" : 520,
  },
  progressContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
    width: "100%",
  },
  addIcon: {
    borderRadius: 8,
    width: 65,
    height: 36,
  },
  settingsIcon: {
    borderRadius: 8,
    width: 36,
    height: 36,
  },
  mascotImage: {
    width: isMobile ? "100%" : 520,
    height: isMobile ? 200 : 306,
    marginRight: isMobile ? 0 : 16,
    marginBottom: isMobile ? 16 : 0,
  },
  rankIcon: {
    borderRadius: 8,
    width: 41,
    height: 51,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    marginBottom: 32,
    marginHorizontal: isMobile ? 16 : 32,
  },
  headerButtonsRow: {
    width: 173,
    flexDirection: "row",
  },
  body: {
    flexDirection: !isMobile ? "row" : "column",
    marginHorizontal: isMobile ? 16 : 32,
    alignItems: isMobile ? "center" : undefined,
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDEFC8",
    borderRadius: 8,
    paddingVertical: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
    marginBottom: 8,
    marginLeft: 16,
  },
  profileNameText: {
    fontSize: 22,
    color: "#0A2924",
    marginBottom: 16,
  },
  rankText: {
    fontSize: 22,
    color: "#B2460B",
  },

  rankTextContainer: {
    width: 162,
    alignItems: "center",
  },
});
