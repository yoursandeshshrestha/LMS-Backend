import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  // Create the transporter for SendGrid
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // Resolve the template file path
  const templatePath = path.join(__dirname, "../mails", template);

  // Render the email template using EJS
  const html: string = await ejs.renderFile(templatePath, data);

  // Mail options with explicit From header
  const mailOptions = {
    from: "bluekites.official@gmail.com", // Add sender name and email
    to: email,
    subject,
    html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendMail;
