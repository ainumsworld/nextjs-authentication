import { type JSX } from "react";
import { render } from "@react-email/components";
import nodemailer, { type SendMailOptions } from "nodemailer";

import { env } from "@/env";
import { appConfig } from "@/config/app";

type SendMailArgs = {
  email: string;
  subject: string;
  reactEmail: JSX.Element;
};

export class EmailService {
  private static readonly username = env.MAIL_USERNAME;
  private static readonly password = env.MAIL_PASSWORD;

  private static readonly transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS enabled
    auth: {
      user: this.username,
      pass: this.password,
    },
  });

  public static async sendMail({ email, subject, reactEmail }: SendMailArgs) {
    const html = await render(reactEmail);
    try {
      const mailOptions: SendMailOptions = {
        from: `${appConfig.name} <${this.username}>`,
        to: email,
        subject,
        html,
      };
      const mailResponse = await this.transporter.sendMail(mailOptions);
      return mailResponse;
    } catch (err) {
      throw new Error("Error while sending email");
    }
  }
}
