export const rangeToCells = (range: string) => {
  // range is like "A1:A3"
  // return an array of cells like ["A1", "A2", "A3"]
  const [start, end] = range.split(":");

  // Extract column letters and row numbers from start cell
  const startMatch = start.match(/^([A-Z]+)(\d+)$/);
  if (!startMatch) throw new Error(`Invalid start cell: ${start}`);
  const startColumn = startMatch[1];
  const startRow = parseInt(startMatch[2]);

  // Extract column letters and row numbers from end cell
  const endMatch = end.match(/^([A-Z]+)(\d+)$/);
  if (!endMatch) throw new Error(`Invalid end cell: ${end}`);
  const endColumn = endMatch[1];
  const endRow = parseInt(endMatch[2]);

  const cells: string[] = [];
  for (let row = startRow; row <= endRow; row++) {
    for (
      let column: number = startColumn.charCodeAt(0);
      column <= endColumn.charCodeAt(0);
      column++
    ) {
      cells.push(`${String.fromCharCode(column)}${row}`);
    }
  }
  return cells;
};

const isCellKey = (cellExpression: string) => {
  //check if cellExpression is a valid cell key like "A1", "A10"
  return /^[A-Z]+\d+$/.test(cellExpression);
};

const isRangeOfCellKeys = (cellExpression: string) => {
  //check if cellExpression is a valid range of cell keys like "A1:A10"
  return /^[A-Z]+\d+:[A-Z]+\d+$/.test(cellExpression);
};

const parseCellExpression = (cellExpression: string): string[] => {
  if (isCellKey(cellExpression)) {
    return [cellExpression];
  } else if (isRangeOfCellKeys(cellExpression)) {
    return rangeToCells(cellExpression);
  } else {
    throw new Error(`Invalid cell expression: ${cellExpression}`);
  }
};

export const parseCellsExpressions = (argCells: string[]): string[] => {
  const finalCells: string[] = [];

  if (argCells)
    argCells.forEach((cellExpression) => {
      finalCells.push(...parseCellExpression(cellExpression));
    });

  return finalCells;
};

export const getCellUnderneath = (cell: string) => {
  const column = cell.split("")[0];
  const row = parseInt(cell.split("")[1]);
  return `${column}${row + 1}`;
};
