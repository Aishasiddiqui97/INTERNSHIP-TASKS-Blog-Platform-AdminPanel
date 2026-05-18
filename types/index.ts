export interface User {
  _id: string
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: Date
}

export interface Category {
  _id: string
  name: string
  createdAt: Date
}

export interface Blog {
  _id: string
  title: string
  description: string
  content: string
  image: string
  authorId: string | User
  categoryId: string | Category
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
