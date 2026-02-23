import WatermarkAbsolute from "@/components/ui/watermark";
import { isMobile } from "@/utils/isMobile";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function HeaderSection() {
  return (
    <View style={styles.tropheebanner}>
      <View style={styles.tropheeRow}>
        <Image
          source={require("@/assets/images/Bronze.png")}
          resizeMode={"stretch"}
          style={styles.trophee1}
        />
        <Image
          source={require("@/assets/images/Argent.png")}
          resizeMode={"stretch"}
          style={styles.trophee2}
        />
        <Image
          source={require("@/assets/images/Or.png")}
          resizeMode={"stretch"}
          style={styles.trophee2}
        />
        <Image
          source={require("@/assets/images/Diamant.png")}
          resizeMode={"stretch"}
          style={styles.trophee3}
        />
      </View>
      <View style={styles.rankBanner}>
        <Text style={styles.bronzeText}>{"Bronze"}</Text>
        <Text style={styles.rankIndication}>
          {
            "Les participants dans le top 10 se verront attribuer un nouveau rang "
          }
        </Text>
        <Text style={styles.daysLeft}>{"7 jours restants"}</Text>
      </View>
    </View>
  );
}

function RankingListSection() {
  return (
    <View style={styles.rankingList}>
      <View style={styles.rankingButtonsRow}>
        <TouchableOpacity
          style={[styles.rankingButton, styles.rankingButton1]}
          onPress={() => {}}
          disabled
        >
          <Text style={styles.text4}>{"Classement Global"}</Text>
        </TouchableOpacity>
        <View style={[styles.rankingButton, styles.rankingButton2]}>
          <Text style={styles.text5}>{"Classement de votre session"}</Text>
        </View>
      </View>

      <View style={styles.rankingListContainer}>
        {[...Array(7)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.rankeeRow, index === 1 && styles.youRankedRow]}
            onPress={() => {}}
            disabled
          >
            <View style={styles.rankNumberContainer}>
              <Text style={styles.rankNumber}>{`${index + 1}.`}</Text>
              <Image
                source={require("@/assets/images/Coq.png")}
                resizeMode={"contain"}
                style={styles.coqIcon}
              />
              <Text style={styles.text7}>
                {index === 1 ? "Vous" : "Autre joueur"}
              </Text>
            </View>
            <View>
              <Text style={styles.text8}>{"Nv. ?"}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function ScoreScreen() {
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.mainContainerContent}
      >
        <HeaderSection />
        <View style={styles.bodySection}>
          <RankingListSection />
          <Image
            source={require("@/assets/images/ScoreIcon.png")}
            resizeMode={"contain"}
            style={styles.scoreIcon}
          />
        </View>

        <WatermarkAbsolute text="BIENTÔT DISPONIBLE" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  rankingListContainer: {
    paddingHorizontal: 16,
    alignItems: "stretch",
    width: "100%",
  },
  rankNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollview: { paddingHorizontal: 16 },
  mainContainerContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: isMobile ? 8 : 16,
    width: "100%",
  },
  mainContent: {},

  rankeeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: isMobile ? 8 : 0,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  buttonRow2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#72D6BA",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonRow3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
  },
  column: {
    margin: 32,
  },
  tropheebanner: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
  },
  rankBanner: {
    alignItems: "center",
    paddingHorizontal: isMobile ? 16 : 305,
    marginHorizontal: 16,
  },
  rankingList: {
    width: isMobile ? "100%" : 552,
    marginRight: isMobile ? 0 : 16,
    alignItems: "center",
  },
  column5: {
    width: 552,
    backgroundColor: "#DCDCDC",
    borderRadius: 8,
    paddingBottom: 1,
  },
  trophee1: {
    borderRadius: 8,
    width: 68,
    height: 68,
    marginLeft: isMobile ? 0 : 511,
    marginRight: 8,
  },
  trophee2: {
    borderRadius: 8,
    width: 36,
    height: 36,
    marginRight: 8,
  },
  trophee3: {
    borderRadius: 8,
    width: 36,
    height: 36,
    marginRight: isMobile ? 8 : 376,
  },
  coqIcon: {
    borderRadius: 8,
    width: isMobile ? 32 : 40,
    height: isMobile ? 32 : 40,
    marginRight: isMobile ? 8 : 16,
  },
  scoreIcon: {
    flex: 1,
    marginTop: 24,
    marginLeft: isMobile ? 0 : 34,
    alignSelf: isMobile ? "center" : undefined,
    height: isMobile ? 300 : undefined,
  },
  tropheeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 37,
    marginBottom: 16,
    marginHorizontal: 16,
    flexWrap: isMobile ? "wrap" : "nowrap",
    justifyContent: isMobile ? "center" : "flex-start",
  },
  bodySection: {
    flexDirection: !isMobile ? "row" : "column-reverse",
  },
  rankingButtonsRow: {
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
    paddingHorizontal: isMobile ? 8 : 0,
    justifyContent: "center",
    gap: 8,
  },
  bronzeText: {
    fontSize: isMobile ? 18 : 22,
    color: "#292929",
    marginBottom: 8,
    fontWeight: "bold",
  },
  rankIndication: {
    fontSize: isMobile ? 14 : 16,
    lineHeight: 24,
    color: "#292929",
    marginBottom: 8,
    textAlign: "center",
  },
  daysLeft: {
    fontSize: isMobile ? 16 : 18,
    fontWeight: "bold",
    color: "#292929",
  },
  text4: {
    fontSize: isMobile ? 16 : 18,
    fontWeight: "bold",
    color: "#0A2924",
    textAlign: "center",
  },
  text5: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2924",
    marginLeft: isMobile ? 8 : 16,
    width: isMobile ? undefined : 224,
    flex: isMobile ? 1 : undefined,
    textAlign: isMobile ? "center" : "left",
  },
  rankNumber: {
    fontSize: isMobile ? 18 : 22,
    color: "#292929",
    marginLeft: isMobile ? 8 : 16,
    marginRight: isMobile ? 12 : 20,
  },
  text7: {
    fontSize: isMobile ? 12 : 14,
    fontWeight: "bold",
    color: "#292929",
    flex: 1,
  },
  text8: {
    fontSize: isMobile ? 14 : 18,
    fontWeight: "bold",
    color: "#292929",
    marginRight: isMobile ? 8 : 20,
  },
  text9: {
    fontSize: 22,
    color: "#1B463E",
    marginLeft: 16,
    marginRight: 20,
  },
  text10: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B463E",
    flex: 1,
  },
  text11: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B463E",
    marginRight: 20,
  },
  youRankedRow: {
    backgroundColor: "#72D6BA",
  },
  rankingButton: {
    width: isMobile ? "48%" : 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
  },
  rankingButton1: {
    backgroundColor: "#72D6BA",
  },
  rankingButton2: {
    backgroundColor: "white",
  },
});
