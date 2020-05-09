import { Service, Inject } from 'typedi'

import { PostRequestDto } from './post.dto'
import { PostDoc } from './post.model'
import { NotFound } from '../errors/notFound'
import { IPostRepository } from './post.repository'

@Service()
export class PostService {
  public create(request: PostRequestDto): Promise<PostDoc> {
    return this.repo.create(request)
  }

  @Inject('PostRepository')
  repo: IPostRepository

  async find(): Promise<PostDoc[]> {
    const posts = await this.repo.find()
    let result: PostDoc[] = []
    for (const post of posts) {
      result.push(post.toJSON())
    }

    return result
  }

  // public getById(id: string): Post {
  //   const post = this.post.find((t) => t.id === id)
  //   if (!post) {
  //     throw new NotFound(`Not found ${id}`)
  //   }
  //   return post
  // }
}
