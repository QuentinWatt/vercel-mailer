import { MailtrapClient } from "mailtrap";
import { companyInfo } from "@/config/mailTemplates.config";

const TOKEN = process.env.MAIL_PROVIDER_PASS as string;

const client = new MailtrapClient({
  token: TOKEN,
});

export default defineEventHandler(async (event) => {
  const { to, templateId } = await readBody(event);

  const recipients = to.split(",").map((email: string) => ({ email }));

  try {
    const result = await client.send({
      from: {
        email: process.env.MAIL_FROM_EMAIL as string,
        name: process.env.MAIL_FROM_NAME as string,
      },
      to: recipients,
      template_uuid: templateId,
      template_variables: {
        ...companyInfo,
      },
    });
    return { success: true, result };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
});
