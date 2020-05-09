import mongoose from 'mongoose'

export enum PostStatus {
  DONE = 'DONE',
  DOING = 'DOING',
}

export interface PostDoc extends mongoose.Document {
  id: string
  title: string
  status: string
}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: PostStatus.DOING },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const Post = mongoose.model<PostDoc>('Post', schema)

export { Post }
