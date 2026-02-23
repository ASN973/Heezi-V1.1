const MARGIN = 48;
const HEADING_OFFSET = 56;
const ROW_HEIGHT = 64;
const JSPDF_SCRIPT_ID = "jspdf-cdn-script";
const JSPDF_CDN_URL =
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js";

const SPACING_KEYS_BY_PROPERTY: Record<string, string[]> = {
  marginTop: ["marginTop", "marginVertical", "margin"],
  marginBottom: ["marginBottom", "marginVertical", "margin"],
  marginLeft: ["marginLeft", "marginHorizontal", "margin"],
  marginRight: ["marginRight", "marginHorizontal", "margin"],
  paddingTop: ["paddingTop", "paddingVertical", "padding"],
  paddingBottom: ["paddingBottom", "paddingVertical", "padding"],
  paddingLeft: ["paddingLeft", "paddingHorizontal", "padding"],
  paddingRight: ["paddingRight", "paddingHorizontal", "padding"],
  gap: ["gap"],
};

type JsPDFConstructor = typeof import("jspdf")["jsPDF"];

declare global {
  interface Window {
    jspdf?: { jsPDF: JsPDFConstructor };
  }
}

let jsPdfPromise: Promise<JsPDFConstructor> | null = null;

async function loadJsPdfFromCdn(): Promise<JsPDFConstructor> {
  if (typeof window === "undefined") {
    throw new Error("PDF export is only supported in a browser environment.");
  }

  if (window.jspdf?.jsPDF) {
    return window.jspdf.jsPDF;
  }

  if (!jsPdfPromise) {
    jsPdfPromise = new Promise<JsPDFConstructor>((resolve, reject) => {
      const scriptId = JSPDF_SCRIPT_ID;
      const existingScript = document.getElementById(
        scriptId
      ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (window.jspdf?.jsPDF) {
            resolve(window.jspdf.jsPDF);
          } else {
            reject(new Error("Failed to initialize jsPDF from CDN."));
          }
        });
        existingScript.addEventListener("error", () => {
          reject(new Error("Failed to load jsPDF CDN script."));
        });
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = JSPDF_CDN_URL;
      script.async = true;
      script.onload = () => {
        if (window.jspdf?.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error("Failed to initialize jsPDF from CDN."));
        }
      };
      script.onerror = () => {
        reject(new Error("Failed to load jsPDF CDN script."));
      };
      document.body.appendChild(script);
    });
  }

  return jsPdfPromise;
}

