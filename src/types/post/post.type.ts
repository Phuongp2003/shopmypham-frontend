export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  thumbnail: string
  published: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}
