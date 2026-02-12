# Office Document to PDF Converter

A Node.js application that converts Office documents (.doc, .docx, .ppt, .pptx) to PDF format using LibreOffice.

## Features

- Converts Word documents (.doc, .docx) to PDF
- Converts PowerPoint presentations (.ppt, .pptx) to PDF
- Batch processing of multiple files
- Preserves original files after conversion
- Colored console output for better readability
- Robust error handling

## Prerequisites (Manual Setup)

### LibreOffice Installation

This application requires LibreOffice to be installed on your system. The `-headless` packages are recommended for server environments.

#### Debian/Ubuntu
```bash
sudo apt install libreoffice-core libreoffice-common libreoffice-headless
```

#### Arch Linux
```bash
sudo pacman -S libreoffice-fresh libreoffice-fresh-headless
```

#### Fedora/RHEL/CentOS
```bash
sudo yum install libreoffice
```
or
```bash
sudo dnf install libreoffice
```

#### macOS
```bash
brew install libreoffice
```
Or download the installer from [libreoffice.org](https://www.libreoffice.org/download/download/)

#### Windows
Download and install from [libreoffice.org](https://www.libreoffice.org/download/download/)

### Node.js

Requires Node.js version 14.0.0 or higher.

## Installation

### Automated Installation (Recommended for Linux/macOS)

Run the included install script to automatically set up Node.js, LibreOffice, and project dependencies:

```bash
npm run setup
```

### Manual Installation

1. Install Prerequisites (Node.js and LibreOffice) as detailed below.

2. Clone or download this repository

3. Install npm dependencies:
```bash
npm install
```

4. Verify your environment:
```bash
npm run check-env
```

## Prerequisites (Manual Setup)

## Usage

1. Place your Office documents (.doc, .docx, .ppt, .pptx) in the `data/input/` directory

2. Run the converter:
```bash
npm start
```

3. Find the converted PDF files in the `data/output/` directory

## Project Structure

```
convert-to-pdf/
├── converters/
│   └── documentConverter.js    # LibreOffice conversion logic
├── utils/
│   ├── fileScanner.js          # File scanning utilities
│   └── logger.js               # Colored console logging
├── data/
│   ├── input/                  # Place your files here
│   └── output/                 # PDFs will be saved here
├── index.js                    # Main application entry point
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Supported Formats

| Input Format | Description | Extension |
|--------------|-------------|-----------|
| Word Document (legacy) | Microsoft Word 97-2003 | .doc |
| Word Document | Microsoft Word 2007+ | .docx |
| PowerPoint Presentation (legacy) | Microsoft PowerPoint 97-2003 | .ppt |
| PowerPoint Presentation | Microsoft PowerPoint 2007+ | .pptx |

## How It Works

1. **Checks** if LibreOffice is installed on your system
2. **Scans** the `data/input/` directory for supported file formats
3. **Converts** each file to PDF using LibreOffice in headless mode
4. **Saves** the PDF files to `data/output/` with the same filename
5. **Keeps** original files in place (does not delete them)

## Example Output

```
📄 Office Document to PDF Converter

ℹ Checking LibreOffice installation...
✓ LibreOffice found at: /usr/bin/libreoffice

ℹ Scanning input directory...
✓ Found 3 files to convert

Converting documents to PDF...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ report.docx → report.pdf
✓ presentation.pptx → presentation.pdf
✓ meeting-notes.doc → meeting-notes.pdf

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Summary:
  Total: 3 files
  Success: 3 files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Conversion complete! Check data/output/ for PDFs.
```

## Troubleshooting

### LibreOffice Not Found

If you get an error about LibreOffice not being found:

1. Make sure LibreOffice is installed (see installation instructions above)
2. Verify it's in your system PATH by running:
   ```bash
   which libreoffice    # Linux/macOS
   where libreoffice    # Windows
   ```
3. Restart your terminal/command prompt after installation

### Conversion Failures

If a specific file fails to convert:

- **Password-protected files**: Cannot be converted (not supported)
- **Corrupted files**: Check if the file opens correctly in Microsoft Office or LibreOffice
- **Unsupported format**: Ensure the file has a supported extension (.doc, .docx, .ppt, .pptx)
- **File permissions**: Ensure you have read access to the input file

### Permission Errors

If you get permission errors:

```bash
# Make sure the directories are writable
chmod -R 755 data/
```

## Limitations

- Password-protected documents cannot be converted
- Macros and embedded scripts will not be preserved
- Some complex formatting may have minor differences from the original
- Animations in PowerPoint files are not preserved in PDF

## Dependencies

- **libreoffice** - System dependency (LibreOffice suite)
- **fs-extra** - Enhanced file system operations
- **chalk** - Colored terminal output

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
