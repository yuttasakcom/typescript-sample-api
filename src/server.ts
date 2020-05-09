import { resolve } from 'path'

import koa from 'koa'
import mongoose from 'mongoose'
import { Container } from 'typedi'
import {
  RoutingControllersOptions,
  useKoaServer,
  useContainer,
} from 'routing-controllers'

import graphql from './graphql'
import { errorHandler } from './middleware/errorHandler'
import { autoLoad } from './utils/autoLoad'

useContainer(Container)

export class Server {
  private app: koa = new koa()
  private port: number = 4000
  private hostname: string = '0.0.0.0'

  constructor() {
    this.setupMongo()
    this.useMiddleware()
    this.autoLoadRepositories()
    this.setupGraphQL()
    this.setupRouting()
  }

  private autoLoadRepositories() {
    autoLoad(resolve(__dirname), 'repository.ts')
  }

  private setupMongo() {
    mongoose.connect('mongodb://localhost:27017/posts', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  private useMiddleware() {
    this.app.use(errorHandler)
  }

  private setupGraphQL() {
    graphql.applyMiddleware({ app: this.app })
  }

  private setupRouting() {
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
