import { getCellUnderneath, parseCellsExpressions } from "./spreadsheetUtils";

test("parse one cell key correctly", () => {
  expect(parseCellsExpressions(["A1"])).toEqual(["A1"]);
});

test("parses cells expressions correctly", () => {
  expect(parseCellsExpressions(["A1:A15"])).toEqual([
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
  ]);
});

test.only("get next cell correctly", () => {
  expect(getCellUnderneath("A1")).toEqual("A2");
});
