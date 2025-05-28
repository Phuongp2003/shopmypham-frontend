export interface CreatePostDTO {
  title: string
  content: string
  thumbnail: string
  published?: boolean
  tags?: string[]
}

export interface UpdatePostDTO {
  title?: string
  content?: string
  thumbnail?: string
  published?: boolean
  tags?: string[]
}
