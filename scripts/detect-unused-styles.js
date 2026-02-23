#!/usr/bin/env node

/**
 * Script to detect unused React Native StyleSheet styles in TS/TSX files.
 *
 * Usage:
 *   node scripts/detect-unused-styles.js path/to/file.tsx
 *   node scripts/detect-unused-styles.js --all
 *   node scripts/detect-unused-styles.js --summary
 *   node scripts/detect-unused-styles.js --remove --backup
 *
 * Options:
 *   --all       Scan all JS/TS files in the project
 *   --summary   Print a per-file summary without detailed listings
 *   --remove    Delete unused styles from the source files
 *   --backup    Create a .backup copy before modifying a file (with --remove)
 *   --help      Show this help message
 */

const fs = require("fs");
const path = require("path");
const UnusedStylesRemover = require("./remove-unused-styles");

function printHelp() {
  console.log(`Usage: node scripts/detect-unused-styles.js [options] [file]

Options:
  --all       Scan all JS/TS files in the project
  --summary   Print a per-file summary without detailed listings
  --remove    Delete unused styles from the source files
  --backup    Create a .backup copy before modifying a file (with --remove)
  --help      Show this help message

Examples:
  node scripts/detect-unused-styles.js app/sandbox.tsx
  node scripts/detect-unused-styles.js --all
  node scripts/detect-unused-styles.js --all --summary
  node scripts/detect-unused-styles.js --remove app/sandbox.tsx
  node scripts/detect-unused-styles.js --remove --backup --all`);
}

function collectTargets(remover, args) {
  const targets = new Set();
  const paths = args.filter((arg) => !arg.startsWith("--"));

  paths.forEach((p) => targets.add(path.normalize(p)));

  if (args.includes("--all")) {
    remover.findStyleSheetFiles(".").forEach((file) => targets.add(file));
  }

  return Array.from(targets);
}

function analyzeFile(remover, filePath) {
  const fileInfo = remover.parseFile(filePath);
  if (!fileInfo) {
    return {
      filePath,
      error: null,
      hasStyleSheet: false,
      unusedStyles: [],
      changes: [],
      fileInfo: null,
    };
  }

  const changes = remover.removeUnusedStyles(fileInfo);
  const unusedStyles = changes.flatMap((change) =>
    change.unusedStyles.map((styleName) => ({
      varName: change.varName,
      styleName,
    }))
  );

  return {
    filePath,
    error: null,
    hasStyleSheet: true,
    unusedStyles,
    changes,
    fileInfo,
  };
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    printHelp();
    return;
  }

  const removeUnused = args.includes("--remove");
  const backupFiles = args.includes("--backup");

  if (backupFiles && !removeUnused) {
    console.warn("--backup has no effect without --remove");
  }

  const remover = new UnusedStylesRemover({
    dryRun: !removeUnused,
    backup: backupFiles && removeUnused,
  });
  const summaryOnly = args.includes("--summary");
  const targets = collectTargets(remover, args);

  if (targets.length === 0) {
    console.error("No files specified. Use --help for usage information.");
    process.exitCode = 1;
    return;
  }

  let filesWithUnusedStyles = 0;
  let totalUnusedStyles = 0;
  let filesModified = 0;

  targets.forEach((targetPath) => {
    try {
      const report = analyzeFile(remover, targetPath);

      if (!report.hasStyleSheet) {
        if (!summaryOnly) {
          console.log(`${targetPath} (no StyleSheet definitions)`);
        }
        return;
      }

      if (report.unusedStyles.length === 0) {
        if (!summaryOnly) {
          console.log(`✔ ${targetPath} has no unused styles`);
        }
        return;
      }

      filesWithUnusedStyles += 1;
      totalUnusedStyles += report.unusedStyles.length;

      if (removeUnused) {
        if (backupFiles) {
          fs.copyFileSync(targetPath, `${targetPath}.backup`);
        }

        const cleanedContent = remover.generateCleanedContent(
          report.fileInfo,
          report.changes
        );
        fs.writeFileSync(targetPath, cleanedContent, "utf8");
        filesModified += 1;
      }

      if (summaryOnly) {
        console.log(`• ${targetPath} — ${report.unusedStyles.length} unused`);
      } else {
        console.log(
          `⚠ ${targetPath} has ${report.unusedStyles.length} unused styles:`
        );
        report.unusedStyles.forEach((unused) => {
          console.log(`    ${unused.varName}.${unused.styleName}`);
        });
      }
    } catch (error) {
      console.error(`✖ ${targetPath}: ${error.message}`);
      process.exitCode = 1;
    }
  });

  console.log();
  console.log(
    `Summary: ${filesWithUnusedStyles} file(s) with unused styles, ${totalUnusedStyles} unused style(s) detected.`
  );
  if (removeUnused) {
    console.log(`Modified ${filesModified} file(s).`);
  }
}

if (require.main === module) {
  main();
}
