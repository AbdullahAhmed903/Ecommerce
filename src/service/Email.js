import nodemailer from "nodemailer";
const sendEmail = async (dest, subject, message, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.hotmailEmail,
      pass: process.env.hotmailPassword,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `E-commerce ${process.env.hotmailEmail}`, // sender address
    to: dest, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });
  return info;
};

export default sendEmail;
