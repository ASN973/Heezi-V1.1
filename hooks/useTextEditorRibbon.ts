import useTextEditorStore from "@/store/useTextEditorStore";

export default function useTextEditorRibbon() {
  const { selectedBlockId, setBlockStyle, getBlockById } = useTextEditorStore();

  const selectedBlock = getBlockById(selectedBlockId);
  const isSelectedBlockBold =
    (selectedBlockId !== null && selectedBlock?.style?.fontWeight === "bold") ||
    false;

  const boldSelectedBlock = () => {
    if (selectedBlockId !== null) {
      setBlockStyle(
        selectedBlockId,
        isSelectedBlockBold ? { fontWeight: "normal" } : { fontWeight: "bold" }
      );
    }
  };

  return {
    isSelectedBlockBold,
    boldSelectedBlock,
  };
}
