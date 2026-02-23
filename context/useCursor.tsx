import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Define your context state type here
// Example: cursor position
type CursorState = {
  x: number;
  y: number;
};

// Define your context value type
type CursorContextType = {
  cursorRef: React.RefObject<any>;
  cursorPosition: CursorState;
  moveCursor: (elementId: string, offsetX?: number, offsetY?: number) => void;
  setContentRef: (id: string, ref: any) => void;
  contentsRefs: { [key: string]: any };
  hideCursor: () => void;
  showCursor: () => void;
  animatedStyle: any;
  expected: any;
  setExpected: (expected: any) => void;
  currentStep: any;
  setCurrentStep: (currentStep: any) => void;
};

// Create the context with default values
const CursorContext = createContext<CursorContextType>({
  cursorRef: { current: null },
  cursorPosition: { x: 0, y: 0 },
  moveCursor: () => {},
  setContentRef: () => {},
  contentsRefs: {},
  hideCursor: () => {},
  showCursor: () => {},
  animatedStyle: {},
  expected: null,
  setExpected: () => {},
  currentStep: null,
  setCurrentStep: () => {},
});

// Provider component
export function CursorProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<any>({});
  const [expected, setExpected] = useState<any>(null);
  const cursorRef = useRef<any>(null);

  const contentsRefs = useRef<{ [key: string]: any }>({});

  const setContentRef = (id: string, ref: any) => {
    contentsRefs.current[id] = ref;
  };

  const getElementCenter = (elementId: string) => {
    const ref = contentsRefs.current[elementId];
    if (ref && ref.current) {
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      // return { x: rect.left, y: rect.top };
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: 0, y: 0 };
  };

  const moveCursor = (elementId: string) => {
    showCursor();
    const center = getElementCenter(elementId);
    animateToPosition(center.x, center.y);
  };

  const hideCursor = () => {
    cursorRef.current.style.visibility = "hidden";
  };

  const showCursor = () => {
    cursorRef.current.style.visibility = "visible";
  };

  // Initialize at bottom left of screen
  const animatedX = useSharedValue(0);
  const animatedY = useSharedValue(Dimensions.get("window").height - 20);

  const animateToPosition = (x: number, y: number) => {
    animatedX.value = withTiming(x, {
      duration: 800,
    });
    animatedY.value = withTiming(y, {
      duration: 800,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: animatedX.value,
      top: animatedY.value,
    };
  });

  return (
    <CursorContext.Provider
      value={{
        cursorRef,
        moveCursor,
        setContentRef,
        contentsRefs,
        hideCursor,
        showCursor,
        animatedStyle,
        expected,
        setExpected,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

// Custom hook to use the context
export default function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
