import { Controller, Get, Post, Body, Param } from 'routing-controllers'

import { PostRequestDto } from './post.dto'
import { PostDoc, PostStatus } from './post.model'
import { PostService } from './post.service'

interface PostResponse {
  id: string
  title: string
  status: PostStatus
}

@Controller('/posts')
export class PostController {
  constructor(private service: PostService) {}

  @Post()
  create(@Body() request: PostRequestDto): Promise<PostDoc> {
    return this.service.create(request)
  }

  @Get()
  get(): Promise<PostDoc[]> {
    return this.service.find()
  }

  // @Get('/:id')
  // getById(@Param('id') id: string): Content {
  //   return this.service.getById(id)
  // }
}
