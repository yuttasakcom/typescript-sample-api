import koa from 'koa'
import { RoutingControllersOptions, useKoaServer } from 'routing-controllers'
import { errorHandler } from './middleware/errorHandler'

export class Server {
  private app: koa = new koa()
  private port: number = 4000
  private hostname: string = '0.0.0.0'

  constructor() {
    this.use()
    this.initRouting()
  }

  private use() {
    this.app.use(errorHandler)
  }

  private initRouting() {
    const routingControllersOptions: RoutingControllersOptions = {
      defaultErrorHandler: false,
      controllers: [`${__dirname}/**/*.controller.ts`],
    }
    useKoaServer(this.app, routingControllersOptions)
  }

  public start() {
    this.app.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}/${this.port}`)
    })
  }
}
