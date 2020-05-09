import { gql } from 'apollo-server-koa'

export default gql`
  type Post {
    id: String
    title: String
  }

  type Query {
    posts: [Post]
  }
`
