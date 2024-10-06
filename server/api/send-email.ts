import nodemailer from "nodemailer";

interface EmailBody {
  to: string;
  subject: string;
  body: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

const generateHtml = (mail: EmailBody): string => {
  const text = mail.body;
  return `
    <html>
      <body>
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1>${mail.subject}</h1>
          ${text
            .split("\n")
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join("")}
        </div>
      </body>
    </html>
  `;
};

export default defineEventHandler(
  async (event: any): Promise<EmailResponse> => {
    const mail: EmailBody = await readBody(event);

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_PROVIDER_HOST,
      port: parseInt(process.env.MAIL_PROVIDER_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.MAIL_PROVIDER_USER,
        pass: process.env.MAIL_PROVIDER_PASS,
      },
    });

    const html = generateHtml(mail);

    // Define email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: mail.to,
      subject: mail.subject,
      text: mail.body,
      html: html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: (error as Error).message };
    }
  }
);
