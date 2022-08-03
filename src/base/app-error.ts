export class AppError extends Error {
    protected statusCode: number;
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
    }
    logger() {
      //log error
    }
    sendMail() {
      //send email
    }
    executeAll() {
      this.logger();
      this.sendMail();
    }
  }
  