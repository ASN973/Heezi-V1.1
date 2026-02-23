const DOCX_CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

const DOCX_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const DOCX_DOCUMENT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

const DOCX_STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
</w:styles>`;

type TextEditorBlock = {
  type?: string;
  text?: string;
  value?: string;
  placeholder?: string;
  style?: Record<string, unknown>;
  blockStyle?: Record<string, unknown>;
  children?: TextEditorBlock[];
};

type DocParagraph = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  spacingBefore?: number;
  spacingAfter?: number;
};

let jsZipPromise: Promise<typeof import("jszip")> | null = null;

async function loadJsZip() {
  if (!jsZipPromise) {
    jsZipPromise = import("jszip");
  }

  return jsZipPromise;
}

export async function exportTextEditorDocx(
  title,
  contents: TextEditorBlock[]
): Promise<void> {
  if (!contents.length) {
    throw new Error("Nothing to export");
  }

  if (typeof window === "undefined") {
    throw new Error("DOCX export is only supported in a browser environment.");
  }

  const JSZipModule = await loadJsZip();
  const JSZipConstructor = JSZipModule.default ?? JSZipModule;
  const zip = new JSZipConstructor();

  zip.file("[Content_Types].xml", DOCX_CONTENT_TYPES);
  zip.folder("_rels")?.file(".rels", DOCX_RELS);

  const wordFolder = zip.folder("word");
  wordFolder?.file("_rels/document.xml.rels", DOCX_DOCUMENT_RELS);

  const docParagraphs = collectParagraphs(contents);
  const documentXml = buildDocumentXml(docParagraphs);
  wordFolder?.file("document.xml", documentXml);
  wordFolder?.file("styles.xml", DOCX_STYLES);

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const filename = `Heezi - ${title}.docx`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function collectParagraphs(blocks: TextEditorBlock[]): DocParagraph[] {
  const paragraphs = blocks.flatMap((block) => extractParagraphs(block, false));

  if (!paragraphs.length) {
    return [{ text: "" }];
  }

  return paragraphs;
}

function extractParagraphs(
  block: TextEditorBlock | undefined,
  inlineContext: boolean
): DocParagraph[] {
  if (!block) {
    return [];
  }

  if (block.children?.length) {
    const flexDirection = getFlexDirection(block);
    if (flexDirection === "row") {
      const segments = block.children.flatMap((child) =>
        extractParagraphs(child, true)
      );

      const text = segments
        .map((segment) => segment.text.trim())
        .filter((segmentText) => segmentText.length)
        .join(" ");

      if (!text.length) {
        return [];
      }

      const paragraph: DocParagraph = {
        text,
        bold: segments.some((segment) => segment.bold),
        italic: segments.some((segment) => segment.italic),
      };

      applyBlockSpacing([paragraph], block);
      return [paragraph];
    }

    const childParagraphs = block.children.flatMap((child) =>
      extractParagraphs(child, inlineContext)
    );
    applyBlockSpacing(childParagraphs, block);
    return childParagraphs;
  }

  const rawText = getBlockText(block);
  const text = inlineContext ? rawText.trim() : rawText.trimEnd();

  if (!text.length) {
    return [];
  }

  const { bold, italic } = getFormatting(block);
  const paragraph: DocParagraph = { text };
  if (bold) {
    paragraph.bold = true;
  }
  if (italic) {
    paragraph.italic = true;
  }

  applyBlockSpacing([paragraph], block);
  return [paragraph];
}

function buildDocumentXml(paragraphs: DocParagraph[]): string {
  const bodyContent = paragraphs
    .map((paragraph) => createParagraphXml(paragraph))
    .join("");
  const bodyXml = bodyContent || "<w:p/>";

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
            xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
            xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:w10="urn:schemas-microsoft-com:office:word"
            xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
            xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
            xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
            xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
            xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
            mc:Ignorable="w14 wp14">
  <w:body>${bodyXml}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/><w:cols w:space="720"/><w:docGrid w:type="lines" w:linePitch="360"/></w:sectPr></w:body>
</w:document>`;
}

