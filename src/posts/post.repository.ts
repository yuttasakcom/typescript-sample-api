import { Post, PostDoc } from './post.model'
import { PostRequestDto } from './post.dto'
import { Service } from 'typedi'
import { NotFound } from '../errors/notFound'

export interface PostQuery {
  _id?: string
  title?: string
  status?: string
}
export interface IPostRepository {
  create(request: PostRequestDto): Promise<PostDoc>
  find(): Promise<PostDoc[]>
  findOne(query: PostQuery): Promise<PostDoc>
}

@Service('PostRepository')
export class PostRepository implements IPostRepository {
  async create(request: PostRequestDto): Promise<PostDoc> {
    return (await Post.create(request)).toJSON()
  }

  async find(): Promise<PostDoc[]> {
    return (await Post.find()).map((post) => post.toJSON())
  }

  async findOne(query: PostQuery): Promise<PostDoc> {
    const post = await Post.findOne(query)
    if (!post) {
      throw new NotFound('Not Found')
    }
    return post.toJSON()
  }
}
