const puppeteer = require("puppeteer");
require("dotenv").config();

const url = "https://instagram.com";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // cookie
  await page.click("div[class=mt3GC] > button");

  // login
  await page.type('[name="username"]', process.env.INSTA_USER, {
    delay: 100,
  });
  await page.type('[name="password"]', process.env.INSTA_PASS, {
    delay: 80,
  });
  await page.click("button[type=submit]");

  // notif
  await page.waitForSelector("div[class=mt3GC] > button", {
    visible: true,
  });
  await page.click("div[class=mt3GC] > button");

  debugger;
  // await browser.close();
})();
