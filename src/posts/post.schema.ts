import { gql } from 'apollo-server-koa'

export default gql`
  enum PostStatus {
    DOING
    DONE
  }

  type Post {
    id: String
    title: String
    status: PostStatus
  }

  type Query {
    posts: [Post]
  }
`
