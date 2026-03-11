import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import * as puppeteer from 'puppeteer'

@Processor('pdf-queue')
export class PdfProcessor extends WorkerHost {

  async process(job: Job<any>) {

    if (job.name === 'generate-pdf') {
      const { userId } = job.data

      const browser = await puppeteer.launch()

      const page = await browser.newPage()

      await page.setContent(`
        <h1>User Report</h1>
        <p>User ID: ${userId}</p>
      `)

      await page.pdf({
        path: `./pdf/${userId}.pdf`,
        format: 'A4',
      })

      await browser.close()

      console.log('PDF Generated')
    }
  }
}