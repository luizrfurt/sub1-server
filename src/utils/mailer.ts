import nodemailer from "nodemailer";
import config from "config";
import pug from "pug";
import { convert } from "html-to-text";

const smtp = config.get<{
  host: string;
  port: number;
  user: string;
  pass: string;
}>("smtp");

export default class Mailer {
  firstName: string;
  login: string;
  to: string;
  from: string;
  constructor(
    public user: { name: string; login: string; email: string },
    public url: string
  ) {
    this.firstName = user.name.split(" ")[0];
    this.login = user.login;
    this.to = user.email;
    this.from = `Sub1 ${config.get<string>("emailFrom")}`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, fields: any) {
    try {
      // Generate HTML template based on the template string
      const html = pug.renderFile(
        `${__dirname}/../views/${template}.pug`,
        fields
      );

      // Create mailOptions
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: fields.subject,
        text: convert(html),
        html,
      };

      // Send email
      // const info = await this.newTransport().sendMail(mailOptions);
      await this.newTransport().sendMail(mailOptions);
      //console.log(nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }

  async sendExample() {
    const exampleFields = {
      firstName: this.firstName,
      login: this.login,
      subject: "Exemplo de email",
      url: this.url,
    };
    await this.send("example", exampleFields);
  }
}
