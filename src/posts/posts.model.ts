export enum ContentStatus {
  DONE = 'DONE',
  DOING = 'DOING',
}

export type Content = {
  id: string
  title: string
  status: ContentStatus
}
