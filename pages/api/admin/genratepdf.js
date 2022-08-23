// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from "puppeteer";
// import stream from 'stream'
// import { promisify } from 'util';
// const pipeline = promisify(stream.pipeline);
export default function handler(req, res) {
    (async () => {
        const browser = await puppeteer.launch({'executablePath': "C:\\Users\\Lenovo\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"});
        const page = await browser.newPage();
        await page.goto("http://10.69.28.241:3000/admin/gpdf/"+req.query.id, {
          waitUntil: "networkidle2"
        });
        await page.setViewport({ width: 1680, height: 1050 });
        let pdf = await page.pdf({
          path: "hacker_news.pdf",
          format: "A4"
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
        res.write(pdf, 'binary')
        await browser.close();
        res.send()
      })();
}