export async function exportSpreadsheetPdf(
  title: string,
  contents: { value: unknown; style: { [key: string]: any } }[][]
): Promise<void> {
  if (!contents.length) {
    throw new Error("Nothing to export");
  }

  const columnCount = contents[0]?.length ?? 0;

  if (!columnCount) {
    throw new Error("No columns detected");
  }

  const jsPDF = await loadJsPdfFromCdn();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const availableWidth = pageWidth - MARGIN * 2;
  const columnWidth = availableWidth / columnCount;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(10, 41, 36);
  doc.text("Mission Tableur n°1", MARGIN, MARGIN);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(96, 131, 123);
  doc.setDrawColor(199, 213, 209);

  let cursorY = MARGIN + HEADING_OFFSET;

  contents.forEach((cellsRow, rowIndex) => {
    if (cursorY + ROW_HEIGHT > pageHeight - MARGIN) {
      doc.addPage();
      cursorY = MARGIN;
    }

    cellsRow.forEach((cell, columnIndex) => {
      const x = MARGIN + columnIndex * columnWidth;
      const displayValue = formatCellValue(cell?.value || "");

      doc.rect(x, cursorY - 18, columnWidth, ROW_HEIGHT, "S");

      const fontWeight = cell?.style?.fontWeight;
      const useBoldFont = isBoldFontWeight(fontWeight);

      doc.setFont("helvetica", useBoldFont ? "bold" : "normal");
      doc.setFontSize(13);
      doc.setTextColor(10, 41, 36);

      const textWidth = columnWidth - 20;
      const content = displayValue.length ? displayValue : " ";
      const wrapped = doc.splitTextToSize(content, textWidth);
      doc.text(wrapped, x + 10, cursorY - 6, {
        baseline: "top",
        lineHeightFactor: 1.2,
      });
    });

    cursorY += ROW_HEIGHT;
  });

  const filename = `Heezi - ${title}.pdf`;

  doc.save(filename);
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

export async function exportTextEditorPdf(
  title: string,
  contents: TextEditorBlock[]
): Promise<void> {
  if (!contents.length) {
    throw new Error("Nothing to export");
  }

  const jsPDF = await loadJsPdfFromCdn();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const context: PdfRenderContext = {
    doc,
    pageWidth,
    pageHeight,
    margin: MARGIN,
    cursorY: MARGIN,
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(10, 41, 36);
  doc.text("Mission Editeur de texte n°1", MARGIN, MARGIN);

  context.cursorY += HEADING_OFFSET;

  renderBlocks(contents, context, MARGIN);

  const filename = `Heezi - ${title}.pdf`;

  doc.save(filename);
}

type PdfDoc = InstanceType<JsPDFConstructor>;

interface PdfRenderContext {
  doc: PdfDoc;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  cursorY: number;
}

interface TextEditorBlock {
  type?: string;
  text?: string;
  value?: string;
  placeholder?: string;
  blockStyle?: { [key: string]: any };
  style?: { [key: string]: any };
  children?: TextEditorBlock[];
}

function renderBlocks(
  blocks: TextEditorBlock[],
  context: PdfRenderContext,
  indent: number
) {
  if (!Array.isArray(blocks)) {
    return;
  }

  blocks.forEach((child) => {
    renderBlock(child, context, indent);
  });
}

function renderBlock(
  block: TextEditorBlock,
  context: PdfRenderContext,
  indent: number
) {
  if (!block) {
    return;
  }

  switch (block.type) {
    case "view":
      renderViewBlock(block, context, indent);
      return;
    case "text":
    case "textInput":
    default:
      if (block.children?.length) {
        renderViewBlock(block, context, indent);
        return;
      }
      renderTextLikeBlock(block, context, indent);
  }
}

function renderViewBlock(
  block: TextEditorBlock,
  context: PdfRenderContext,
  indent: number
) {
  const marginTop = extractSpacing(block.style, "marginTop");
  const marginBottom = extractSpacing(block.style, "marginBottom");
  const paddingTop = extractSpacing(block.style, "paddingTop");
  const paddingBottom = extractSpacing(block.style, "paddingBottom");
  const paddingLeft = extractSpacing(block.style, "paddingLeft");
  const marginLeft = extractSpacing(block.style, "marginLeft");
  const gap = extractSpacing(block.style, "gap");
  const flexDirection = (block.style?.flexDirection as string) ?? "column";

  const childIndent = indent + marginLeft + paddingLeft;
  const topSpacing = marginTop + paddingTop;

  if (
    flexDirection === "row" &&
    block.children?.length &&
    block.children.every((child) => isInlineRenderable(child))
  ) {
    const inlineLayouts = block.children.map((child) =>
      measureInlineTextBlock(child, context)
    );
    const inlineContentHeight = getInlineRowHeight(inlineLayouts);
    const totalHeight =
      topSpacing + inlineContentHeight + paddingBottom + marginBottom;

    ensureSpace(context, totalHeight);
    addVerticalSpacing(context, topSpacing);
    renderInlineRow(inlineLayouts, context, childIndent, gap);
    context.cursorY += inlineContentHeight;
    addVerticalSpacing(context, paddingBottom + marginBottom);
    return;
  }

  addVerticalSpacing(context, topSpacing);

  if (block.children?.length) {
    block.children.forEach((child, index) => {
      if (index > 0 && gap && flexDirection !== "row") {
        addVerticalSpacing(context, gap);
      }
      renderBlock(child, context, childIndent);
    });
  }

  addVerticalSpacing(context, paddingBottom + marginBottom);
}

function renderInlineRow(
  layouts: InlineTextBlockLayout[],
  context: PdfRenderContext,
  indent: number,
  gap: number
) {
  const baseY = context.cursorY;
  const doc = context.doc;

  let cursorX = indent;

  layouts.forEach((layout, index) => {
    cursorX += layout.marginLeft + layout.paddingLeft;

    const textY = baseY + layout.marginTop + layout.paddingTop;

    doc.setFont("helvetica", layout.fontVariant);
    doc.setFontSize(layout.fontSize);
    doc.setTextColor(
      layout.textColor[0],
      layout.textColor[1],
      layout.textColor[2]
    );

    doc.text(layout.textLines, cursorX, textY, {
      baseline: "top",
      lineHeightFactor: layout.lineHeightFactor,
    });

    cursorX += layout.textWidth + layout.paddingRight + layout.marginRight;

    if (index < layouts.length - 1 && gap) {
      cursorX += gap;
    }
  });
}

function isInlineRenderable(block: TextEditorBlock): boolean {
  if (!block) {
    return false;
  }

  if (block.children?.length) {
    return false;
  }

  return block.type === "text" || block.type === "textInput";
}

interface InlineTextBlockLayout {
  block: TextEditorBlock;
  textLines: string[];
  fontVariant: "normal" | "bold" | "italic" | "bolditalic";
  fontSize: number;
  textColor: [number, number, number];
  lineHeightFactor: number;
  textWidth: number;
  textHeight: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
}

function measureInlineTextBlock(
  block: TextEditorBlock,
  context: PdfRenderContext
): InlineTextBlockLayout {
  const textStyle = block?.style ?? {};
  const containerStyle = block?.blockStyle ?? {};

  const fontSize = extractFontSize(textStyle.fontSize) ?? 16;
  const fontWeight = textStyle.fontWeight;
  const fontStyle = textStyle.fontStyle;
  const fontVariant = getFontVariant(fontWeight, fontStyle);
  const textColor = parseColor(textStyle.color) ?? [41, 41, 41];
  const lineHeightFactor =
    extractLineHeight(textStyle.lineHeight, fontSize) ?? 1.35;

  const marginLeft = extractSpacing(containerStyle, "marginLeft");
  const marginRight = extractSpacing(containerStyle, "marginRight");
  const marginTop = extractSpacing(containerStyle, "marginTop");
  const marginBottom = extractSpacing(containerStyle, "marginBottom");
  const paddingLeft = extractSpacing(containerStyle, "paddingLeft");
  const paddingRight = extractSpacing(containerStyle, "paddingRight");
  const paddingTop = extractSpacing(containerStyle, "paddingTop");
  const paddingBottom = extractSpacing(containerStyle, "paddingBottom");

  const content = getBlockText(block);
  const textLines = [content ?? " "];

  const doc = context.doc;
  const previousFont = doc.getFont();
  const previousFontSize = doc.getFontSize();

  doc.setFont("helvetica", fontVariant);
  doc.setFontSize(fontSize);

  const textWidth = Math.max(
    ...textLines.map((line) => doc.getTextWidth(line ?? ""))
  );
  const textHeight = textLines.length * fontSize * lineHeightFactor;

  doc.setFont(previousFont.fontName, previousFont.fontStyle);
  doc.setFontSize(previousFontSize);

  return {
    block,
    textLines,
    fontVariant,
    fontSize,
    textColor,
    lineHeightFactor,
    textWidth,
    textHeight,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  };
}

function getInlineRowHeight(layouts: InlineTextBlockLayout[]): number {
  return layouts.reduce((maxHeight, layout) => {
    const totalHeight =
      layout.marginTop +
      layout.paddingTop +
      layout.textHeight +
      layout.paddingBottom +
      layout.marginBottom;
    return Math.max(maxHeight, totalHeight);
  }, 0);
}

function renderTextLikeBlock(
  block: TextEditorBlock,
  context: PdfRenderContext,
  indent: number
) {
  if (block?.type === "view") {
    renderViewBlock(block, context, indent);
    return;
  }

  const textStyle = block?.style ?? {};
  const containerStyle = block?.blockStyle ?? {};

  const hasAutoMarginTop = hasAutoSpacing(containerStyle, "marginTop");
  const marginTop = hasAutoMarginTop
    ? 0
    : extractSpacing(containerStyle, "marginTop");
  const marginBottom = extractSpacing(containerStyle, "marginBottom");
  const paddingTop = extractSpacing(containerStyle, "paddingTop");
  const paddingBottom = extractSpacing(containerStyle, "paddingBottom");
  const paddingLeft = extractSpacing(containerStyle, "paddingLeft");
  const marginLeftContainer = extractSpacing(containerStyle, "marginLeft");
  const marginLeftText = extractSpacing(textStyle, "marginLeft");
  const paddingLeftText = extractSpacing(textStyle, "paddingLeft");

  const fontSize = extractFontSize(textStyle.fontSize) ?? 16;
  const fontWeight = textStyle.fontWeight;
  const fontStyle = textStyle.fontStyle;
  const textAlign = (textStyle.textAlign as PdfTextAlign) ?? "left";
  const textColor = parseColor(textStyle.color) ?? [41, 41, 41];
  const lineHeightFactor =
    extractLineHeight(textStyle.lineHeight, fontSize) ?? 1.35;

  const indentOffset =
    indent +
    paddingLeft +
    marginLeftContainer +
    marginLeftText +
    paddingLeftText;

  let availableWidth = context.pageWidth - indentOffset - context.margin;
  if (availableWidth <= 0) {
    availableWidth = context.pageWidth - context.margin * 2;
  }

  const content = getBlockText(block);
  const doc = context.doc;

  doc.setFont("helvetica", getFontVariant(fontWeight, fontStyle));
  doc.setFontSize(fontSize);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  const textLines = Array.isArray(content)
    ? content
    : doc.splitTextToSize(content ?? " ", availableWidth);

  const blockHeight = textLines.length * fontSize * lineHeightFactor;

  const heightAfterCursor =
    paddingTop + blockHeight + paddingBottom + marginBottom;
  const totalHeight =
    marginTop + paddingTop + blockHeight + paddingBottom + marginBottom;

  if (hasAutoMarginTop) {
    ensureSpace(context, heightAfterCursor);
    const spaceRemaining =
      context.pageHeight - context.margin - context.cursorY - heightAfterCursor;
    const autoSpacing = Math.max(spaceRemaining, 0);
    addVerticalSpacing(context, autoSpacing + paddingTop);
  } else {
    const topSpacing = marginTop + paddingTop;
    ensureSpace(context, totalHeight);
    addVerticalSpacing(context, topSpacing);
  }

  const x = getAlignedX(
    textAlign,
    indentOffset,
    context.pageWidth,
    context.margin,
    availableWidth
  );

  doc.text(textLines, x, context.cursorY, {
    baseline: "top",
    align: textAlign,
    lineHeightFactor,
  });

  context.cursorY += blockHeight;
  addVerticalSpacing(context, paddingBottom + marginBottom);
}

type PdfTextAlign = "left" | "center" | "right" | "justify";

function getAlignedX(
  align: PdfTextAlign,
  indent: number,
  pageWidth: number,
  margin: number,
  availableWidth: number
): number {
  switch (align) {
    case "center":
      return pageWidth / 2;
    case "right":
      return pageWidth - margin;
    default:
      return indent;
  }
}

function addVerticalSpacing(context: PdfRenderContext, spacing: number) {
  if (!spacing) {
    return;
  }

  ensureSpace(context, spacing);
  context.cursorY += spacing;
}

function ensureSpace(context: PdfRenderContext, heightNeeded: number) {
  if (context.cursorY + heightNeeded <= context.pageHeight - context.margin) {
    return;
  }

  context.doc.addPage();
  context.cursorY = context.margin;
}

type StyleObject = { [key: string]: any } | undefined;

function extractSpacing(
  style: StyleObject | StyleObject[],
  property: string
): number {
  const styles = Array.isArray(style) ? style : [style];

  for (const current of styles) {
    const value = extractSpacingFromObject(current, property);
    if (value !== null) {
      return value;
    }
  }

  return 0;
}

function extractSpacingFromObject(
  style: { [key: string]: any } | undefined,
  property: string
): number | null {
  if (!style) {
    return null;
  }

  const keys = SPACING_KEYS_BY_PROPERTY[property] ?? [property];

  for (const key of keys) {
    const rawValue = style[key];
    const value = parseDimension(rawValue);
    if (value !== null) {
      return toPt(value);
    }
  }

  return null;
}

function hasAutoSpacing(
  style: StyleObject | StyleObject[],
  property: string
): boolean {
  const styles = Array.isArray(style) ? style : [style];

  for (const current of styles) {
    if (hasAutoSpacingInObject(current, property)) {
      return true;
    }
  }

  return false;
}

function hasAutoSpacingInObject(
  style: { [key: string]: any } | undefined,
  property: string
): boolean {
  if (!style) {
    return false;
  }

  const keys = SPACING_KEYS_BY_PROPERTY[property] ?? [property];

  for (const key of keys) {
    if (isAutoValue(style[key])) {
      return true;
    }
  }

  return false;
}

function isAutoValue(value: unknown): boolean {
  return typeof value === "string" && value.trim().toLowerCase() === "auto";
}

function extractFontSize(fontSize: unknown): number | null {
  const value = parseDimension(fontSize);
  return value !== null ? toPt(value) : null;
}

function extractLineHeight(
  lineHeight: unknown,
  fontSize: number
): number | null {
  if (lineHeight === null || lineHeight === undefined) {
    return null;
  }

  if (typeof lineHeight === "number") {
    if (lineHeight > 10) {
      return toPt(lineHeight) / fontSize;
    }
    if (lineHeight > 0) {
      return lineHeight;
    }
  }

  if (typeof lineHeight === "string") {
    const trimmed = lineHeight.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.endsWith("%")) {
      const percent = Number.parseFloat(trimmed.slice(0, -1));
      if (Number.isFinite(percent) && percent > 0) {
        return percent / 100;
      }
    }

    const dimension = parseDimension(trimmed);
    if (dimension !== null) {
      return toPt(dimension) / fontSize;
    }
  }

  return null;
}

function parseDimension(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    return null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed || trimmed === "auto") {
      return null;
    }

    if (trimmed.endsWith("px")) {
      const parsed = Number.parseFloat(trimmed.slice(0, -2));
      return Number.isFinite(parsed) ? parsed : null;
    }

    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toPt(value: number): number {
  return value * 0.75;
}

function parseColor(value: unknown): [number, number, number] | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value) && value.length >= 3) {
    const [r, g, b] = value.map((component) =>
      Math.max(0, Math.min(255, Number(component) || 0))
    );
    return [r, g, b];
  }

  if (typeof value !== "string") {
    return null;
  }

  const hexMatch = value.trim().match(/^#?([a-f0-9]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }

  const rgbMatch = value
    .trim()
    .match(/^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+).*?\)$/i);
  if (rgbMatch) {
    return [
      Number.parseFloat(rgbMatch[1]),
      Number.parseFloat(rgbMatch[2]),
      Number.parseFloat(rgbMatch[3]),
    ].map((component) => Math.max(0, Math.min(255, Math.round(component)))) as [
      number,
      number,
      number
    ];
  }

  return null;
}

function getFontVariant(
  fontWeight: unknown,
  fontStyle: unknown
): "normal" | "bold" | "italic" | "bolditalic" {
  const isBold = isBoldFontWeight(fontWeight);
  const isItalic =
    typeof fontStyle === "string" &&
    fontStyle.trim().toLowerCase() === "italic";

  if (isBold && isItalic) {
    return "bolditalic";
  }

  if (isBold) {
    return "bold";
  }

  if (isItalic) {
    return "italic";
  }

  return "normal";
}

function getBlockText(block: TextEditorBlock): string {
  const baseText =
    block?.text ??
    (typeof block?.value === "string" ? (block.value as string) : "");

  if (typeof baseText === "string" && baseText.trim().length > 0) {
    return baseText;
  }

  if (block?.placeholder) {
    return `[${block.placeholder}]`;
  }

  return " ";
}
