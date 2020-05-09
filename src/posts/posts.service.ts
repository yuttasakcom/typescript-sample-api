import { Service } from 'typedi'
import { v1 as uuidv1 } from 'uuid'

import { PostDto } from './posts.dto'
import { Content } from './posts.model'
import { NotFound } from '../errors/notFound'

@Service()
export class PostsService {
  private content: Content[] = []

  public create(postDto: PostDto): Content {
    const post: Content = { id: uuidv1(), ...postDto }
    this.content.push(post)
    return post
  }

  public get(): Content[] {
    return this.content
  }

  public getById(id: string): Content {
    const post = this.content.find((t) => t.id === id)
    if (!post) {
      throw new NotFound(`Not found ${id}`)
    }
    return post
  }
}
