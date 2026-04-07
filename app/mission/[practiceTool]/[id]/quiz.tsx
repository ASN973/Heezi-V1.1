import QuizBody from "@/components/practice-tools/quiz/quiz-body";
import useLevelData from "@/hooks/use-level-data";
import useCompletedLevelsStore from "@/store/useCompletedLevels";
import { arrGenWithProgress } from "@/utils/arrayGenerator";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

export const dynamicParams = false;

export default function QuizScreen() {
  const { tasks, levelNumber } = useLevelData();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [isVerified, setIsVerified] = useState(false);
  const { practiceTool, id } = useLocalSearchParams();
  const { setLevelCompleted } = useCompletedLevelsStore();

  const verifyAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsVerified(true);
    const selectedAnswer = currentStep.answers[selectedAnswerIndex];
    if (selectedAnswer?.isCorrect) {
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  //*/************** */

  const [currentStep, setCurrentStep] = useState<any>({
    question: "",
    answers: [],
  });
  const stepGeneratorRef = useRef<any>(null);

  const nextStep = () => {
    // Pull the next value from the step generator (created with `arrGenWithProgress`).
    // `nextStepYield` has the shape returned by a generator `.next()` call:
    // { done: boolean, value: { value: Step, percent: number } }
    const nextStepYield = stepGeneratorRef.current.next();

    // If the generator is finished (`done === true`), mark the level completed
    // and navigate to the results screen for this practiceTool/id.
    if (nextStepYield.done) {
      setLevelCompleted(levelNumber, practiceTool);
      router.push(`/mission/${practiceTool}/${id}/result`);
      return;
    }

    // Otherwise, prepare the next step:
    // - reset the selected answer and verification state so the UI is fresh
    // - set `currentStep` to the yielded step object and attach `progress`
    //   (the generator yields both the step as `value` and a `percent` field)
    setSelectedAnswerIndex(null);
    setIsVerified(false);
    setCurrentStep({
      ...nextStepYield.value.value,
      progress: nextStepYield.value.percent,
    });
  };

  useEffect(() => {
    if (tasks?.length && id && practiceTool) {
      stepGeneratorRef.current = arrGenWithProgress(tasks[0].steps);
      nextStep();
    }
  }, [tasks]);

  return (
    <QuizBody
      progress={currentStep?.progress}
      currentStep={currentStep}
      selectAnswer={(index: number) => setSelectedAnswerIndex(index)}
      selectedAnswerIndex={selectedAnswerIndex}
      verifyAnswer={verifyAnswer}
      nextStep={nextStep}
      isVerified={isVerified}
    />
  );
}
