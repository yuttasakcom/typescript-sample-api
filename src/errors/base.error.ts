export abstract class BaseError extends Error {
  abstract statusCode: number = 500

  constructor(message: string) {
    super(message)
  }
}
