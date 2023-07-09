import IBook from '@interfaces/IBook'

type DataFromApi = {
  id: number
  title: string
  author: string
  category: string
  description: string
  section: string
  quantity: number
  image: string
  available: boolean
  category_id: number
  category_name: string
  published_at?: string
}

export default class BookFactory {
  static builder(book: DataFromApi): IBook {
    return {
      id: book.id,
      title: book.title,
      available: book.available ? 'Disponivel no acervo' : 'Indisponivel',
      image_url: book.image,
      author: book.author,
      category: book.category,
      description: book.description,
      quantity: book.quantity,
      section: book.section,
      category_id: book.category_id,
      published_at: book?.published_at ?? '',
      category_name: book.category_name,
    }
  }
}
