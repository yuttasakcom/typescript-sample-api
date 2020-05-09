import { PostService } from './post.service'

export default {
  Query: {
    posts: async () => {
      const post = new PostService()
      const result = await post.find()
      console.log(result)
      return result
    },
  },
}
