import IBook from '@interfaces/IBook'

type DataFromApi = {
  data: {
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
  }[]
  _meta: {
    total: number
    limit: number
    offset: number
  }
}

export interface IShowBooksFactory {
  category_id: number
  category_name: string
  books: IBook[]
  _meta: {
    total: number
    limit: number
    offset: number
  }
}

export default class ShowBooksFactory {
  static builder(data: DataFromApi): IShowBooksFactory {
    const booked: IBook[] = []

    if (data.data.length === 0) {
      return {
        category_id: 0,
        category_name: '',
        books: [],
        _meta: {
          total: 0,
          limit: 0,
          offset: 0,
        },
      }
    }
    data?.data?.forEach((book) => {
      const bookFormated = {
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
        category_name: book.category_name,
      }
      booked.push(bookFormated)
    })

    return {
      category_id: data.data[0].category_id,
      category_name: data.data[0].category_name,
      books: booked,
      _meta: {
        total: data._meta.total,
        limit: data._meta.limit,
        offset: data._meta.offset,
      },
    }
  }
}
