import QuizBody from "@/components/practice-tools/quiz/quiz-body";
import { useEffect, useRef, useState } from "react";
import { arrGenWithProgress } from "@/utils/arrayGenerator";
import { router } from "expo-router";
import diagnosticData from "@/assets/levels/diagnostic.json";

import { db } from '@/utils/firebase';
import { doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '@/context/useAuth';

/*
  Logique globale du diagnostic :
  - Charge les questions depuis diagnostic.json (pas d'URL, pas de paramètres)
  - L'utilisateur sélectionne une réponse et clique sur "Vérifier"
  - Les questions sans bonne réponse (isThereAGoodAnswer: false) passent automatiquement
  - À la fin, calcule le score en points et recommande un niveau, puis sauvegarde dans Firestore
*/
async function checkDiagnostic(user) {
  // Check if the subcollection exists 
  const snap = await getDoc(doc(db, "users", user.uid,"diagnosticResult","result"));
  
  // Redirect to the diagnostic if not found else return the children
  if (snap.exists()) {
    router.replace("/play/");
  }
      
}

async function saveDiagnosticResult(user, scorePercent: number, recommendedLevel: number, profile: any[]) {
  if (!user) return;

  const ref = doc(db, "users", user.uid, "diagnosticResult", "result");

  const attempt = {
    scorePercent,
    recommendedLevel,
    profile,
    createdAt: new Date(),
  };

  await setDoc(ref, { attempts: arrayUnion(attempt) }, { merge: true });
}

// Calcule le niveau recommandé en fonction du score en %
function computeRecommendedLevel(score: number): number {
  if (score === 100) return 5;
  if (score >= 75) return 4;
  if (score >= 50) return 3;
  if (score >= 25) return 2;
  return 1;
}

// Create the type DiagnosticAnswer which is an array of a string and points
type DiagnosticAnswer = {
  topic: string;
  points: number;
};

// Create the type DiagnosticProfile which is an array composed of the question and his answer.
type DiagnosticProfile = {
  question: string;
  answer: []; 
}

export default function DiagnosticQuizScreen() {
  const steps = diagnosticData.tasks[0].steps;
  const { user, isLoading} = useAuth();
  
  // Redirects the user to the sign-in page if unauthenticated
  // Background task that verify if the user authenticated 
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/sign-in");
    }

    checkDiagnostic(user);
  }, [user, isLoading]);

  // Setting up Variables
  // Get the points in an array to compute it at the end
  const answersRef = useRef<DiagnosticAnswer[]>([]);
  const stepGeneratorRef = useRef<any>(null);
  const profileRef = useRef<DiagnosticProfile[]>([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState<any>({
    question: "",
    answers: [],
  });

  // Fix closure bug — toujours lire la question fraîche
  const currentStepRef = useRef(currentStep);
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  
  // Verify the answer
  const verifyAnswer = () => {
    
    if (selectedAnswerIndex === null) return;
    setIsVerified(true);
    
    const selectedAnswer = currentStepRef.current.answers[selectedAnswerIndex];
    
    // Question sans bonne réponse (profil, objectif...) → on passe sans comptabiliser
    if (currentStepRef.current.type === 'profile') {
      profileRef.current.push({
        question: currentStepRef.current.question,
        answer: selectedAnswer.text
      });
      
      nextStep(0);
      return;
    }
    
    setTimeout(() => {
      nextStep(selectedAnswer?.points ?? 0);
    }, 1000);
  };

  const nextStep = async (points: number = 0) => {

    if (currentStepRef.current.type != "profile") {
      answersRef.current.push({
        topic: currentStepRef.current.topic ?? "unknown",
        points,
      });
    }
    
    // We store the points of the nextStep
    //Go to the next question 
    const nextStepYield = stepGeneratorRef.current.next();

    if (nextStepYield.done) {
      // Quiz Ended
      
      // Points obtained by the user
      const earnedPoints = answersRef.current.reduce(
        (sum, a) => sum + (a.points ?? 0),
        0
      );
      
      // Checks the maximum of points it could give
      const maxPoints = steps.reduce((sum, step) => {
        if(step.type == "profile") return sum;
        const bestForStep = Math.max(
          0,
          ...(step.answers?.map(a => a.points ?? 0) ?? [])
            );
            
        return sum + bestForStep;
      }, 0);
      
      // Compute the scorePercent based on the maximum points you can have  
      const scorePercent = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
      const recommendedLevel = computeRecommendedLevel(scorePercent);

      // Save the results into the database
      await saveDiagnosticResult(user, scorePercent, recommendedLevel,profileRef.current);

      // Redirect the user to the HomePage
      router.push({
        pathname: "/mission/diagnostic/1/diagnosticResult",
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

  // Get the first Answer
  useEffect(() => {
    if (steps?.length) {
      stepGeneratorRef.current = arrGenWithProgress(steps);
      nextStep();
    }
  }, []);

  const handleNextAfterWrongAnswer = () => {
    if (selectedAnswerIndex == null) {
      nextStep(0);
      return;
    }
    
    const selectedAnswer = currentStepRef.current.answers[selectedAnswerIndex];
    nextStep(selectedAnswer?.points ?? 0);
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


//  Important points 
//  Add some questions
