const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const url =
  "https://www.cdiscount.com/informatique/ordinateurs-pc-portables/apple-13-3-macbook-air-2020-puce-apple-m1/f-1070992-mgn73fna.html#mpos=0|cd";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.setViewport({
    width: 1200,
    height: 10000,
  });

  // pdf
  // await page.pdf({
  //   path: "page.pdf",
  //   format: "A4",
  // });

  // image
  // await page.screenshot({
  //   path: "image.png",
  // });

  // get body
  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML);

  let data = await page.evaluate(() => {
    return document.querySelector("span[itemprop=price]").innerText;
  });
  let newData = await data.substring(0, 4);

  if (parseInt(newData) < 1400) {
    sendNotification(newData);
  }

  async function sendNotification(price) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "julien.azbrg@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter
      .sendMail({
        from: '"Mac Discount" <julien.azbrg@gmail.com>',
        to: "julien.azbrg@gmail.com",
        subject: "Prix sous les " + price + "€",
        html: "Le prixe est tombé sous les " + price + "€",
      })
      .then(() => console.log("Message envoyé"));
  }

  await browser.close();
})();
