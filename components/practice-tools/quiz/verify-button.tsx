import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export const VerifyButton = ({
  verifyAnswer,
  nextStep,
  isVerified,
  disabled,
  selectedAnswerIndex,
  answers,
}: {
  verifyAnswer: () => void;
  nextStep: () => void;
  isVerified: boolean;
  disabled: boolean;
  selectedAnswerIndex: number | null;
  answers: { text: string; isCorrect?: boolean }[];
}) => {
  const { toolConstants } = usePracticeToolConstants();
  // Check if the selected answer is correct
  const isCorrectAnswer =
    selectedAnswerIndex !== null &&
    answers[selectedAnswerIndex]?.isCorrect === true &&
    isVerified;

  // Hide button if answer is correct and verified (auto-advancing)

  return (
    <TouchableOpacity
      style={[
        styles.verifyButton,
        { backgroundColor: toolConstants.color },
        disabled ? styles.buttonDisabled : {},
      ]}
      onPress={isVerified ? nextStep : verifyAnswer}
      disabled={disabled || isCorrectAnswer}
    >
      <Text style={styles.text3}>{isVerified ? "Suivant" : "Vérifier"}</Text>
      <Image
        source={require("@/assets/images/tsy13i8h_expires_30_days.png")}
        resizeMode={"contain"}
        style={styles.triangleIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  verifyButton: {
    flexDirection: "row",

    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: "#989898",
  },
  triangleIcon: {
    borderRadius: 8,
    width: 16,
    height: 24,
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2924",
    marginRight: 10,
  },
});
