import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const AnswerButton = ({
  answer,
  selectAnswer,
  index,
  selectedAnswerIndex,
  isVerified,
}: {
  answer: { text: string; isCorrect?: boolean };
  selectAnswer: (index: number) => void;
  index: number;
  selectedAnswerIndex: number | null;
  isVerified: boolean;
}) => {
  const { toolConstants } = usePracticeToolConstants();
  const isSelected = selectedAnswerIndex === index;
  const isWrongAnswer = isVerified && isSelected && !answer.isCorrect;
  const isCorrectAnswer = isVerified && answer.isCorrect;

  let buttonStyle = {};
  if (isSelected) {
    buttonStyle = { backgroundColor: toolConstants.color };
  }

  if (isWrongAnswer) {
    buttonStyle = styles.buttonWrong;
  } else if (isCorrectAnswer) {
    buttonStyle = [
      styles.buttonCorrect,
      { backgroundColor: toolConstants.color },
    ];
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => selectAnswer(index)}
      disabled={isVerified}
    >
      <Text style={styles.answerText}>{answer.text || "..."}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  buttonWrong: {
    backgroundColor: "#FF6B6B",
  },
  buttonCorrect: {
    borderWidth: 4,
    borderColor: "black",
  },
  answerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
    textAlign: "center",
  },
});
