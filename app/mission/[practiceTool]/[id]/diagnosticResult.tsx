import CustomAnimation from "@/components/animations/CustomAnimation";
import { EndLevelReport } from "@/components/result/EndLevelReport";
import { ButtonWithArrow } from "@/components/ui/ButtonWithArrow";
import characters from "@/constants/characters";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/*
  Logique globale du résultat diagnostic :
  - Reçoit le score et le niveau recommandé depuis diagnostic-quiz.tsx via les params
  - Affiche un message adapté selon le score
  - Redirige vers l'accueil après
*/

function getReportContent(score: number, recommendedLevel: number) {
  if (score === 100) {
    return {
      title: "Impressionnant ! 🌟",
      description: `Tu maîtrises déjà le numérique ! On te propose de commencer au niveau ${recommendedLevel}.`,
    };
  }
  if (score >= 75) {
    return {
      title: "Très bien ! 👏",
      description: `Tu as de bonnes bases ! On te propose de commencer au niveau ${recommendedLevel}.`,
    };
  }
  if (score >= 50) {
    return {
      title: "Pas mal ! 😊",
      description: `Tu connais déjà quelques notions. On te propose de commencer au niveau ${recommendedLevel}.`,
    };
  }
  if (score >= 25) {
    return {
      title: "C'est un début ! 💪",
      description: `On va apprendre ensemble pas à pas. On te propose de commencer au niveau ${recommendedLevel}.`,
    };
  }
  return {
    title: "Bienvenue ! 🎉",
    description: `Pas d'inquiétude, on commence depuis le début ensemble. On te propose le niveau ${recommendedLevel}.`,
  };
}

export default function DiagnosticResultScreen() {
  const { score, recommendedLevel } = useLocalSearchParams<{
    score: string;
    recommendedLevel: string;
  }>();

  const scoreNumber = parseInt(score ?? "0");
  const levelNumber = parseInt(recommendedLevel ?? "1");

  const { title, description } = getReportContent(scoreNumber, levelNumber);

  const goToHome = () => {
    router.replace("/(tabs)/play");
  };

  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.mainContainer, { height: height || "100%" }]}>
      <View style={styles.mainContent}>
        <View style={styles.animationBox}>
          <CustomAnimation
            animationData={characters["coq"]?.fin || ""}
          />
        </View>
        <View>
          <EndLevelReport
            title={title}
            description={description}
          />
          <ButtonWithArrow text={"Commencer"} onPress={goToHome} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { alignItems: "center" },
  mainContent: {
    backgroundColor: "white",
    alignItems: "stretch",
    flex: 1,
    padding: 16,
    margin: 16,
  },
  animationBox: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
});
