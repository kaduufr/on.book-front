import OnBookApi from '@http/OnBookApi'
import BooksFactory, { IBookGroup } from '@factories/BooksFactory'
import ShowBooksFactory, { IShowBooksFactory } from '@factories/ShowBooksFactory'

export default class BookService {
  static getBooks = (): Promise<IBookGroup[]> => {
    return OnBookApi.get('/books').then((response) => BooksFactory.builder(response.data))
  }

  static getBooksByCategory = (category: string): Promise<IShowBooksFactory> => {
    return OnBookApi.get(`/books/search?category=${category}`).then((response) =>
      ShowBooksFactory.builder(response.data)
    )
  }
}
