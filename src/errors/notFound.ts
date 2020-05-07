import { BaseError } from './base.error'

export class NotFound extends BaseError {
  statusCode = 404
}
