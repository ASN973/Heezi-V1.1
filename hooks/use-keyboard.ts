import { useEffect } from "react";

export const useKbdNextStep = ({
  runnerRef,
  levelType,
  nextStep,
}: {
  runnerRef: { step: number };
  levelType: string;
  nextStep: () => void;
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (runnerRef.current.step > -2 && event.key === "Enter") {
        nextStep();
      }
    };

    // Add event listener
    if (typeof window !== "undefined" && levelType === "lesson") {
      window.addEventListener("keydown", handleKeyPress);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined" && levelType === "lesson") {
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [levelType]);
};
