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
}

export interface IBookGroup {
  category_id: number
  category_name: string
  books: IBook[]
}

export default class BooksFactory {
  static builder(data: DataFromApi[]): IBookGroup[] {
    const bookedGroups: IBookGroup[] = []

    data.forEach((book) => {
      if (!bookedGroups.find((group) => group.category_id === book.category_id)) {
        bookedGroups.push({
          category_id: book.category_id,
          category_name: book.category_name,
          books: [],
        })
      }

      const group = bookedGroups.find((group) => group.category_id === book.category_id)

      if (group) {
        group.books.push({
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
        })
      }
    })

    return bookedGroups
  }
}
