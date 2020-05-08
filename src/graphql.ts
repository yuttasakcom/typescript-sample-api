import { resolve } from 'path'

import { ApolloServer, gql } from 'apollo-server-koa'

import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader(resolve(__dirname, '**/*.schema.ts')))
const resolvers = mergeResolvers(
  fileLoader(resolve(__dirname, '**/*.resolver.ts'))
)

export default new (class Graphql extends ApolloServer {
  constructor() {
    super({ typeDefs, resolvers })
  }
})()