function createParagraphXml(paragraph: DocParagraph): string {
  const pPrParts: string[] = [];

  if (paragraph.spacingBefore || paragraph.spacingAfter) {
    const attrs: string[] = [];
    if (paragraph.spacingBefore) {
      attrs.push(`w:before="${paragraph.spacingBefore}"`);
    }
    if (paragraph.spacingAfter) {
      attrs.push(`w:after="${paragraph.spacingAfter}"`);
    }
    if (attrs.length) {
      pPrParts.push(`<w:spacing ${attrs.join(" ")}/>`);
    }
  }

  const pPr = pPrParts.length ? `<w:pPr>${pPrParts.join("")}</w:pPr>` : "";

  const runProps =
    paragraph.bold || paragraph.italic
      ? `<w:rPr>${paragraph.bold ? "<w:b/>" : ""}${
          paragraph.italic ? "<w:i/>" : ""
        }</w:rPr>`
      : "";
  const runs = createRuns(paragraph);

  return `<w:p>${pPr}<w:r>${runProps}${runs}</w:r></w:p>`;
}

function createRuns(paragraph: DocParagraph): string {
  const fragments = paragraph.text.split(/\r?\n/);

  return fragments
    .map((fragment, index) => {
      const escaped = escapeXml(fragment || " ");
      const textTag = `<w:t xml:space="preserve">${escaped}</w:t>`;
      const breakTag = index < fragments.length - 1 ? "<w:br/>" : "";
      return `${textTag}${breakTag}`;
    })
    .join("");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getFlexDirection(block: TextEditorBlock): "row" | "column" {
  const raw = pickStyleValue(block, ["flexDirection", "flex-direction"]);

  if (typeof raw === "string") {
    const normalized = raw.trim().toLowerCase();
    if (normalized.startsWith("row")) {
      return "row";
    }
  }

  return "column";
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

  return "";
}

function getFormatting(block: TextEditorBlock): {
  bold: boolean;
  italic: boolean;
} {
  const fontWeight = pickStyleValue(block, [
    "fontWeight",
    "fontweight",
    "font-weight",
  ]);
  const fontStyle = pickStyleValue(block, [
    "fontStyle",
    "fontstyle",
    "font-style",
  ]);

  return {
    bold: isBoldFontWeight(fontWeight),
    italic: isItalicFontStyle(fontStyle),
  };
}

function pickStyleValue(
  block: TextEditorBlock,
  keys: string[]
): unknown | undefined {
  const sources = [block.style, block.blockStyle];

  for (const source of sources) {
    if (!source) {
      continue;
    }

    for (const key of keys) {
      const record = source as Record<string, unknown>;
      const value = record[key];
      if (value !== undefined && value !== null) {
        return value;
      }
    }
  }

  return undefined;
}

function applyBlockSpacing(
  paragraphs: DocParagraph[],
  block: TextEditorBlock
): void {
  if (!paragraphs.length) {
    return;
  }

  const { before, after } = getBlockSpacing(block);

  if (before) {
    const first = paragraphs[0];
    first.spacingBefore = (first.spacingBefore ?? 0) + before;
  }

  if (after) {
    const last = paragraphs[paragraphs.length - 1];
    last.spacingAfter = (last.spacingAfter ?? 0) + after;
  }
}

function getBlockSpacing(block: TextEditorBlock): {
  before: number;
  after: number;
} {
  const beforePx = extractSpacing(block, "marginTop");
  const afterPx = extractSpacing(block, "marginBottom");

  return {
    before: convertPxToTwips(beforePx),
    after: convertPxToTwips(afterPx),
  };
}

function extractSpacing(
  block: TextEditorBlock,
  property: "marginTop" | "marginBottom"
): number {
  const keys =
    property === "marginTop"
      ? ["marginTop", "marginVertical", "margin"]
      : ["marginBottom", "marginVertical", "margin"];

  const value = pickStyleValue(block, keys);

  return normalizeSpacingValue(value);
}

function normalizeSpacingValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed || trimmed === "auto") {
      return 0;
    }

    const match = trimmed.match(/^-?\d+(\.\d+)?/);
    if (match) {
      const parsed = Number.parseFloat(match[0]);
      if (Number.isFinite(parsed)) {
        return Math.max(0, parsed);
      }
    }
  }

  return 0;
}

function convertPxToTwips(px: number): number {
  if (!px) {
    return 0;
  }

  const twips = Math.round(px * 15);
  return twips > 0 ? twips : 0;
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

function isItalicFontStyle(fontStyle: unknown): boolean {
  if (typeof fontStyle !== "string") {
    return false;
  }

  return fontStyle.trim().toLowerCase() === "italic";
}
