import CustomAnimation from "@/components/animations/CustomAnimation";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnswerButton } from "./answer-button";
import TopBar from "./top-bar";
import { VerifyButton } from "./verify-button";

const QuestionBox = ({ question }: { question: string }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
};

function AnswersBox({
  answers,
  selectAnswer,
  selectedAnswerIndex,
  isVerified,
}: {
  answers: { text: string; isCorrect?: boolean }[];
  selectAnswer: (index: number) => void;
  selectedAnswerIndex: number | null;
  isVerified: boolean;
}) {
  return (
    <View style={styles.answersContainer}>
      {answers.map((answer, index) => (
        <AnswerButton
          key={index}
          answer={answer}
          selectAnswer={selectAnswer}
          index={index}
          selectedAnswerIndex={selectedAnswerIndex}
          isVerified={isVerified}
        />
      ))}
    </View>
  );
}

export default function QuizBody({
  selectAnswer,
  currentStep,
  selectedAnswerIndex,
  verifyAnswer,
  nextStep,
  isVerified,
  progress,
}: {
  selectAnswer: (index: number) => void;
  currentStep: {
    question: string;
    answers: { text: string; isCorrect?: boolean }[];
  };
  selectedAnswerIndex: number | null;
  verifyAnswer: () => void;
  nextStep: () => void;
  isVerified: boolean;
  progress: number;
}) {
  const { question, answers } = currentStep;
  const disabled = selectedAnswerIndex === null;
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.mainContainer, { height: height || "100%" }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.mainContent}
      >
        <TopBar progress={progress} />
        <View style={styles.questionAndAnswersContainer}>
          <QuestionBox question={question} />

          <View style={styles.mascotContainer}>
            <CustomAnimation
              animationData={require("@/assets/animations/MascotteQuiz.json")}
            />
          </View>

          <AnswersBox
            answers={answers}
            selectAnswer={selectAnswer}
            selectedAnswerIndex={selectedAnswerIndex}
            isVerified={isVerified}
          />
        </View>
        <VerifyButton
          verifyAnswer={verifyAnswer}
          nextStep={nextStep}
          isVerified={isVerified}
          disabled={disabled}
          selectedAnswerIndex={selectedAnswerIndex}
          answers={answers}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 16,
    justifyContent: "space-between",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    padding: 8,
  },
  questionContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292929",
  },
  answersAndVerifyContainer: {
    gap: 16,
  },
  mascotContainer: {
    alignSelf: "flex-start",
  },
  answersContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    padding: 16,
  },
  questionAndAnswersContainer: { gap: 16 },
});
