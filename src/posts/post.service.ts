import { Service, Inject } from 'typedi'

import { PostRequestDto } from './post.dto'
import { PostDoc } from './post.model'
import { IPostRepository } from './post.repository'

@Service()
export class PostService {
  public create(request: PostRequestDto): Promise<PostDoc> {
    return this.repo.create(request)
  }

  @Inject('PostRepository')
  repo: IPostRepository

  async find(): Promise<PostDoc[]> {
    return this.repo.find()
  }

  async getById(id: string): Promise<PostDoc> {
    return this.repo.findOne({ _id: id })
  }
}
