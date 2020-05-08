# Share TypeScripts with Team

## Table of Contents

- [Introduce](#Introduce)
- [Encapsulation](#Encapsulation)
- [Setup Module](#Setup-Module)
- [Setup Middleware](#Setup-Middleware)
- [Setup Graphql](#Setup-Graphql)

## Introduce

- แนะนำคู่มือ typescript ให้เริ่มอ่านทำความเข้าใจอย่างละเอียดไปทีละหัวข้อ เริ่มตั้งแต่เรื่อง Basic Type `https://www.typescriptlang.org/docs/handbook/basic-types.html`
- แนะนำ OOP(Object-oriented programming) paradigm ศึกษาทำความเข้าใจ วิธีการ แนวคิด เกี่ยวการเขียนโปรแกรมเชิงวัตถุ `https://en.wikipedia.org/wiki/Object-oriented_programming`
- typescript awesome `https://github.com/dzharii/awesome-typescript`
- typescript clean code `https://github.com/labs42io/clean-code-typescript`

## VS-Code

- Extension
  - TypeScript Hero
  - Auto Rename Tag
  - Bracket Pair Colorizer
  - Code Spell Checker
  - DotENV
  - ES7 React/Redux/GraphQL/React-Native snippets
  - ESLint
  - Fix JSON
  - Git Graph
  - GitLens
  - indent-rainbow
  - JavaScript (ES6) code snippets
  - Latest TypeScript and Javascript Grammar
  - Prettier - Code formatter
  - REST Client
  - TSLint
  - vscode-base64
  - YAML

## Encapsulation

```typescript
// index.ts
import 'reflect-metadata'

import { Server } from './server'

const main = () => {
  const server = new Server()
  server.start()
}

main()

// server.ts
import koa from 'koa'
import { RoutingControllersOptions, useKoaServer } from 'routing-controllers'
import { errorHandler } from './middleware/errorHandler'

export class Server {
  private app: koa = new koa()
  private port: number = 4000
  private hostname: string = '0.0.0.0'

  constructor() {
    this.useMiddleware()
    this.setupRouting()
  }

  private useMiddleware() {
    this.app.use(errorHandler)
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
```

## Setup Module

- create controller
- create DTO
- create service

```
src/todos
├── todo.controller.ts
├── todo.dto.ts
└── todo.service.ts
```

## Setup Middleware

```
src/middleware
└── errorHandler.ts
```

```typescript
// file server.ts
constructor() {
  this.useMiddleware()
}

private useMiddleware() {
  this.app.use(errorHandler)
}
```

## Setup GraphQL

- create schema
- create resolver

```
src/todos
├── todo.resolver.ts
├── todo.schema.ts
```

```typescript
import { resolve } from 'path'

import { ApolloServer } from 'apollo-server-koa'
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'

export default new (class Graphql extends ApolloServer {
  constructor() {
    const typeDefs = mergeTypes(
      fileLoader(resolve(__dirname, '**/*.schema.ts'))
    )
    const resolvers = mergeResolvers(
      fileLoader(resolve(__dirname, '**/*.resolver.ts'))
    )
    super({ typeDefs, resolvers })
  }
})()
```
