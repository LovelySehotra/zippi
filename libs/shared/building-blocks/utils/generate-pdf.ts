import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { Worker } from 'bullmq';
// import { createReportPdf } from './report.generator';
// import { saveFile } from './storage.service';
export async function createReportPdf(userId: string): Promise<string> {
  const path = `./reports/report-${userId}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path));

  doc.fontSize(25).text('User Report', 100, 100);
  doc.text(`Generated for user: ${userId}`);
  doc.end();

  return path;
}


const worker = new Worker(
  'report-queue',
  async job => {
    const { userId } = job.data;

    console.log('Generating report for', userId);

    const filePath = await createReportPdf(userId);

    const url = await saveFile(filePath);

    // TODO: update DB with completed status
    return { url };
  },
  {
    connection: { host: 'localhost', port: 6379 },
  },
);

worker.on('completed', job => {
  console.log('Report completed', job.id);
});