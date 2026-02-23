const MIME_TYPE = "application/vnd.ms-excel";
const UTF8_BOM = "\ufeff";

export function exportXlsx(
  title,
  contents: { value: unknown; style: { [key: string]: any } }[][]
): void {
  if (!contents.length) {
    throw new Error("Nothing to export");
  }

  const tableRows = contents
    .map((row) => {
      const cells = row
        .map((cell) => {
          const cellStyle = getCellStyleAttributes(cell?.style);
          const content = formatCellContent(cell);
          return `<td${cellStyle}>${content}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  const html = `${UTF8_BOM}<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Heezi Spreadsheet Export</title>
      <style>
        table {
          border-collapse: collapse;
        }

        td {
          border: 1px solid #c7d5d1;
          padding: 8px 12px;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <table>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
  </html>`;

  const blob = new Blob([html], { type: MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = `Heezi - ${title}.xls`;

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value.toString() : "";
  }

  return String(value);
}

function isBoldFontWeight(fontWeight: unknown): boolean {
  if (typeof fontWeight === "number") {
    return fontWeight >= 600;
  }

  if (fontWeight === null || fontWeight === undefined) {
    return false;
  }

  const normalized = String(fontWeight).trim().toLowerCase();

  if (normalized === "bold" || normalized === "bolder") {
    return true;
  }

  const numericValue = Number.parseInt(normalized, 10);
  return Number.isFinite(numericValue) && numericValue >= 600;
}

function formatCellContent(cell: {
  value: unknown;
  style?: { [key: string]: any };
}): string {
  const text = escapeHtml(formatCellValue(cell.value));
  const fontWeight =
    cell?.style?.fontWeight ??
    cell?.style?.fontweight ??
    cell?.style?.["font-weight"];

  if (isBoldFontWeight(fontWeight)) {
    return `<strong>${text}</strong>`;
  }

  return text;
}

function getCellStyleAttributes(
  style: { [key: string]: any } | undefined
): string {
  if (!style) {
    return "";
  }

  const attributes: string[] = [];

  const fontWeight =
    style.fontWeight ?? style.fontweight ?? style["font-weight"];

  if (isBoldFontWeight(fontWeight)) {
    attributes.push("font-weight:bold;");
  }

  if (!attributes.length) {
    return "";
  }

  return ` style="${attributes.join(" ")}"`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
