const express = require("express");
const nodemailer = require("nodemailer");
module.exports = {
  mailing: function (req, rand) {
    return new Promise(async (resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sarthaksingh0900@gmail.com",
          pass: "ldhnogjsnnmslxqw",
        },
      });
      var toemaill = await req.body.email;
      console.log(req.body.email);
      const mail = {
        from: '"sarthak singh" <sarthaksingh0900@gmail.com>',
        to: toemaill,
        subject: "API Key",
        html: `<p>Your apiKey for EncryptionApi is ${rand} click here to learn more about apiDocs ${'https://documenter.getpostman.com/view/6932248/Szt7AAed?version=latest'}</p>`,
      };

      transporter.sendMail(mail, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
  },
};
