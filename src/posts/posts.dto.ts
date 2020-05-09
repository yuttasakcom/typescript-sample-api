import { IsNotEmpty, IsIn } from 'class-validator'

import { ContentStatus } from './posts.model'

export class PostDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsIn([ContentStatus.DONE, ContentStatus.DOING])
  status: ContentStatus
}
