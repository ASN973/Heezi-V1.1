import useTextEditorStore from "@/store/useTextEditorStore";

export default function useExportSpreadsheetValues() {
  // useLoadTextEditor();
  const { contentBlocks } = useTextEditorStore();
  return { contents: contentBlocks };
}
