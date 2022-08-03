import { AppError } from './app-error';
export class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'NOT_FOUND_ERROR';
    this.statusCode = 404;
  }
  sendMail() {
    console.log('sent');
  }
}
export class ValidationError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'VALIDATION_ERROR';
    this.statusCode = 422;
  }
}
export class SyntaxError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'SYNTAX_ERROR';
    this.statusCode = 500;
  }
}
export class QueryDBError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'QUERY_DB_ERROR';
    this.statusCode = 500;
  }
}
export class AuthencationError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'AUTH';
    this.statusCode = 403;
  }
}
export class PaymentError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'PAYMENT_ERROR';
    this.statusCode = 403;
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'CONFLICT_ERROR';
    this.statusCode = 409;
  }
}

export class ShippingError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'CONFLICT_ERROR';
    this.statusCode = 409;
  }
}
export class WebhookError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'WEBHOOK_ERROR';
    this.statusCode = 410;
  }
}

export class WrongReferralCodeError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'WRONG_REFERRAL_CODE';
    this.statusCode = 400;
  }
}