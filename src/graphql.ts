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
