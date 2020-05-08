import { gql } from 'apollo-server-koa'

export default gql`
  type Todo {
    id: String
    title: String
  }

  type Query {
    todo: [Todo]
  }
`
