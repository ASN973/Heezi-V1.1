import useTextEditorStore from "@/store/useTextEditorStore";

export default function useRunTextEditorPreActions() {
  const {
    setBlockText,
    setSelectedBlockId: setSelectedBlockIndex,
    setBlockStyle,
  } = useTextEditorStore();
  const runPreAction = (preAction: any) => {
    switch (preAction.type) {
      case "blockText":
        setBlockText(preAction.blockId, preAction.text);
        break;
      case "selectBlock":
        setSelectedBlockIndex(preAction.blockId);
        break;
      case "style":
        setBlockStyle(preAction.blockId, preAction.value);
        break;
    }
  };
  return (preActionsArr: any[]) => preActionsArr.map(runPreAction);
}
