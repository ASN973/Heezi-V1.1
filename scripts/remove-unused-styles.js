#!/usr/bin/env node

/**
 * Script to remove unused styles from React Native StyleSheet definitions
 *
 * Usage:
 *   node scripts/remove-unused-styles.js [file-path]
 *   node scripts/remove-unused-styles.js --all
 *   node scripts/remove-unused-styles.js --dry-run
 *
 * Options:
 *   --all      Process all TypeScript/JavaScript files in the project
 *   --dry-run  Show what would be removed without making changes
 *   --help     Show this help message
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

class UnusedStylesRemover {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
    this.backup = options.backup || false;
  }

  /**
   * Find all TypeScript and JavaScript files with StyleSheet definitions
   */
  findStyleSheetFiles(directory = ".") {
    const patterns = ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"].filter(
      (pattern) => {
        // Exclude node_modules and build directories
        return !pattern.includes("node_modules") && !pattern.includes("build");
      }
    );

    const files = [];
    patterns.forEach((pattern) => {
      files.push(
        ...glob.sync(pattern, {
          cwd: directory,
          ignore: ["node_modules/**", "build/**", "dist/**", ".git/**"],
        })
      );
    });

    return files;
  }

  /**
   * Parse a file and extract StyleSheet usage information
   */
  parseFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Find StyleSheet.create calls - improved regex to handle multiline and nested structures
      const styleSheetRegex =
        /(?:const|let|var)\s+(\w+)\s*=\s*StyleSheet\.create\s*\(\s*\{/gs;
      const matches = [...content.matchAll(styleSheetRegex)];

      if (matches.length === 0) {
        return null;
      }

      const result = {
        filePath,
        content,
        styleSheets: [],
      };

      matches.forEach((match) => {
        const stylesVarName = match[1];
        const startPos = match.index;

        // Find the matching closing brace for StyleSheet.create({ ... })
        const styleSheetBlock = this.extractStyleSheetBlock(content, startPos);

        if (!styleSheetBlock) {
          return;
        }

        // Extract style definitions using proper bracket matching
        const styleDefinitions = this.extractStyleDefinitions(
          styleSheetBlock.content
        );

        // Find all usages of this styles object (improved detection)
        const usages = this.findStyleUsages(content, stylesVarName);

        result.styleSheets.push({
          varName: stylesVarName,
          definitions: styleDefinitions,
          usages: usages,
          fullMatch: styleSheetBlock.fullMatch,
          startIndex: styleSheetBlock.startIndex,
          endIndex: styleSheetBlock.endIndex,
          contentStartOffset: styleSheetBlock.startOffset,
        });
      });

      return result;
    } catch (error) {
      console.error(`Error parsing file ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * Extract the complete StyleSheet.create block using bracket matching
   */
  extractStyleSheetBlock(content, startPos) {
    // Find the opening brace after StyleSheet.create(
    let pos = startPos;
    let bracePos = content.indexOf("{", pos);

    if (bracePos === -1) {
      return null;
    }

    // Find matching closing brace
    let depth = 0;
    let inString = false;
    let stringChar = null;
    let i = bracePos;

    while (i < content.length) {
      const char = content[i];
      const prevChar = i > 0 ? content[i - 1] : "";

      // Handle string literals
      if (!inString && (char === '"' || char === "'" || char === "`")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && prevChar !== "\\") {
        inString = false;
        stringChar = null;
      }

      if (!inString) {
        if (char === "{") {
          depth++;
        } else if (char === "}") {
          depth--;
          if (depth === 0) {
            // Found the matching closing brace
            const endPos = i + 1;
            // Check if there's a closing parenthesis and semicolon
            let finalEnd = endPos;
            while (
              finalEnd < content.length &&
              /[\s\n]/.test(content[finalEnd])
            ) {
              finalEnd++;
            }
            if (content[finalEnd] === ")") {
              finalEnd++;
              while (
                finalEnd < content.length &&
                /[\s\n]/.test(content[finalEnd])
              ) {
                finalEnd++;
              }
              if (content[finalEnd] === ";") {
                finalEnd++;
              }
            }

            return {
              content: content.substring(bracePos + 1, i),
              fullMatch: content.substring(startPos, finalEnd),
              startIndex: startPos,
              endIndex: finalEnd,
              startOffset: bracePos + 1,
            };
          }
        }
      }

      i++;
    }

    return null;
  }

  /**
   * Extract style definitions from StyleSheet content using proper bracket matching
   */
  extractStyleDefinitions(content) {
    const definitions = {};

    // Find all style name definitions (pattern: styleName: { ... })
    const styleNameRegex = /(\w+)\s*:\s*\{/g;
    let match;

    while ((match = styleNameRegex.exec(content)) !== null) {
      const styleName = match[1];
      const styleStart = match.index;
      const braceStart = match.index + match[0].length - 1; // Position of opening brace

      // Find matching closing brace
      let depth = 0;
      let inString = false;
      let stringChar = null;
      let i = braceStart;

      while (i < content.length) {
        const char = content[i];
        const prevChar = i > 0 ? content[i - 1] : "";

        // Handle string literals
        if (!inString && (char === '"' || char === "'" || char === "`")) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== "\\") {
          inString = false;
          stringChar = null;
        }

        if (!inString) {
          if (char === "{") {
            depth++;
          } else if (char === "}") {
            depth--;
            if (depth === 0) {
              // Found the matching closing brace
              const styleEnd = i + 1;
              const fullDefinition = content.substring(styleStart, styleEnd);

              // Find where this definition ends (including trailing comma)
              let definitionEnd = styleEnd;
              while (
                definitionEnd < content.length &&
                /[\s\n]/.test(content[definitionEnd])
              ) {
                definitionEnd++;
              }
              if (content[definitionEnd] === ",") {
                definitionEnd++;
              }

              definitions[styleName] = {
                fullDefinition: fullDefinition,
                content: content.substring(braceStart + 1, i),
                startIndex: styleStart,
                endIndex: definitionEnd,
              };
              break;
            }
          }
        }

        i++;
      }
    }

    return definitions;
  }

  /**
   * Find all usages of a styles object in the content
   * Handles: styles.name, [styles.name], styles[name], etc.
   * Excludes comments and string literals
   */
  findStyleUsages(content, stylesVarName) {
    const usages = new Set();

    // Remove comments and string literals to avoid false matches
    const cleanedContent = this.removeCommentsAndStrings(content);

    // Pattern 1: styles.styleName (most common)
    const directUsageRegex = new RegExp(`\\b${stylesVarName}\\.(\\w+)`, "g");
    let match;
    while ((match = directUsageRegex.exec(cleanedContent)) !== null) {
      usages.add(match[1]);
    }

    // Pattern 2: styles['styleName'] or styles["styleName"]
    const bracketUsageRegex = new RegExp(
      `\\b${stylesVarName}\\[['"](\\w+)['"]\\]`,
      "g"
    );
    while ((match = bracketUsageRegex.exec(cleanedContent)) !== null) {
      usages.add(match[1]);
    }

    // Pattern 3: styles[variable] - we can't determine statically, so be conservative
    // Pattern 4: In arrays like [styles.name1, styles.name2] - already caught by pattern 1
    // Pattern 5: In template literals - already caught by pattern 1

    return Array.from(usages);
  }

  /**
   * Remove comments and string literals from content for safer pattern matching
   */
  removeCommentsAndStrings(content) {
    let result = "";
    let i = 0;
    let inString = false;
    let stringChar = null;
    let inSingleLineComment = false;
    let inMultiLineComment = false;

    while (i < content.length) {
      const char = content[i];
      const nextChar = i + 1 < content.length ? content[i + 1] : "";
      const prevChar = i > 0 ? content[i - 1] : "";

      // Handle string literals
      if (!inString && !inSingleLineComment && !inMultiLineComment) {
        if (char === '"' || char === "'" || char === "`") {
          inString = true;
          stringChar = char;
          result += " "; // Replace with space to maintain positions
          i++;
          continue;
        }
      } else if (inString) {
        if (char === stringChar && prevChar !== "\\") {
          inString = false;
          stringChar = null;
          result += " ";
          i++;
          continue;
        }
        result += " ";
        i++;
        continue;
      }

      // Handle single-line comments
      if (!inString && !inMultiLineComment) {
        if (char === "/" && nextChar === "/") {
          inSingleLineComment = true;
          result += "  ";
          i += 2;
          continue;
        }
      } else if (inSingleLineComment) {
        if (char === "\n") {
          inSingleLineComment = false;
        }
        result += " ";
        i++;
        continue;
      }

      // Handle multi-line comments
      if (!inString && !inSingleLineComment) {
        if (char === "/" && nextChar === "*") {
          inMultiLineComment = true;
          result += "  ";
          i += 2;
          continue;
        }
      } else if (inMultiLineComment) {
        if (char === "*" && nextChar === "/") {
          inMultiLineComment = false;
          result += "  ";
          i += 2;
          continue;
        }
        result += " ";
        i++;
        continue;
      }

      result += char;
      i++;
    }

    return result;
  }

  /**
   * Remove unused styles from a file
   */
  removeUnusedStyles(fileInfo) {
    const changes = [];

    fileInfo.styleSheets.forEach((styleSheet) => {
      const { definitions, usages, varName } = styleSheet;
      const usedStyles = new Set(usages);

      // Find unused styles
      const unusedStyles = Object.keys(definitions).filter(
        (styleName) => !usedStyles.has(styleName)
      );

      if (unusedStyles.length > 0) {
        changes.push({
          varName,
          unusedStyles,
          usedStyles: Array.from(usedStyles),
        });
      }
    });

    return changes;
  }

  /**
   * Generate cleaned content by removing unused styles
   * Processes removals in reverse order to maintain correct indices
   */
  generateCleanedContent(fileInfo, changes) {
    let content = fileInfo.content;

    // Collect all removals with their absolute positions
    const allRemovals = [];

    fileInfo.styleSheets.forEach((styleSheet) => {
      const change = changes.find((c) => c.varName === styleSheet.varName);
      if (change) {
        change.unusedStyles.forEach((styleName) => {
          const definition = styleSheet.definitions[styleName];
          if (definition) {
            // Calculate absolute positions in the file
            // definition.startIndex is relative to the StyleSheet content block
            // styleSheet.contentStartOffset is the offset of that block in the file
            const startPos =
              styleSheet.contentStartOffset + definition.startIndex;
            const endPos = styleSheet.contentStartOffset + definition.endIndex;

            allRemovals.push({
              styleName,
              varName: change.varName,
              startPos,
              endPos,
            });
          }
        });
      }
    });

    // Sort by position in reverse order (remove from end to start)
    allRemovals.sort((a, b) => b.startPos - a.startPos);

    // Remove each unused style definition
    allRemovals.forEach((removal) => {
      const beforeDefinition = content.substring(0, removal.startPos);
      const afterDefinition = content.substring(removal.endPos);

      // Remove trailing comma and whitespace
      // Also check if we need to remove a leading comma from the next item
      let cleanAfter = afterDefinition.replace(/^\s*,?\s*/, "");

      // If the line before ends with a comma, we might need to clean it up
      const beforeTrimmed = beforeDefinition.trimEnd();
      if (beforeTrimmed.endsWith(",")) {
        // Check if there's content after - if not, remove the trailing comma
        const nextNonWhitespace = cleanAfter.match(/^\s*(\S)/);
        if (!nextNonWhitespace || nextNonWhitespace[1] === "}") {
          // Remove trailing comma from before
          content = beforeTrimmed.slice(0, -1) + cleanAfter;
        } else {
          content = beforeDefinition + cleanAfter;
        }
      } else {
        content = beforeDefinition + cleanAfter;
      }

      if (this.verbose) {
        console.log(
          `  Removed unused style: ${removal.varName}.${removal.styleName}`
        );
      }
    });

    // Ensure each StyleSheet has a closing } before the final )
    // Fix any StyleSheet.create({ ... ) patterns that are missing the closing brace
    content = this.fixStyleSheetClosingBraces(content, fileInfo);

    return content;
  }

  /**
   * Fix StyleSheet closing braces - ensure there's always a } before the final )
   */
  fixStyleSheetClosingBraces(content, fileInfo) {
    fileInfo.styleSheets.forEach((styleSheet) => {
      // Find the StyleSheet.create call in the content
      const styleSheetPattern = new RegExp(
        `(?:const|let|var)\\s+${styleSheet.varName}\\s*=\\s*StyleSheet\\.create\\s*\\(`,
        "g"
      );
      let match;

      while ((match = styleSheetPattern.exec(content)) !== null) {
        const startPos = match.index;
        const braceStart = content.indexOf("{", startPos);

        if (braceStart === -1) continue;

        // Track depth: 0 = at StyleSheet.create level, 1 = inside the object
        let parenDepth = 0; // Track parentheses
        let braceDepth = 0; // Track braces
        let inString = false;
        let stringChar = null;
        let i = startPos;
        let foundClosingParen = false;

        while (i < content.length && !foundClosingParen) {
          const char = content[i];
          const prevChar = i > 0 ? content[i - 1] : "";

          // Handle string literals
          if (!inString && (char === '"' || char === "'" || char === "`")) {
            inString = true;
            stringChar = char;
          } else if (inString && char === stringChar && prevChar !== "\\") {
            inString = false;
            stringChar = null;
          }

          if (!inString) {
            if (char === "(") {
              parenDepth++;
            } else if (char === ")") {
              parenDepth--;
              if (parenDepth === 0 && braceDepth === 0) {
                // Found the closing parenthesis of StyleSheet.create
                // Check if there's a closing brace immediately before it
                let beforeParen = i - 1;
                while (
                  beforeParen >= 0 &&
                  /[\s\n\r]/.test(content[beforeParen])
                ) {
                  beforeParen--;
                }
                if (beforeParen < 0 || content[beforeParen] !== "}") {
                  // Missing closing brace - add it before the )
                  content =
                    content.substring(0, i) + "\n}" + content.substring(i);
                  foundClosingParen = true;
                }
                break;
              }
            } else if (char === "{") {
              braceDepth++;
            } else if (char === "}") {
              braceDepth--;
            }
          }

          i++;
        }
      }
    });

    return content;
  }

  /**
   * Process a single file
   */
  processFile(filePath) {
    console.log(`Processing: ${filePath}`);

    const fileInfo = this.parseFile(filePath);
    if (!fileInfo) {
      console.log(`  No StyleSheet definitions found`);
      return;
    }

    const changes = this.removeUnusedStyles(fileInfo);
    if (changes.length === 0) {
      console.log(`  No unused styles found`);
      return;
    }

    // Show what would be removed
    changes.forEach((change) => {
      console.log(
        `  Found ${change.unusedStyles.length} unused styles in ${change.varName}:`
      );
      change.unusedStyles.forEach((styleName) => {
        console.log(`    - ${change.varName}.${styleName}`);
      });
    });

    if (this.dryRun) {
      console.log(
        `  [DRY RUN] Would remove ${changes.reduce(
          (sum, c) => sum + c.unusedStyles.length,
          0
        )} unused styles`
      );
      return;
    }

    // Create backup if requested
    if (this.backup) {
      const backupPath = filePath + ".backup";
      fs.copyFileSync(filePath, backupPath);
      console.log(`  Created backup: ${backupPath}`);
    }

    // Generate and write cleaned content
    const cleanedContent = this.generateCleanedContent(fileInfo, changes);
    fs.writeFileSync(filePath, cleanedContent, "utf8");

    console.log(
      `  Removed ${changes.reduce(
        (sum, c) => sum + c.unusedStyles.length,
        0
      )} unused styles`
    );
  }

  /**
   * Process all files in the project
   */
  processAll() {
    const files = this.findStyleSheetFiles();
    console.log(`Found ${files.length} files to process`);

    let totalRemoved = 0;

    files.forEach((filePath) => {
      try {
        this.processFile(filePath);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    });

    console.log(`\nProcessing complete!`);
  }

  /**
   * Process a specific file
   */
  processSpecific(filePath) {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    this.processFile(filePath);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help")) {
    console.log(`
Usage: node scripts/remove-unused-styles.js [options] [file-path]

Options:
  --all       Process all TypeScript/JavaScript files in the project
  --dry-run   Show what would be removed without making changes
  --backup    Create backup files before making changes
  --verbose   Show detailed output
  --help      Show this help message

Examples:
  node scripts/remove-unused-styles.js app/sandbox.tsx
  node scripts/remove-unused-styles.js --all --dry-run
  node scripts/remove-unused-styles.js --all --backup --verbose
    `);
    return;
  }

  const options = {
    dryRun: args.includes("--dry-run"),
    backup: args.includes("--backup"),
    verbose: args.includes("--verbose"),
  };

  const remover = new UnusedStylesRemover(options);

  if (options.dryRun) {
    console.log("🔍 DRY RUN MODE - No files will be modified");
  }

  if (args.includes("--all")) {
    remover.processAll();
  } else if (args.length > 0 && !args[0].startsWith("--")) {
    const filePath = args[0];
    remover.processSpecific(filePath);
  } else {
    console.log("Please specify a file path or use --all to process all files");
    console.log("Use --help for more information");
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = UnusedStylesRemover;
