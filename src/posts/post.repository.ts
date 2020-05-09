import { Post, PostDoc } from './post.model'
import { PostRequestDto } from './post.dto'
import { Service } from 'typedi'

export interface IPostRepository {
  create(request: PostRequestDto): Promise<PostDoc>
  find(): Promise<PostDoc[]>
}

@Service('PostRepository')
export class PostRepository implements IPostRepository {
  async create(request: PostRequestDto): Promise<PostDoc> {
    return (await Post.create(request)).toJSON()
  }

  async find(): Promise<PostDoc[]> {
    return Post.find()
  }
}
