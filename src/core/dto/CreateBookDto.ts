import { ICreateBookForm } from '@/components/screens/Book/Create'

interface ICreateBookDto {
  title: string
  author: string
  category_id: string
  publishYear: string
  description: string
  quantity: number
  image: File
  section: string
}

export default class CreateBookDto implements ICreateBookDto {
  author: string
  category_id: string
  description: string
  image: File
  publishYear: string
  quantity: number
  section: string
  title: string

  constructor(data: ICreateBookForm) {
    this.author = data.author
    this.category_id = data.category
    this.description = data.description
    this.image = data.image
    this.publishYear = data.published_at
    this.quantity = data.quantity
    this.section = data.section
    this.title = data.title
  }
}
