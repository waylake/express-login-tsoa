import { ses } from "@/config";
import { logger } from "@/config";

export class EmailService {
  public async sendVerificationEmail(recipientEmail: string, token: string) {
    const params = {
      Source: "contact@stolencheese.com", // Your verified SES email address
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Subject: {
          Data: "Email Verification",
        },
        Body: {
          Html: {
            Data: `<p>Please click the link below to verify your email:</p><a href="https://dfu.stolencheese.com/verify?token=${token}">Verify Email</a>`,
          },
        },
      },
    };

    try {
      await ses.sendEmail(params).promise();
      logger.info(`Email sent to ${recipientEmail}`);
    } catch (err) {
      logger.error(err);
    }
  }
}
