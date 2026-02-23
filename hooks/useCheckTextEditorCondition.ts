import useTextEditorStore from "@/store/useTextEditorStore";
import { useEffect } from "react";

export default function useCheckTextEditorCondition({
  stepExpectedRef,
}: {
  stepExpectedRef: any;
}) {
  const { getBlockById, selectedBlockId } = useTextEditorStore();

  useEffect(() => {
    console.log("stepExpectedType", stepExpectedRef.current?.type);
    console.log("stepExpectedRef", stepExpectedRef.current?.blockId);
    console.log("selectedBlockId", selectedBlockId);
  }, [selectedBlockId, stepExpectedRef]);

  return () => {
    switch (stepExpectedRef.current.type) {
      case "blockText":
        return (
          getBlockById(stepExpectedRef.current.blockId)?.text ===
          stepExpectedRef.current.text
        );
      case "selectedBlock":
        console.log("got here");
        return selectedBlockId === stepExpectedRef.current.blockId;
      case "style":
        return (
          getBlockById(stepExpectedRef.current.blockId)?.style?.[
            stepExpectedRef.current.property
          ] === stepExpectedRef.current.value
        );
      default:
        return false;
    }
  };
}
