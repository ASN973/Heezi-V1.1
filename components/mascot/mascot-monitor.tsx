import useCursor from "@/context/useCursor";
import useLevelData from "@/hooks/use-level-data";
import useCompletedLevelsStore from "@/store/useCompletedLevels";
import arrayGenerator from "@/utils/arrayGenerator";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Cursor from "./cursor";
import { MascotBubble } from "./mascot-bubble";
import MascotModal from "./mascot-modal";

export default function MascotMonitor({
  runPreActions,
  practiceToolData,
  checkConditionCallback,
}: {
  runPreActions: (preActions: any[]) => void;
  practiceToolData: any;
  checkConditionCallback: (expected: any) => boolean;
}) {
  const router = useRouter();
  const { practiceTool, id } = useLocalSearchParams();

  const { tasks, levelType, levelNumber } = useLevelData();
  const { moveCursor, hideCursor, setExpected, currentStep, setCurrentStep } =
    useCursor();
  const { setLevelCompleted } = useCompletedLevelsStore();
  const [modalText, setModalText] = useState<string | null>(null);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const stepExpectedRef = useRef<any>(null);

  // ---------------------

  const taskGeneratorRef = useRef<any>(null);
  const currentTaskRef = useRef<any>(null);
  const stepGeneratorRef = useRef<any>(null);

  const setNextTask = useCallback(() => {
    const nextTaskYield = taskGeneratorRef.current.next();
    if (nextTaskYield.done) {
      setLevelCompleted(levelNumber, practiceTool);
      router.push(`/mission/${practiceTool}/${id}/result`);
    } else {
      currentTaskRef.current = nextTaskYield.value;
      stepGeneratorRef.current = arrayGenerator(currentTaskRef.current.steps);
      setModalText(currentTaskRef.current.intro);
    }
  }, [router, practiceTool, id]);

  const setNextStep = useCallback(() => {
    const nextStepYield = stepGeneratorRef.current.next();
    if (nextStepYield.done) {
      setBubbleText("");
      setNextTask();
    } else {
      setCurrentStep(nextStepYield.value);
    }
  }, [setNextTask, setCurrentStep]);

  useEffect(() => {
    if (currentStep) {
      const { tip, preActions, cursor } = currentStep;
      setBubbleText(tip?.text2 || "");
      if (preActions) runPreActions(preActions);
      if (cursor && cursor.elementId) {
        moveCursor(cursor.elementId, cursor.x || 0, cursor.y || 0);
      }
    }
  }, [
    currentStep,
    runPreActions,
    levelType,
    stepExpectedRef,
    moveCursor,
    hideCursor,
  ]);

  useEffect(() => {
    if (currentStep && currentStep.expected) {
      setExpected(currentStep.expected);
      if (checkConditionCallback(currentStep.expected)) setNextStep();
    }
  }, [currentStep, practiceToolData, setNextStep, checkConditionCallback]);

  useEffect(() => {
    if (tasks) {
      taskGeneratorRef.current = arrayGenerator(tasks);
      setNextTask();
    }
  }, [tasks, setNextTask]);

  return (
    <View style={styles.container}>
      {!!bubbleText && (
        <MascotBubble bubbleText={bubbleText} nextStep={setNextStep} />
      )}
      <MascotModal
        open={!!modalText?.trim()}
        onClose={() => {
          setModalText("");
          setNextStep();
        }}
        modalText={modalText}
      />
      <Cursor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "box-none",
  },
});
