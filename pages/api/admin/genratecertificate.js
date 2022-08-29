// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from "puppeteer";
// import stream from 'stream'
// import { promisify } from 'util';
// const pipeline = promisify(stream.pipeline);
export default function handler(req, res) {
    try{
        (async () => {
            const browser = await puppeteer.launch({'executablePath': "C:\\Users\\Lenovo\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"});
            const page = await browser.newPage();
            await page.goto(`http://localhost:81/sm.html?name=${req.query.name}&quizname=${req.query.qname}&marks=${req.query.marks}&maxmarks=${req.query.maxmarks}`, {
            waitUntil: "networkidle2"
            });
            let img = await page.screenshot({
            path: "certificate.png"
            });
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', 'attachment; filename=certificate.png');
            res.write(img, 'binary')
            await browser.close();
            res.send()
        })();
    }
    catch(e){
        console.log(e.stack)
    }
}