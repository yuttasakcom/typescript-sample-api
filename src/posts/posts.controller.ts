import { Controller, Get, Post, Body, Param } from 'routing-controllers'

import { PostDto } from './posts.dto'
import { Content } from './posts.model'
import { PostsService } from './posts.service'

@Controller('/posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  get(): Content[] {
    return this.service.get()
  }

  @Get('/:id')
  getById(@Param('id') id: string): Content {
    return this.service.getById(id)
  }

  @Post()
  create(@Body() postDto: PostDto): Content {
    return this.service.create(postDto)
  }
}
