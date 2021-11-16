const nodemailer = require("nodemailer");

const sendMail = async ({ from, to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  try {
    let info = await transporter.sendMail({
      from: 'niravdpatel224@gmail.com',
      to,
      subject,
      text,
      html,
    });

    console.log(info);

    return { success: 'true'}

  } catch (e) {
    return {success: 'false'};
  }
};

module.exports = sendMail;

