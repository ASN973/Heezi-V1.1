import useCursor from "@/context/useCursor";
import useLevelData from "@/hooks/use-level-data";
import useTextEditorStore from "@/store/useTextEditorStore";
import { isMobile } from "@/utils/isMobile";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface TextInputBlockProps {
  item: any;
}

export default function TextInputBlock({ item }: TextInputBlockProps) {
  const { setBlockText, setSelectedBlockId } = useTextEditorStore();
  const {
    setContentRef,
    expected,
    currentStep: { focus },
  } = useCursor();
  const [isWrongAnswer, setIsWrongAnswer] = useState<boolean | null>(null);
  const blockRef = useRef<TextInput>(null);
  const { levelType } = useLevelData();

  useEffect(() => {
    if (setContentRef && item.blockId) {
      setContentRef(item.blockId, blockRef);
    }
  }, [setContentRef, item.blockId]);

  useEffect(() => {
    if (blockRef.current && focus && focus.elementId === item.blockId) {
      blockRef.current?.focus();
    }
  }, [item.blockId, focus, blockRef]);

  const handleBlur = () => {
    if (
      levelType === "practice" &&
      expected &&
      expected.type === "blockText" &&
      expected.blockId === item.blockId &&
      item.text.length &&
      expected?.text &&
      item.text !== expected.text
    ) {
      setIsWrongAnswer(true);
    } else {
      setIsWrongAnswer(false);
    }
  };

  const wrongAnswerStyle = {
    borderColor: "red",
    borderWidth: 2,
  };

  const focusedStyle =
    focus && focus.elementId === item.blockId
      ? {
          borderColor: "black",
          borderWidth: 2,
        }
      : {};

  return (
    <View style={[styles.textInputContainer, item.blockStyle]}>
      <TextInput
        style={[
          styles.textInput,
          styles.text,
          item.style,
          isWrongAnswer ? wrongAnswerStyle : {},
          focusedStyle,
        ]}
        editable={
          levelType === "practice" && expected?.blockId === item?.blockId
        }
        value={item.text}
        onChangeText={(inputText) => setBlockText(item.blockId, inputText)}
        onFocus={() => setSelectedBlockId(item.blockId)}
        placeholder={item.placeholder}
        placeholderTextColor="rgb(111, 111, 111)"
        ref={blockRef}
        onBlur={handleBlur}
        multiline={isMobile && item.multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 8,
    // marginHorizontal: 64,
  },
  textInput: {
    color: "#292929",
    marginLeft: 9,
    lineHeight: 24,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
  },
});
