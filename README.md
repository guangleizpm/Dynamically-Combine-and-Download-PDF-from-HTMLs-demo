# Dynamically Combine and Download PDF from HTMLs

This project provides a solution for dynamically combining multiple HTML files into a single PDF document. It's particularly useful for creating combined documentation or reports from multiple HTML sources.

## Features

- Combines multiple HTML files into a single PDF
- Maintains formatting and styling from original HTML files
- Supports background colors and images
- Generates A4-sized PDFs
- Provides a simple API endpoint for PDF generation

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
.
├── server.js                 # Main server file
├── package.json             # Project dependencies
├── mock_lesson_dashboard_native.html  # Example HTML file
└── Instruction_Support_Demo/ # Directory containing HTML files
    ├── Family_Math_Connection.html
    ├── Math_Concepts_Overview.html
    ├── Frequent_Student_Errors.html
    ├── Language_Support_Strategies.html
    ├── Math_Enrichment_Ideas.html
    └── Support_for_Learners_Needing_Help.html
```

## Usage

1. Start the server:
```bash
node server.js
```

2. The server will run on `http://localhost:8001`

3. To generate a combined PDF, make a GET request to:
```
http://localhost:8001/download-teacher-support-pdf
```

The server will:
- Convert each HTML file to PDF
- Combine all PDFs into a single document
- Return the combined PDF as a downloadable file named `Teacher_Support_Combined.pdf`

## Dependencies

- express: Web server framework
- puppeteer: Headless Chrome Node.js API for HTML to PDF conversion
- pdf-lib: PDF manipulation library

## Notes

- The server expects the HTML files to be served from a static server running on port 8000
- Make sure all HTML files are properly formatted and accessible
- The PDF generation process may take a few seconds depending on the number and size of HTML files

## License

[Your chosen license]

## Contributing

[Your contribution guidelines] 