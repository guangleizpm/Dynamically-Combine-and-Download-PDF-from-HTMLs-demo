const express = require('express');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const app = express();
const PORT = 8001; // Use a different port than your static server

// List your HTML files in order
const files = [
  'Instruction_Support_Demo/Family_Math_Connection.html',
  'Instruction_Support_Demo/Math_Concepts_Overview.html',
  'Instruction_Support_Demo/Frequent_Student_Errors.html',
  'Instruction_Support_Demo/Language_Support_Strategies.html',
  'Instruction_Support_Demo/Math_Enrichment_Ideas.html',
  'Instruction_Support_Demo/Support_for_Learners_Needing_Help.html'
];

// Serve static files (so Puppeteer can load them)
app.use(express.static(path.join(__dirname)));

app.get('/download-teacher-support-pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const pdfBuffers = [];
  try {
    for (const file of files) {
      const page = await browser.newPage();
      // Use your static server's port (e.g., 8000)
      const url = `http://localhost:8000/${file}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      pdfBuffers.push(pdfBuffer);
      await page.close();
    }
    await browser.close();

    // Merge PDFs
    const mergedPdf = await PDFDocument.create();
    for (const pdfBuffer of pdfBuffers) {
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    const mergedPdfBytes = await mergedPdf.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Teacher_Support_Combined.pdf');
    res.send(Buffer.from(mergedPdfBytes));
  } catch (err) {
    await browser.close();
    res.status(500).send('Error generating PDF: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`PDF backend server running at http://localhost:${PORT}`);
}); 