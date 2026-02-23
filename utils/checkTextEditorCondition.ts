export default function checkTextEditorCondition(
  expected: any,
  getBlockById: (blockId: string | null) => any,
  selectedBlockId: string | null
) {
  if (!expected || !expected.type) {
    return false;
  }
  
  switch (expected.type) {
    case "blockText":
      return getBlockById(expected.blockId)?.text === expected.text;
    case "selectedBlock":
      console.log("got here");
      return selectedBlockId === expected.blockId;
    case "style":
      return (
        getBlockById(expected.blockId)?.style?.[expected.property] ===
        expected.value
      );
    default:
      return false;
  }
}
