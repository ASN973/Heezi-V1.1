export const getElementBottomHeight = (
  contentsRefs: any,
  elementId: string
) => {
  const ref = contentsRefs.current[elementId];
  if (ref && ref.current) {
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    return rect.top + rect.height;
  }
};

export const getElementTopPosition = (
  contentsRefs: any,
  elementId: string,
  offset: number = 0
) => {
  const ref = contentsRefs.current[elementId];
  if (ref && ref.current) {
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    // offset lets callers keep a gap or account for their own height
    return rect.top - offset;
  }
};
