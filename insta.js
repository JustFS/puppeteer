const puppeteer = require("puppeteer");
require("dotenv").config();

const url = "https://instagram.com";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // cookie
  await page.click(".mt3GC > button");

  // login
  await page.type("[name=username]", "julien.azbrg@gmail.com", { delay: 100 });
  await page.type("[name=password]", process.env.INSTA_PASS, { delay: 100 });

  await page.click("button[type=submit]");

  // auto connect
  await page.waitForSelector(".cmbtv > button", { visible: true });
  await page.click(".cmbtv > button");

  // notif
  await page.waitForSelector(".mt3GC > button", { visible: true });
  await page.click(".mt3GC > button");

  debugger;
  // await browser.close();
})();
