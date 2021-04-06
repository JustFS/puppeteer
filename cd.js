const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const url =
  "https://www.cdiscount.com/informatique/achat-pc-ordinateur/megaport-pc-gamer-amd-ryzen-9-3900x-12x-3-8-ghz/f-1070853-meg4260568826719.html#mpos=0|mp";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
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

  // get <body>
  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML);

  let data = await page.evaluate(() => {
    return document.querySelector("span[itemprop=price]").innerText;
  });
  console.log("Le prix est de " + data);
  let newData = await data.substring(0, 4);

  if (parseInt(newData) < 2400) {
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
        from: '"PC Cdiscount" <julien.azbrg@gmail.com>',
        to: "fromscratch.frontdev@gmail.com",
        subject: "Prix sous les " + price + "€",
        html: "Le prix de la tour est de " + price + "€",
      })
      .then(() => console.log("Message envoyé"));
  }

  await browser.close();
})();
