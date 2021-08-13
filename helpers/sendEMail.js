const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const registrationTemplate = require("../helpers/Emailtemplates/registrationTemplate");
const resetPasswordTemplate = require("../helpers/Emailtemplates/resetPasswordTemplate");
const allUserEmailTemplate = require("../helpers/Emailtemplates/allUserEmailTemplate");

var sendEMail = async (payload) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  new Promise((resolve, reject) => {
    var { config } = payload;
    var { data } = payload;
    var htmlData = null;

    if (data.type === "Registration") {
      htmlData = registrationTemplate(data);
    }
    if (data.type === "ResetPassword") {
      htmlData = resetPasswordTemplate(data);
    }
    if (data?.type === "AllUser") {
      htmlData = allUserEmailTemplate(data);
    }

    const params = {
      from: config.from,
      to: config.to,
      bcc: "depinder@unoiatech.com, ravi.unoia@gmail.com, dilawarunoiatech@gmail.com",
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
