// const { passwordReset } = require("./index");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const registrationTemplate = require("../helpers/Emailtemplates/registrationTemplate");

var sendEMail = async (payload) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "isaias.boehm@ethereal.email", // generated ethereal user
  //     pass: "j2gbxEsAwxckB1GeD4", // generated ethereal password
  //   },
  // });

  new Promise((resolve, reject) => {
    var { config } = payload;
    var { data } = payload;
    var htmlData = null;

    if ((data.type = "Registration")) {
      htmlData = registrationTemplate(data);
    }

    const params = {
      from: config.from,
      to: config.to,
      bcc: "depinder@unoiatech.com, ravi.unoia@gmail.com",
      subject: data.subject,
      html: htmlData || "No data present",
    };

    return transporter.sendMail(params, function (err, data) {
      if (err) {
        reject(new Error(err));
        console.log("Error " + err);
      } else {
        resolve("Email sent successfully");
        console.log("Email sent successfully");
      }
    });
  });
};
module.exports = sendEMail;
