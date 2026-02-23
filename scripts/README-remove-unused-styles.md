# Remove Unused Styles Script

This script automatically detects and removes unused styles from React Native StyleSheet definitions in your codebase.

## Features

- 🔍 **Smart Detection**: Finds unused styles by analyzing actual usage in JSX/TSX code
- 🛡️ **Safe Operation**: Dry-run mode to preview changes before applying them
- 💾 **Backup Support**: Automatically creates backup files before making changes
- 📁 **Batch Processing**: Can process individual files or entire project
- 🔧 **Flexible**: Works with TypeScript, JavaScript, JSX, and TSX files

## Usage

### Basic Usage

```bash
# Process a specific file
node scripts/remove-unused-styles.js app/sandbox.tsx

# Process all files in the project
node scripts/remove-unused-styles.js --all

# Preview changes without modifying files (dry run)
node scripts/remove-unused-styles.js --all --dry-run
```

### Using npm script

```bash
# Process all files
npm run remove-unused-styles -- --all

# Dry run on specific file
npm run remove-unused-styles -- app/sandbox.tsx --dry-run
```

## Options

| Option      | Description                                            |
| ----------- | ------------------------------------------------------ |
| `--all`     | Process all TypeScript/JavaScript files in the project |
| `--dry-run` | Show what would be removed without making changes      |
| `--backup`  | Create backup files before making changes              |
| `--verbose` | Show detailed output                                   |
| `--help`    | Show help message                                      |

## Examples

### Example 1: Preview unused styles in a file

```bash
node scripts/remove-unused-styles.js app/sandbox.tsx --dry-run --verbose
```

Output:

```
🔍 DRY RUN MODE - No files will be modified
Processing: app/sandbox.tsx
  Found 2 unused styles in styles:
    - styles.column9
    - styles.view38
  [DRY RUN] Would remove 2 unused styles
```

### Example 2: Remove unused styles from a specific file

```bash
node scripts/remove-unused-styles.js app/sandbox.tsx --backup
```

### Example 3: Process entire project with backup

```bash
node scripts/remove-unused-styles.js --all --backup --verbose
```

## How It Works

1. **Parsing**: The script parses your TypeScript/JavaScript files to find `StyleSheet.create()` calls
2. **Analysis**: It extracts style definitions and analyzes their usage in JSX/TSX components
3. **Detection**: It identifies styles that are defined but never referenced in the code
4. **Removal**: It safely removes unused style definitions while preserving the file structure
5. **Backup**: Optionally creates backup files before making changes

## Safety Features

- **Dry Run Mode**: Always test with `--dry-run` first to see what would be changed
- **Backup Files**: Use `--backup` to create `.backup` files before modifications
- **Verbose Output**: Use `--verbose` to see exactly what's being removed
- **Error Handling**: Gracefully handles parsing errors and continues processing

## Integration with CI/CD

You can integrate this script into your build process:

```bash
# Check for unused styles in CI
npm run remove-unused-styles -- --all --dry-run

# Exit with error if unused styles are found
if [ $? -ne 0 ]; then
  echo "Unused styles found! Run the script to clean them up."
  exit 1
fi
```

## Troubleshooting

### Script not finding styles

- Make sure your files use `StyleSheet.create()` syntax
- Check that style references use the correct variable name (e.g., `styles.styleName`)

### Parsing errors

- The script handles most common patterns but may struggle with complex nested objects
- Use `--verbose` to see detailed error messages
- Consider manually cleaning up problematic files

### Performance

- For large projects, processing all files may take some time
- Consider running on specific directories or file types if needed

## Contributing

To improve the script:

1. Add support for more style definition patterns
2. Improve parsing accuracy for edge cases
3. Add support for other styling libraries (styled-components, etc.)
4. Enhance error handling and reporting
