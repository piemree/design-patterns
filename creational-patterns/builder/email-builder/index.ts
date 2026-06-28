class Email {
  public to: string = "";
  public from: string = "";
  public subject: string = "";
  public body: string = "";
  public attachments: string[] = [];
}

class EmailBuilder {
  private email: Email;

  constructor() {
    this.email = new Email();
  }

  setFrom(from: string): this {
    this.email.from = from;
    return this;
  }

  setTo(to: string): this {
    this.email.to = to;
    return this;
  }

  setSubject(subject: string): this {
    this.email.subject = subject;
    return this;
  }

  addAttachment(filePath: string): this {
    this.email.attachments.push(filePath);
    return this;
  }

  build(): Email {
    if (!this.email.to) throw new Error("Recipient address is required.");
    return this.email;
  }
}

const simpleEmail = new EmailBuilder()
  .setFrom("info@sirket.com")
  .setTo("musteri@gmail.com")
  .setSubject("Welcome")
  .build();

console.log(simpleEmail);
