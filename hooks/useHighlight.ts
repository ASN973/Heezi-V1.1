import useCursor from "@/context/useCursor";

export default function useHighlight(elementId: string) {
  const {
    currentStep: { highlight },
  } = useCursor();

  const isHighlighted = highlight?.elementId?.includes(elementId);

  console.log("elementId", elementId);
  console.log("highlight", highlight);
  console.log("isHighlighted", isHighlighted);
  const hightlightedStyleDef = {
    borderColor: "red",
    borderWidth: 6,
    borderStyle: "dotted",
  };

  const hightlightedStyle = isHighlighted ? hightlightedStyleDef : {};

  return { isHighlighted, hightlightedStyle };
}
