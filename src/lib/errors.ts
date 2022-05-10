export class NotFoundError {
  message: string;
  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = this.constructor.name;
  }
};