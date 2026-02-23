import useCursor from "@/context/useCursor";
import { getElementTopPosition } from "@/utils/cursorUtils";
import { isMobile } from "@/utils/isMobile";
import { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

export default function useMascotBubble() {
  const {
    currentStep: { cursor, mascotPosition: forcedMascotPosition },
    contentsRefs,
  } = useCursor();
  const { height: windowHeight } = useWindowDimensions();
  const [baseWindowHeight, setBaseWindowHeight] = useState(windowHeight);
  const [componentHeight, setComponentHeight] = useState<number>(300); // Default fallback
  const [mascotPosition, setMascotPosition] = useState<ViewStyle>({
    bottom: 0,
  });

  // Keep the largest observed window height so keyboard shrink doesn't pull the bubble down
  useEffect(() => {
    setBaseWindowHeight((prev) => Math.max(prev, windowHeight));
  }, [windowHeight]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setComponentHeight(height);
  };

  const padding = 20;
  const minBottom = 0;
  const effectiveWindowHeight = Math.max(baseWindowHeight, windowHeight);
  const maxBottom = Math.max(
    minBottom,
    effectiveWindowHeight - componentHeight - padding
  );
  useEffect(() => {
    if (isMobile && forcedMascotPosition) {
      setMascotPosition(forcedMascotPosition);
    } else {
      if (cursor && contentsRefs && cursor.elementId) {
        const elementTop =
          cursor.elementId && contentsRefs.current[cursor.elementId]
            ? getElementTopPosition(contentsRefs, cursor.elementId)
            : undefined;

        const calculatedBottomStyle =
          elementTop !== undefined
            ? {
                top: undefined,
                bottom: Math.max(
                  minBottom,
                  Math.min(effectiveWindowHeight - elementTop + 8, maxBottom)
                ),
              }
            : { bottom: 0 };
        setMascotPosition(calculatedBottomStyle);
      }
    }
  }, [
    componentHeight,
    cursor,
    contentsRefs,
    maxBottom,
    minBottom,
    forcedMascotPosition,
    windowHeight,
    baseWindowHeight,
    effectiveWindowHeight,
  ]);
  return { handleLayout, mascotPosition };
}
