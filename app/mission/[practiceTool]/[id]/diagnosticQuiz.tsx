import QuizBody from "@/components/practice-tools/quiz/quiz-body";
import { arrGenWithProgress } from "@/utils/arrayGenerator";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import diagnosticData from "@/assets/levels/diagnostic.json";

/*
  Logique globale du diagnostic :
  - Charge les questions depuis diagnostic.json (pas d'URL, pas de paramètres)
  - L'utilisateur sélectionne une réponse et clique sur "Vérifier"
  - Si la réponse est correcte, passe à la question suivante après un court délai
  - Si la réponse est incorrecte, l'utilisateur peut réessayer
  - À la fin, calcule le score et recommande un niveau, puis sauvegarde dans Firestore
*/
// Calcule le niveau recommandé en fonction du score en %
function computeRecommendedLevel(score: number): number {
  if (score === 100) return 5; // niveau le plus élevé disponible
  if (score >= 75) return 4;
  if (score >= 50) return 3;
  if (score >= 25) return 2;
  return 1;
}

type DiagnosticAnswer = {
  topic: string;
  isCorrect: boolean;
};

export default function DiagnosticQuizScreen() {

  const steps = diagnosticData.tasks[0].steps; // Les questions du diagnostic

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState<any>({
    question: "",
    answers: [],
  });

  // Accumule les réponses de l'utilisateur pour calculer le score final
  const answersRef = useRef<DiagnosticAnswer[]>([]);

  const stepGeneratorRef = useRef<any>(null);

  const verifyAnswer = () => {
    console.log(currentStep);
    if (selectedAnswerIndex === null) return;
    setIsVerified(true);  
    const selectedAnswer = currentStep.answers[selectedAnswerIndex];

    // Sometimes the question does not have a good answers and is based on the user
    // so i added this to not trigger the user
    if (!currentStep.isThereAGoodAnswer){
      console.log("Skipping bcz no good answer + ", currentStep);    
      nextStep(true);
      return;
    }

    if (selectedAnswer?.isCorrect) {
      setTimeout(() => {
        nextStep(true);
      }, 500);
    }
  };

  // nextStep reçoit maintenant isCorrect pour accumuler les réponses
  const nextStep = (isCorrect: boolean = false) => {
    // On enregistre la réponse de la question qui vient de se terminer
    // (sauf au tout premier appel depuis useEffect où il n'y a pas encore de question)
    if (currentStep.question !== "") {
      answersRef.current.push({
        topic: currentStep.topic ?? "unknown",
        isCorrect,
      });
    }

    const nextStepYield = stepGeneratorRef.current.next();

    if (nextStepYield.done) {
      // Quiz terminé — on calcule le score
      const total = answersRef.current.length;
      const correct = answersRef.current.filter((a) => a.isCorrect).length;
      const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;
      const recommendedLevel = computeRecommendedLevel(scorePercent);

      // TODO (Option B) : sauvegarder dans Firestore ici
      // await saveDiagnosticResult({ score: scorePercent, recommendedLevel, answers: answersRef.current });

      router.push({
        pathname: "/diagnostic-result",
        params: {
          score: scorePercent,
          recommendedLevel,
        },
      });
      return;
    }

    setSelectedAnswerIndex(null);
    setIsVerified(false);
    setCurrentStep({
      ...nextStepYield.value.value,
      progress: nextStepYield.value.percent,
    });
  };

  useEffect(() => {
    if (steps?.length) {
      stepGeneratorRef.current = arrGenWithProgress(steps);
      nextStep(); // Charge la première question
    }
  }, []);

  // Si l'utilisateur clique sur "Suivant" après une mauvaise réponse
  const handleNextAfterWrongAnswer = () => {
    nextStep(false);
  };

  return (
    <QuizBody
      progress={currentStep?.progress}
      currentStep={currentStep}
      selectAnswer={(index: number) => setSelectedAnswerIndex(index)}
      selectedAnswerIndex={selectedAnswerIndex}
      verifyAnswer={verifyAnswer}
      nextStep={handleNextAfterWrongAnswer}
      isVerified={isVerified}
    />
  );
}
