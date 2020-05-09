import { PostsService } from './posts.service'

export default {
  Query: {
    posts: () => {
      const postsService = new PostsService()
      return postsService.get()
    },
  },
}
