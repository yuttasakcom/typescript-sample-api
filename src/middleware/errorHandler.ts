import { Context } from 'koa'
import { BadRequestError } from 'routing-controllers'

export async function errorHandler(ctx: Context, next: Function) {
  try {
    await next()
  } catch (error) {
    if (error instanceof BadRequestError) {
      const { httpCode, message } = error
      const errors = (error as any).errors.map((err: any) => ({
        [err.property]: Object.values(err.constraints)[0],
      }))
      ctx.status = httpCode
      ctx.body = { message, errors }
    } else {
      console.log(error)
      const { statusCode, message } = error
      ctx.status = statusCode
      ctx.body = { message }
    }
  }
}
