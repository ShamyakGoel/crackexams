const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({'executablePath': "C:\\Users\\Lenovo\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe"});
  const page = await browser.newPage();
  await page.goto("http://10.69.28.241:3000/admin/gpdf/6303114dad72df0b54ea7cf8", {
    waitUntil: "networkidle2"
  });
  await page.setViewport({ width: 1680, height: 1050 });
  await page.pdf({
    path: "hacker_news.pdf",
    format: "A4"
  });

  await browser.close();
})();