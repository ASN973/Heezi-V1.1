import QuizBody from "@/components/practice-tools/quiz/quiz-body";
import useLevelData from "@/hooks/use-level-data";
import useCompletedLevelsStore from "@/store/useCompletedLevels";
import { arrGenWithProgress } from "@/utils/arrayGenerator";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

export const dynamicParams = false;
{/*
  Logique globale:
   - Récupeère les donées du niveau
   - Récupère la première question du quizz à partir des données du niveau
   - L'utilisateur sélectionne une réponse et clique sur "Vérifier"
   - Si la réponse est correcte, passe à la question suivante après un court délai
   - Si la réponse est incorrecte, l'utilisateur peut réessayer  

*/}
export default function QuizScreen() {

  const { tasks, levelNumber } = useLevelData();   // sert à importer les données du quizz
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  ); // Choix de l'utilisateur, null si aucune réponse n'est sélectionnée
  const [isVerified, setIsVerified] = useState(false); // Indique si la réponse sélectionnée a été vérifiée
  const { practiceTool, id } = useLocalSearchParams();
  const { setLevelCompleted } = useCompletedLevelsStore();
  
  //Question actuelle affichée dans le quiz, avec sa structure (question, réponses, etc.)
  const [currentStep, setCurrentStep] = useState<any>({
    question: "",
    answers: [],
  });

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

  // Il utilise un générateur pour parcourir les questions de manière séquentielle. Si le générateur est épuisé (plus de questions), il marque le niveau comme complété et redirige vers la page de résultat. 
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

  // Cherche les données du quizz à partir du `useLevelData` hook, puis initialise le générateur de steps avec `arrGenWithProgress` dès que les données sont disponibles. Ensuite, appelle `nextStep()` pour charger la première question du quiz.
  useEffect(() => {
    if (tasks?.length && id && practiceTool) {
      stepGeneratorRef.current = arrGenWithProgress(tasks[0].steps); // Récupère la première question du quizz à partir des données du niveau
      nextStep();
    }
  }, [tasks]);

  return (
    <QuizBody
      progress={currentStep?.progress} //Barre de progression du quiz, calculée par le générateur en fonction du nombre de questions restantes et du total
      currentStep={currentStep} //La question actuelle affichée dans le quiz, avec sa structure (question, réponses, etc.)
      selectAnswer={(index: number) => setSelectedAnswerIndex(index)} // Fonction pour mettre à jour l'index de la réponse sélectionnée par l'utilisateur
      selectedAnswerIndex={selectedAnswerIndex} //L'index de la réponse actuellement sélectionnée par l'utilisateur, ou null si aucune réponse n'est sélectionnée
      verifyAnswer={verifyAnswer} //fonction pour vérifier si la réponse sélectionnée est correcte et mettre à jour l'état en conséquence
      nextStep={nextStep} //fonction pour passer à la question suivante du quiz, ou terminer le quiz si toutes les questions ont été répondues
      isVerified={isVerified} //fonction qui vérifie si l'utilisateur à cliqué sur verifié 
    />
  );
}
