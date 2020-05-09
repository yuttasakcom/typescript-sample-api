import { IsNotEmpty, IsIn, IsOptional } from 'class-validator'

import { PostStatus } from './post.model'

export class PostRequestDto {
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsIn([PostStatus.DONE, PostStatus.DOING])
  status: PostStatus
}
